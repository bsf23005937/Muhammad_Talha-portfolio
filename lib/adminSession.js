export const BLOG_SESSION_COOKIE = 'synix_blog_admin';

const encoder = new TextEncoder();

export function getAdminPath() {
  const configuredPath = process.env.BLOG_ADMIN_PATH || '/secret-blog-studio';
  return configuredPath.startsWith('/') ? configuredPath : `/${configuredPath}`;
}

export function base64UrlEncode(value) {
  const input = typeof value === 'string' ? value : String.fromCharCode(...new Uint8Array(value));
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  return atob(padded);
}

async function hmacSha256(message, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  return crypto.subtle.sign('HMAC', key, encoder.encode(message));
}

function timingSafeEqualString(left, right) {
  if (left.length !== right.length) return false;

  let mismatch = 0;
  for (let i = 0; i < left.length; i += 1) {
    mismatch |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function verifySignedSessionCookie(cookieValue, secret = process.env.BLOG_SESSION_SECRET) {
  if (!cookieValue || !secret) return null;

  const [payload, signature] = cookieValue.split('.');
  if (!payload || !signature) return null;

  const expectedSignature = base64UrlEncode(await hmacSha256(payload, secret));
  if (!timingSafeEqualString(signature, expectedSignature)) return null;

  try {
    const session = JSON.parse(base64UrlDecode(payload));
    if (!session?.expiresAt || session.expiresAt < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}
