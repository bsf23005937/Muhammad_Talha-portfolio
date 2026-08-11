import pg from 'pg';
import { blogPostLongContent, blogPosts as seedBlogPostsData } from '../data/blogPosts';

let tableReadyPromise;
let pool;

const { Pool } = pg;

export function isBlogDatabaseConfigured() {
  return Boolean(
    process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL_NO_SSL
  );
}

function getPostgresConnectionString() {
  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL_NO_SSL;

  if (!connectionString || process.env.POSTGRES_URL_NO_SSL === connectionString) return connectionString;

  const url = new URL(connectionString);
  url.searchParams.delete('sslmode');
  return url.toString();
}

async function getSql() {
  if (!isBlogDatabaseConfigured()) {
    throw new Error('Postgres is not configured. Add the Supabase Postgres environment variables first.');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: getPostgresConnectionString(),
      ssl: process.env.POSTGRES_URL_NO_SSL ? false : { rejectUnauthorized: false },
      max: 3,
    });
  }

  return async function sql(strings, ...values) {
    const text = strings.reduce((query, string, index) => {
      const parameter = index < values.length ? `$${index + 1}` : '';
      return `${query}${string}${parameter}`;
    }, '');

    return pool.query(text, values);
  };
}

export function getSeedBlogPosts() {
  return seedBlogPostsData.map((post) => ({
    ...post,
    seoDescription: post.description,
    content: blogPostLongContent[post.slug] || [],
    published: true,
    deletedAt: null,
    createdAt: null,
    updatedAt: null,
  }));
}

function normalizeRow(row) {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    description: row.description,
    seoDescription: row.seo_description || row.description,
    author: row.author,
    date: row.date,
    readTime: row.read_time,
    image: row.image,
    intro: row.intro,
    sections: row.sections || [],
    content: row.content || [],
    conclusion: row.conclusion,
    tags: row.tags || [],
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    deletedAt: row.deleted_at ? new Date(row.deleted_at).toISOString() : null,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null,
  };
}

async function ensureBlogTable() {
  if (!tableReadyPromise) {
    tableReadyPromise = (async () => {
      const sql = await getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          slug TEXT PRIMARY KEY,
          title VARCHAR(140) NOT NULL,
          category TEXT NOT NULL,
          description VARCHAR(280) NOT NULL,
          seo_description VARCHAR(320),
          author TEXT NOT NULL DEFAULT 'Synixsolution Team',
          date TEXT NOT NULL,
          read_time TEXT NOT NULL,
          image TEXT NOT NULL,
          intro TEXT NOT NULL,
          sections JSONB NOT NULL DEFAULT '[]'::jsonb,
          content JSONB NOT NULL DEFAULT '[]'::jsonb,
          conclusion TEXT NOT NULL,
          tags JSONB NOT NULL DEFAULT '[]'::jsonb,
          featured BOOLEAN NOT NULL DEFAULT false,
          published BOOLEAN NOT NULL DEFAULT false,
          deleted_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
    })();
  }

  return tableReadyPromise;
}

async function clearOtherFeaturedPosts(slug) {
  const sql = await getSql();
  await sql`UPDATE blog_posts SET featured = false, updated_at = NOW() WHERE slug <> ${slug}`;
}

export async function listPublishedBlogPosts() {
  if (!isBlogDatabaseConfigured()) return getSeedBlogPosts();

  await ensureBlogTable();
  const sql = await getSql();
  const { rows } = await sql`
    SELECT *
    FROM blog_posts
    WHERE published = true AND deleted_at IS NULL
    ORDER BY featured DESC, created_at DESC
  `;

  return rows.map(normalizeRow);
}

export async function listAdminBlogPosts() {
  await ensureBlogTable();
  const sql = await getSql();
  const { rows } = await sql`
    SELECT *
    FROM blog_posts
    WHERE deleted_at IS NULL
    ORDER BY updated_at DESC
  `;

  return rows.map(normalizeRow);
}

export async function getPublishedBlogPostBySlug(slug) {
  if (!isBlogDatabaseConfigured()) {
    return getSeedBlogPosts().find((post) => post.slug === slug) || null;
  }

  await ensureBlogTable();
  const sql = await getSql();
  const { rows } = await sql`
    SELECT *
    FROM blog_posts
    WHERE slug = ${slug} AND published = true AND deleted_at IS NULL
    LIMIT 1
  `;

  return rows[0] ? normalizeRow(rows[0]) : null;
}

export async function listRelatedPublishedBlogPosts(currentPost, limit = 3) {
  const posts = await listPublishedBlogPosts();
  return posts
    .filter((post) => post.slug !== currentPost.slug)
    .filter((post) => {
      const hasSharedTag = post.tags.some((tag) => currentPost.tags.includes(tag));
      return post.category === currentPost.category || hasSharedTag;
    })
    .slice(0, limit);
}

