'use client';

import { useMemo, useState } from 'react';

const emptyForm = {
  slug: '',
  title: '',
  category: '',
  description: '',
  seoDescription: '',
  author: 'Muhammad Talha',
  date: '',
  readTime: '',
  image: '',
  intro: '',
  sectionsText: '',
  contentText: '',
  conclusion: '',
  tagsText: '',
  featured: false,
  published: false,
};

const inputClass =
  'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-[#A47DFF]/10';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2';

async function readApiResponse(response) {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return {
      error: `Server returned ${response.status} ${response.statusText || 'with a non-JSON response'}.`,
    };
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseSections(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separatorIndex = line.indexOf('|');
      if (separatorIndex === -1) return null;
      return {
        heading: line.slice(0, separatorIndex).trim(),
        body: line.slice(separatorIndex + 1).trim(),
      };
    })
    .filter((section) => section?.heading && section?.body);
}

function parseParagraphs(value) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function postToForm(post) {
  if (!post) return emptyForm;

  return {
    slug: post.slug || '',
    title: post.title || '',
    category: post.category || '',
    description: post.description || '',
    seoDescription: post.seoDescription || post.description || '',
    author: post.author || 'Muhammad Talha',
    date: post.date || '',
    readTime: post.readTime || '',
    image: post.image || '',
    intro: post.intro || '',
    sectionsText: (post.sections || []).map((section) => `${section.heading} | ${section.body}`).join('\n'),
    contentText: (post.content || []).join('\n\n'),
    conclusion: post.conclusion || '',
    tagsText: (post.tags || []).join(', '),
    featured: Boolean(post.featured),
    published: Boolean(post.published),
  };
}

function formToPost(form) {
  return {
    slug: form.slug,
    title: form.title,
    category: form.category,
    description: form.description,
    seoDescription: form.seoDescription,
    author: form.author,
    date: form.date,
    readTime: form.readTime,
    image: form.image,
    intro: form.intro,
    sections: parseSections(form.sectionsText),
    content: parseParagraphs(form.contentText),
    conclusion: form.conclusion,
    tags: form.tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    featured: form.featured,
    published: form.published,
  };
}

