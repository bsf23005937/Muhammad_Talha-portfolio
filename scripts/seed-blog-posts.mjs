import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { sql } from '@vercel/postgres';

function loadSeedModule(source) {
  const executableSource = source.replaceAll('export const ', 'const ');
  return Function(`${executableSource}; return { blogPosts, blogPostLongContent };`)();
}

const source = await readFile(resolve('data/blogPosts.js'), 'utf8');
const { blogPosts, blogPostLongContent } = loadSeedModule(source);
const overwrite = process.argv.includes('--overwrite');

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

for (const post of blogPosts) {
  const content = blogPostLongContent[post.slug] || [];

  await sql`
    INSERT INTO blog_posts (
      slug, title, category, description, seo_description, author, date, read_time,
      image, intro, sections, content, conclusion, tags, featured, published
    )
    VALUES (
      ${post.slug}, ${post.title}, ${post.category}, ${post.description}, ${post.description},
      ${post.author}, ${post.date}, ${post.readTime}, ${post.image}, ${post.intro},
      ${JSON.stringify(post.sections)}::jsonb, ${JSON.stringify(content)}::jsonb,
      ${post.conclusion}, ${JSON.stringify(post.tags)}::jsonb, ${Boolean(post.featured)}, true
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

console.log(`Seeded ${blogPosts.length} blog posts${overwrite ? ' with overwrite enabled' : ''}.`);
