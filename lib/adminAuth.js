import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { BLOG_SESSION_COOKIE, verifySignedSessionCookie } from './adminSession';

const SESSION_TTL_SECONDS = 60 * 60 * 2;
const CSRF_TOKEN_BYTES = 32;

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function signPayload(payload, secret) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function hashPassword(password, salt = randomBytes(16).toString('base64url')) {
  const key = scryptSync(password, salt, 64);
  return `scrypt$16384$8$1$${salt}$${key.toString('base64url')}`;
}

export function verifyPassword(password, storedHash = process.env.BLOG_ADMIN_PASSWORD_HASH) {
  if (!password || !storedHash) return false;

  const [algorithm, cost, blockSize, parallelization, salt, expectedKey] = storedHash.split('$');
  if (algorithm !== 'scrypt' || !cost || !blockSize || !parallelization || !salt || !expectedKey) {
    return false;
  }

  const derivedKey = scryptSync(password, salt, Buffer.from(expectedKey, 'base64url').length, {
    N: Number(cost),
    r: Number(blockSize),
    p: Number(parallelization),
  }).toString('base64url');

  return safeEqual(derivedKey, expectedKey);
}

export function createSessionCookieValue() {
  const secret = process.env.BLOG_SESSION_SECRET;
  if (!secret) {
    throw new Error('BLOG_SESSION_SECRET is required.');
  }

  const session = {
    csrfToken: randomBytes(CSRF_TOKEN_BYTES).toString('base64url'),
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const payload = base64UrlEncode(JSON.stringify(session));
  const signature = signPayload(payload, secret);

  return {
    value: `${payload}.${signature}`,
    session,
  };
}

export function setSessionCookie(response, cookieValue) {
  response.cookies.set({
    name: BLOG_SESSION_COOKIE,
    value: cookieValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearSessionCookie(response) {
  response.cookies.set({
    name: BLOG_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
}

export async function getAdminSession() {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get(BLOG_SESSION_COOKIE)?.value;
  return verifySignedSessionCookie(cookieValue, process.env.BLOG_SESSION_SECRET);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    return {
      ok: false,
      response: Response.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { ok: true, session };
}

export function validateCsrfToken(request, session) {
  const csrfToken = request.headers.get('x-csrf-token');
  return Boolean(csrfToken && session?.csrfToken && safeEqual(csrfToken, session.csrfToken));
}
