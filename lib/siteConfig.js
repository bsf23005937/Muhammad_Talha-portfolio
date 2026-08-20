export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://muhammad-talha-portfolio-omega.vercel.app').replace(/\/$/, '');

export const SITE_NAME = 'Muhammad Talha Portfolio';

export const SITE_DESCRIPTION =
  'Muhammad Talha builds practical business software for clinics, shops, supply workflows, dashboards, and small-business operations.';

export const SITE_KEYWORDS = [
  'Muhammad Talha',
  'business software developer',
  'Next.js portfolio',
  'clinic management software',
  'POS software',
  'CMS dashboard',
  'small business software',
];

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
