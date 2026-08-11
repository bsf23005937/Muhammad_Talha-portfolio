import { NextResponse } from 'next/server';
import { BLOG_SESSION_COOKIE, getAdminPath, verifySignedSessionCookie } from './lib/adminSession';

const INTERNAL_ADMIN_PATH = '/private-blog-studio';
const PUBLIC_PRIVATE_API_PATHS = new Set(['/api/private/blog/login']);

function addNoIndexHeaders(response) {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return response;
}

function isPathOrChild(pathname, basePath) {
  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

async function hasAdminSession(request) {
  const cookieValue = request.cookies.get(BLOG_SESSION_COOKIE)?.value;
  const session = await verifySignedSessionCookie(cookieValue, process.env.BLOG_SESSION_SECRET);
  return Boolean(session);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const configuredAdminPath = getAdminPath();
  const isConfiguredAdminPath = isPathOrChild(pathname, configuredAdminPath);
  const isInternalAdminPath = isPathOrChild(pathname, INTERNAL_ADMIN_PATH);
  const isPrivateApiPath = pathname.startsWith('/api/private/');

  if (!isConfiguredAdminPath && !isInternalAdminPath && !isPrivateApiPath) {
    return NextResponse.next();
  }

  if (isInternalAdminPath && configuredAdminPath !== INTERNAL_ADMIN_PATH) {
    return addNoIndexHeaders(new NextResponse('Not found', { status: 404 }));
  }

  if (isPrivateApiPath && !PUBLIC_PRIVATE_API_PATHS.has(pathname) && !(await hasAdminSession(request))) {
    return addNoIndexHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
  }

  if (isConfiguredAdminPath && configuredAdminPath !== INTERNAL_ADMIN_PATH) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `${INTERNAL_ADMIN_PATH}${pathname.slice(configuredAdminPath.length)}`;
    return addNoIndexHeaders(NextResponse.rewrite(rewriteUrl));
  }

  return addNoIndexHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
