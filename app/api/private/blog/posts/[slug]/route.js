import { NextResponse } from 'next/server';
import { isBlogDatabaseConfigured, softDeleteBlogPost, updateBlogPost } from '../../../../../../lib/blogStore';
import { requireAdminSession, validateCsrfToken } from '../../../../../../lib/adminAuth';
import { validateBlogPostPayload } from '../../../../../../lib/blogValidation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function databaseRequiredResponse() {
  return NextResponse.json({ error: 'Postgres is not configured for blog management.' }, { status: 503 });
}

export async function PUT(request, { params }) {
  if (!isBlogDatabaseConfigured()) return databaseRequiredResponse();

  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;
  if (!validateCsrfToken(request, auth.session)) {
    return NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
  }

  const payload = await request.json().catch(() => null);
  const { post, valid, errors } = validateBlogPostPayload(payload);
  if (!valid) return NextResponse.json({ errors }, { status: 422 });

  const updatedPost = await updateBlogPost(params.slug, post);
  if (!updatedPost) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });

  return NextResponse.json({ post: updatedPost });
}

export async function DELETE(request, { params }) {
  if (!isBlogDatabaseConfigured()) return databaseRequiredResponse();

  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;
  if (!validateCsrfToken(request, auth.session)) {
    return NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
  }

  const deletedPost = await softDeleteBlogPost(params.slug);
  if (!deletedPost) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });

  return NextResponse.json({ post: deletedPost });
}
