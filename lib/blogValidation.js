const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function asStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map(asString).filter(Boolean).slice(0, 20);
}

function asSections(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((section) => ({
      heading: asString(section?.heading),
      body: asString(section?.body),
    }))
    .filter((section) => section.heading && section.body)
    .slice(0, 20);
}

export function normalizeBlogPostPayload(payload = {}) {
  return {
    slug: asString(payload.slug).toLowerCase(),
    title: asString(payload.title),
    category: asString(payload.category),
    description: asString(payload.description),
    seoDescription: asString(payload.seoDescription || payload.description),
    author: asString(payload.author) || 'Synixsolution Team',
    date: asString(payload.date),
    readTime: asString(payload.readTime),
    image: asString(payload.image),
    intro: asString(payload.intro),
    sections: asSections(payload.sections),
    content: asStringArray(payload.content),
    conclusion: asString(payload.conclusion),
    tags: asStringArray(payload.tags),
    featured: Boolean(payload.featured),
    published: Boolean(payload.published),
  };
}

export function validateBlogPostPayload(payload = {}, { partial = false } = {}) {
  const post = normalizeBlogPostPayload(payload);
  const errors = {};

  const requireField = (field, message) => {
    if (!partial && !post[field]) errors[field] = message;
  };

  requireField('slug', 'Slug is required.');
  requireField('title', 'Title is required.');
  requireField('category', 'Category is required.');
  requireField('description', 'Excerpt is required.');
  requireField('date', 'Date is required.');
  requireField('readTime', 'Read time is required.');
  requireField('image', 'Image URL is required.');
  requireField('intro', 'Intro paragraph is required.');
  requireField('conclusion', 'Conclusion is required.');

  if (post.slug && !SLUG_PATTERN.test(post.slug)) {
    errors.slug = 'Slug can only use lowercase letters, numbers, and hyphens.';
  }

  if (post.title && post.title.length > 140) errors.title = 'Title must be 140 characters or less.';
  if (post.description && post.description.length > 280) errors.description = 'Excerpt must be 280 characters or less.';
  if (post.seoDescription && post.seoDescription.length > 320) {
    errors.seoDescription = 'SEO description must be 320 characters or less.';
  }
  if (post.sections.length === 0 && !partial) errors.sections = 'Add at least one content section.';

  return {
    post,
    errors,
    valid: Object.keys(errors).length === 0,
  };
}

export function validateImageFile(file) {
  if (!file) return 'Image file is required.';
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) return 'Use a JPG, PNG, WebP, or GIF image.';
  if (file.size > MAX_IMAGE_SIZE) return 'Image must be 5MB or smaller.';
  return null;
}
