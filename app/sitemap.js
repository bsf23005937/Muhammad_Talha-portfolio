import { blogPosts } from '../data/blogPosts';
import { portfolioProjects } from '../data/portfolioProjects';
import { SITE_URL } from '../lib/siteConfig';

const lastModified = new Date('2026-08-20');

function toEntry(path, priority, changeFrequency = 'monthly') {
  return {
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap() {
  const staticRoutes = [
    toEntry('/', 1, 'monthly'),
    toEntry('/portfolio', 0.9, 'monthly'),
    toEntry('/about', 0.8, 'monthly'),
    toEntry('/contact', 0.9, 'monthly'),
    toEntry('/services', 0.7, 'monthly'),
    toEntry('/blog', 0.6, 'weekly'),
  ];

  const portfolioRoutes = portfolioProjects.map((project) => toEntry(`/portfolio/${project.slug}`, 0.7, 'monthly'));
  const blogRoutes = blogPosts.map((post) => toEntry(`/blog/${post.slug}`, 0.5, 'monthly'));

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
}
