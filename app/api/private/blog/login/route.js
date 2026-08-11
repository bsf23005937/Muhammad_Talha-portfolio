import { NextResponse } from 'next/server';
import { createSessionCookieValue, setSessionCookie, verifyPassword } from '../../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));

  if (!process.env.BLOG_ADMIN_PASSWORD_HASH || !process.env.BLOG_SESSION_SECRET) {
    return NextResponse.json({ error: 'Admin authentication is not configured.' }, { status: 500 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  const { value, session } = createSessionCookieValue();
  const response = NextResponse.json({ csrfToken: session.csrfToken, expiresAt: session.expiresAt });
  setSessionCookie(response, value);

  return response;
}
