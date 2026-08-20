import { getAdminPath } from '../lib/adminSession';
import { absoluteUrl, SITE_URL } from '../lib/siteConfig';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [getAdminPath(), '/private-blog-studio/', '/api/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
