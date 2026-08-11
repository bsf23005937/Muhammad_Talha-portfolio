import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BlogSection from '../../components/BlogSection';
import { listPublishedBlogPosts } from '../../lib/blogStore';

export const metadata = {
  title: 'Blog - Muhammad Talha Portfolio',
  description: 'Latest insights and stories about AI, web development, automation, and SEO from Muhammad Talha Portfolio.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await listPublishedBlogPosts();

  return (
    <main>
      <Navbar />
      <div className="pt-20"> {/* Add padding for navbar */}
        <BlogSection posts={posts} />
      </div>
      <Footer />
    </main>
  );
}