export async function createBlogPost(post) {
  await ensureBlogTable();
  const sql = await getSql();

  if (post.featured) await clearOtherFeaturedPosts(post.slug);

  const { rows } = await sql`
    INSERT INTO blog_posts (
      slug, title, category, description, seo_description, author, date, read_time,
      image, intro, sections, content, conclusion, tags, featured, published
    )
    VALUES (
      ${post.slug}, ${post.title}, ${post.category}, ${post.description}, ${post.seoDescription},
      ${post.author}, ${post.date}, ${post.readTime}, ${post.image}, ${post.intro},
      ${JSON.stringify(post.sections)}::jsonb, ${JSON.stringify(post.content)}::jsonb,
      ${post.conclusion}, ${JSON.stringify(post.tags)}::jsonb, ${post.featured}, ${post.published}
    )
    RETURNING *
  `;

  return normalizeRow(rows[0]);
}

export async function updateBlogPost(currentSlug, post) {
  await ensureBlogTable();
  const sql = await getSql();

  if (post.featured) await clearOtherFeaturedPosts(post.slug);

  const { rows } = await sql`
    UPDATE blog_posts
    SET
      slug = ${post.slug},
      title = ${post.title},
      category = ${post.category},
      description = ${post.description},
      seo_description = ${post.seoDescription},
      author = ${post.author},
      date = ${post.date},
      read_time = ${post.readTime},
      image = ${post.image},
      intro = ${post.intro},
      sections = ${JSON.stringify(post.sections)}::jsonb,
      content = ${JSON.stringify(post.content)}::jsonb,
      conclusion = ${post.conclusion},
      tags = ${JSON.stringify(post.tags)}::jsonb,
      featured = ${post.featured},
      published = ${post.published},
      updated_at = NOW()
    WHERE slug = ${currentSlug} AND deleted_at IS NULL
    RETURNING *
  `;

  return rows[0] ? normalizeRow(rows[0]) : null;
}

export async function softDeleteBlogPost(slug) {
  await ensureBlogTable();
  const sql = await getSql();
  const { rows } = await sql`
    UPDATE blog_posts
    SET deleted_at = NOW(), published = false, updated_at = NOW()
    WHERE slug = ${slug} AND deleted_at IS NULL
    RETURNING *
  `;

  return rows[0] ? normalizeRow(rows[0]) : null;
}

export async function seedBlogPosts({ overwrite = false } = {}) {
  await ensureBlogTable();
  const sql = await getSql();
  const posts = getSeedBlogPosts();

  for (const post of posts) {
    await sql`
      INSERT INTO blog_posts (
        slug, title, category, description, seo_description, author, date, read_time,
        image, intro, sections, content, conclusion, tags, featured, published
      )
      VALUES (
        ${post.slug}, ${post.title}, ${post.category}, ${post.description}, ${post.seoDescription},
        ${post.author}, ${post.date}, ${post.readTime}, ${post.image}, ${post.intro},
        ${JSON.stringify(post.sections)}::jsonb, ${JSON.stringify(post.content)}::jsonb,
        ${post.conclusion}, ${JSON.stringify(post.tags)}::jsonb, ${post.featured}, true
      )
      ON CONFLICT (slug) DO UPDATE
      SET
        title = CASE WHEN ${overwrite} THEN EXCLUDED.title ELSE blog_posts.title END,
        category = CASE WHEN ${overwrite} THEN EXCLUDED.category ELSE blog_posts.category END,
        description = CASE WHEN ${overwrite} THEN EXCLUDED.description ELSE blog_posts.description END,
        seo_description = CASE WHEN ${overwrite} THEN EXCLUDED.seo_description ELSE blog_posts.seo_description END,
        author = CASE WHEN ${overwrite} THEN EXCLUDED.author ELSE blog_posts.author END,
        date = CASE WHEN ${overwrite} THEN EXCLUDED.date ELSE blog_posts.date END,
        read_time = CASE WHEN ${overwrite} THEN EXCLUDED.read_time ELSE blog_posts.read_time END,
        image = CASE WHEN ${overwrite} THEN EXCLUDED.image ELSE blog_posts.image END,
        intro = CASE WHEN ${overwrite} THEN EXCLUDED.intro ELSE blog_posts.intro END,
        sections = CASE WHEN ${overwrite} THEN EXCLUDED.sections ELSE blog_posts.sections END,
        content = CASE WHEN ${overwrite} THEN EXCLUDED.content ELSE blog_posts.content END,
        conclusion = CASE WHEN ${overwrite} THEN EXCLUDED.conclusion ELSE blog_posts.conclusion END,
        tags = CASE WHEN ${overwrite} THEN EXCLUDED.tags ELSE blog_posts.tags END,
        featured = CASE WHEN ${overwrite} THEN EXCLUDED.featured ELSE blog_posts.featured END,
        published = CASE WHEN ${overwrite} THEN EXCLUDED.published ELSE blog_posts.published END,
        updated_at = NOW()
    `;
  }

  return posts.length;
}
