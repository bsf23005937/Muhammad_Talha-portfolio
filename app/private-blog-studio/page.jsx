import PrivateBlogStudio from '../../components/PrivateBlogStudio';
import { getAdminSession } from '../../lib/adminAuth';
import { isBlogDatabaseConfigured, listAdminBlogPosts } from '../../lib/blogStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata = {
  title: 'Private Blog Studio',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function PrivateBlogStudioPage() {
  const session = await getAdminSession();
  const hasDatabase = isBlogDatabaseConfigured();
  let posts = [];
  let loadError = '';

  if (session && hasDatabase) {
    try {
      posts = await listAdminBlogPosts();
    } catch (error) {
      loadError = error.message || 'Unable to load blog posts.';
    }
  }

  return (
    <PrivateBlogStudio
      csrfToken={session?.csrfToken || ''}
      initialAuthenticated={Boolean(session)}
      initialPosts={posts}
      hasDatabase={hasDatabase}
      loadError={loadError}
    />
  );
}