export default function PrivateBlogStudio({
  csrfToken,
  initialAuthenticated,
  initialPosts,
  hasDatabase,
  loadError,
}) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [csrf, setCsrf] = useState(csrfToken);
  const [posts, setPosts] = useState(initialPosts);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(loadError || '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === editingSlug) || null,
    [editingSlug, posts]
  );

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function refreshPosts(activeCsrf = csrf) {
    const response = await fetch('/api/private/blog/posts', {
      headers: { 'x-csrf-token': activeCsrf },
    });
    const data = await readApiResponse(response);
    if (!response.ok) throw new Error(data.error || 'Unable to load posts.');
    setPosts(data.posts || []);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setStatus('');

    const response = await fetch('/api/private/blog/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await readApiResponse(response);

    if (!response.ok) {
      setStatus(data.error || 'Login failed.');
      return;
    }

    setAuthenticated(true);
    setCsrf(data.csrfToken);
    setPassword('');

    if (hasDatabase) {
      await refreshPosts(data.csrfToken).catch((error) => setStatus(error.message));
    }
  }

  async function handleLogout() {
    await fetch('/api/private/blog/logout', {
      method: 'POST',
      headers: { 'x-csrf-token': csrf },
    });
    setAuthenticated(false);
    setPosts([]);
    setForm(emptyForm);
    setEditingSlug('');
  }

  function startNewPost() {
    setEditingSlug('');
    setForm(emptyForm);
    setStatus('');
  }

  function startEditing(post) {
    setEditingSlug(post.slug);
    setForm(postToForm(post));
    setStatus('');
  }

  async function savePost(event, overridePost, targetSlug) {
    event?.preventDefault();
    setSaving(true);
    setStatus('');

    const post = overridePost || formToPost(form);
    const updateSlug = targetSlug || editingSlug || overridePost?.slug;
    const method = updateSlug ? 'PUT' : 'POST';
    const url = updateSlug ? `/api/private/blog/posts/${updateSlug}` : '/api/private/blog/posts';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf,
      },
      body: JSON.stringify(post),
    });
    const data = await readApiResponse(response);
    setSaving(false);

    if (!response.ok) {
      const message = data.errors
        ? Object.values(data.errors).join(' ')
        : data.error || 'Unable to save post.';
      setStatus(message);
      return;
    }

    setStatus('Post saved.');
    setEditingSlug(data.post.slug);
    setForm(postToForm(data.post));
    await refreshPosts();
  }

  async function deletePost(post) {
    const confirmed = window.confirm(`Delete "${post.title}"? It will be soft-deleted.`);
    if (!confirmed) return;

    const response = await fetch(`/api/private/blog/posts/${post.slug}`, {
      method: 'DELETE',
      headers: { 'x-csrf-token': csrf },
    });
    const data = await readApiResponse(response);

    if (!response.ok) {
      setStatus(data.error || 'Unable to delete post.');
      return;
    }

    setPosts((current) => current.filter((item) => item.slug !== post.slug));
    if (editingSlug === post.slug) startNewPost();
    setStatus('Post deleted.');
  }

  async function togglePublished(post) {
    const nextPost = { ...post, published: !post.published };
    setEditingSlug(post.slug);
    setForm(postToForm(nextPost));
    await savePost(null, nextPost, post.slug);
  }

  async function uploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus('');

    const body = new FormData();
    body.append('file', file);

    const response = await fetch('/api/private/blog/upload', {
      method: 'POST',
      headers: { 'x-csrf-token': csrf },
      body,
    });
    const data = await readApiResponse(response);
    setUploading(false);

    if (!response.ok) {
      setStatus(data.error || 'Unable to upload image.');
      return;
    }

    updateField('image', data.url);
    setStatus('Image uploaded.');
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#F8F9FF] px-6 py-16">
        <div className="mx-auto max-w-md rounded-[2rem] border border-white bg-white p-8 shadow-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#A47DFF]">Private Blog Studio</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
                autoComplete="current-password"
                required
              />
            </div>
            {status && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{status}</p>}
            <button className="w-full rounded-2xl bg-gray-950 px-5 py-3 font-bold text-white transition hover:bg-[#A47DFF]">
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FF] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#A47DFF]">Private Blog Studio</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Manage Blog Posts</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={startNewPost} className="rounded-2xl bg-[#A47DFF] px-5 py-3 text-sm font-bold text-white">
              New Post
            </button>
            <button onClick={handleLogout} className="rounded-2xl bg-gray-100 px-5 py-3 text-sm font-bold text-gray-800">
              Logout
            </button>
          </div>
        </header>

        {!hasDatabase && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">
            Add Vercel Postgres environment variables before creating or editing posts.
          </div>
        )}
        {status && <div className="mb-6 rounded-2xl bg-white p-4 text-sm font-bold text-gray-700 shadow-sm">{status}</div>}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-[2rem] bg-white p-4 shadow-sm">
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">Posts</div>
            <div className="space-y-3">
              {posts.length === 0 && <p className="text-sm font-semibold text-gray-500">No database posts yet.</p>}
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className={`rounded-2xl border p-4 transition ${
                    selectedPost?.slug === post.slug ? 'border-[#A47DFF] bg-[#A47DFF]/5' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h2 className="text-sm font-bold text-gray-900">{post.title}</h2>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="mb-3 text-xs font-semibold text-gray-500">{post.slug}</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => startEditing(post)} className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-gray-800">
                      Edit
                    </button>
                    <button onClick={() => togglePublished(post)} className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-gray-800">
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onClick={() => deletePost(post)} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <form onSubmit={savePost} className="rounded-[2rem] bg-white p-5 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{editingSlug ? 'Editing Post' : 'New Post'}</p>
                <h2 className="text-2xl font-bold text-gray-900">{form.title || 'Untitled post'}</h2>
              </div>
              <button
                disabled={!hasDatabase || saving}
                className="rounded-2xl bg-gray-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-[#A47DFF] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Post'}
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="title">Title</label>
                <input
                  id="title"
                  value={form.title}
                  onChange={(event) => {
                    const title = event.target.value;
                    setForm((current) => ({
                      ...current,
                      title,
                      slug: current.slug || slugify(title),
                    }));
                  }}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="slug">Slug</label>
                <input id="slug" value={form.slug} onChange={(event) => updateField('slug', slugify(event.target.value))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="category">Category</label>
                <input id="category" value={form.category} onChange={(event) => updateField('category', event.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="date">Date</label>
                <input id="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} className={inputClass} placeholder="May 8, 2026" />
              </div>
              <div>
                <label className={labelClass} htmlFor="readTime">Read Time</label>
                <input id="readTime" value={form.readTime} onChange={(event) => updateField('readTime', event.target.value)} className={inputClass} placeholder="6 min read" />
              </div>
              <div>
                <label className={labelClass} htmlFor="author">Author</label>
                <input id="author" value={form.author} onChange={(event) => updateField('author', event.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="image">Image URL</label>
                <input id="image" value={form.image} onChange={(event) => updateField('image', event.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="upload">Upload Image</label>
                <input id="upload" type="file" accept="image/*" onChange={uploadImage} className={inputClass} disabled={uploading} />
              </div>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <label className={labelClass} htmlFor="description">Excerpt</label>
                <textarea id="description" value={form.description} onChange={(event) => updateField('description', event.target.value)} className={`${inputClass} min-h-24`} />
              </div>
              <div>
                <label className={labelClass} htmlFor="seoDescription">SEO Description</label>
                <textarea id="seoDescription" value={form.seoDescription} onChange={(event) => updateField('seoDescription', event.target.value)} className={`${inputClass} min-h-24`} />
              </div>
              <div>
                <label className={labelClass} htmlFor="intro">Intro Paragraph</label>
                <textarea id="intro" value={form.intro} onChange={(event) => updateField('intro', event.target.value)} className={`${inputClass} min-h-28`} />
              </div>
              <div>
                <label className={labelClass} htmlFor="sections">Sections, one per line as "Heading | Body"</label>
                <textarea id="sections" value={form.sectionsText} onChange={(event) => updateField('sectionsText', event.target.value)} className={`${inputClass} min-h-44 font-mono text-xs`} />
              </div>
              <div>
                <label className={labelClass} htmlFor="content">Long Content Paragraphs, separated by blank lines</label>
                <textarea id="content" value={form.contentText} onChange={(event) => updateField('contentText', event.target.value)} className={`${inputClass} min-h-40`} />
              </div>
              <div>
                <label className={labelClass} htmlFor="conclusion">Conclusion</label>
                <textarea id="conclusion" value={form.conclusion} onChange={(event) => updateField('conclusion', event.target.value)} className={`${inputClass} min-h-28`} />
              </div>
              <div>
                <label className={labelClass} htmlFor="tags">Tags, comma separated</label>
                <input id="tags" value={form.tagsText} onChange={(event) => updateField('tagsText', event.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-wrap gap-4 rounded-2xl bg-gray-50 p-4">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <input type="checkbox" checked={form.featured} onChange={(event) => updateField('featured', event.target.checked)} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <input type="checkbox" checked={form.published} onChange={(event) => updateField('published', event.target.checked)} />
                  Published
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
