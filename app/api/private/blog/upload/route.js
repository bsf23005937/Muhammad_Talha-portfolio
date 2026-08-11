import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { requireAdminSession, validateCsrfToken } from '../../../../../lib/adminAuth';
import { validateImageFile } from '../../../../../lib/blogValidation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function safeFileName(fileName) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Blob storage is not configured.' }, { status: 503 });
  }

  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;
  if (!validateCsrfToken(request, auth.session)) {
    return NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const validationError = validateImageFile(file);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 422 });

  const pathname = `blog/${Date.now()}-${safeFileName(file.name || 'image')}`;
  const blob = await put(pathname, file, {
    access: 'public',
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url });
}
