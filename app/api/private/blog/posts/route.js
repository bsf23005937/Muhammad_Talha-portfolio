import { NextResponse } from 'next/server';
import { createBlogPost, isBlogDatabaseConfigured, listAdminBlogPosts } from '../../../../../lib/blogStore';
import { requireAdminSession, validateCsrfToken } from '../../../../../lib/adminAuth';
import { validateBlogPostPayload } from '../../../../../lib/blogValidation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function databaseRequiredResponse() {
  return NextResponse.json({ error: 'Postgres is not configured for blog management.' }, { status: 503 });
}

export async function GET() {
  if (!isBlogDatabaseConfigured()) return databaseRequiredResponse();

  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  const posts = await listAdminBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(request) {
  if (!isBlogDatabaseConfigured()) return databaseRequiredResponse();

  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;
  if (!validateCsrfToken(request, auth.session)) {
    return NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
  }

  const payload = await request.json().catch(() => null);
  const { post, valid, errors } = validateBlogPostPayload(payload);
  if (!valid) return NextResponse.json({ errors }, { status: 422 });

  try {
    const createdPost = await createBlogPost(post);
    return NextResponse.json({ post: createdPost }, { status: 201 });
  } catch (error) {
    if (error?.message?.includes('duplicate key')) {
      return NextResponse.json({ errors: { slug: 'A post with this slug already exists.' } }, { status: 409 });
    }

    throw error;
  }
}
