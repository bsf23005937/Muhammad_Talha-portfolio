import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SafeImage from '../../../components/SafeImage';
import { getPublishedBlogPostBySlug, listRelatedPublishedBlogPosts } from '../../../lib/blogStore';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const post = await getPublishedBlogPostBySlug(params.id);
  if (!post) return { title: 'Blog Post Not Found - Muhammad Talha Portfolio' };
  return {
    title: `${post.title} - Muhammad Talha Portfolio Blog`,
    description: post.seoDescription || post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} - Muhammad Talha Portfolio Blog`,
      description: post.seoDescription || post.description,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPublishedBlogPostBySlug(params.id);
  if (!post) notFound();

  const relatedPosts = await listRelatedPublishedBlogPosts(post);
  const longContent = post.content || [];

  return (
    <main className="bg-white">
      <Navbar />

      <article className="bg-white pt-10 pb-16 font-[Manrope] md:pt-14 md:pb-24">
        <header className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-[#A47DFF]/30 bg-[#F8F9FF] px-5 py-2 text-sm font-bold text-[#8C52FF] transition hover:border-[#A47DFF] hover:bg-[#A47DFF] hover:text-white"
            >
              Back to Blog
            </Link>

            <p className="inline-flex rounded-full bg-[#A47DFF] px-5 py-2 text-sm font-bold uppercase tracking-widest text-white">
              {post.category}
            </p>
          </div>
          <h1 className="mb-8 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-gray-950 md:text-6xl">
            {post.title}
          </h1>

          <div className="relative mx-auto mb-8 aspect-[16/9] w-full overflow-hidden rounded-[1.75rem] bg-gray-100">
            <SafeImage
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              fallbackLabel={`${post.title} image asset is missing from this build.`}
              className="object-cover"
            />
          </div>

          <p className="mb-6 max-w-4xl text-xl leading-9 text-gray-600">
            {post.description}
          </p>
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-purple-100 bg-[#F8F9FF] px-5 py-3 text-sm font-bold text-gray-700">
            <span className="text-gray-950">{post.author}</span>
            <span className="text-[#A47DFF]">/</span>
            <span>{post.date}</span>
            <span className="text-[#A47DFF]">/</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="mx-auto mt-14 max-w-4xl px-4 text-gray-800 sm:px-6 lg:px-8">
          <p className="mb-10 text-2xl font-semibold leading-10 text-gray-900">
            {post.intro}
          </p>

          <div className="space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-950 md:text-4xl">
                  {section.heading}
                </h2>
                <p className="text-xl leading-9 text-gray-700">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {longContent.length > 0 && (
            <div className="mt-10 space-y-6">
              {longContent.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xl leading-9 text-gray-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {post.conclusion && (
            <section className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="mb-4 text-3xl font-bold text-gray-950">Conclusion</h2>
              <p className="text-xl leading-9 text-gray-700">{post.conclusion}</p>
            </section>
          )}

          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-semibold text-gray-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-100 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#A47DFF]">Related Articles</p>
                <h2 className="text-3xl font-bold text-gray-950 md:text-4xl">More Blog Posts</h2>
              </div>
              <Link href="/blog" className="shrink-0 rounded-full border border-[#A47DFF]/30 px-5 py-2 text-sm font-bold text-[#8C52FF] transition hover:bg-[#A47DFF] hover:text-white">
                View all posts
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <SafeImage
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      fallbackLabel={`${relatedPost.title} image asset is missing from this build.`}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#A47DFF]">
                      {relatedPost.category}
                    </p>
                    <h3 className="mb-3 text-2xl font-bold leading-tight text-gray-950 transition-colors group-hover:text-[#8C52FF]">
                      {relatedPost.title}
                    </h3>
                    <p className="line-clamp-2 text-sm font-medium leading-6 text-gray-500">
                      {relatedPost.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-bold text-gray-400">
                      <span>{relatedPost.date}</span>
                      <span className="text-[#8C52FF]">{relatedPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
