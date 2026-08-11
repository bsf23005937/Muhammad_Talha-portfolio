import { getAdminPath } from '../lib/adminSession';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [getAdminPath(), '/api/private/'],
    },
  };
}
