export const dynamic = 'force-static';

export async function GET() {
  const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="160" viewBox="0 0 480 160" role="img" aria-label="Muhammad Talha Portfolio logo">
    <rect width="480" height="160" rx="36" fill="#F8F9FF"/>
    <rect x="32" y="32" width="96" height="96" rx="28" fill="#A47DFF"/>
    <text x="80" y="89" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800">MT</text>
    <text x="152" y="70" fill="#111827" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="800">Muhammad Talha</text>
    <text x="154" y="108" fill="#6B7280" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="4">PORTFOLIO</text>
  </svg>`;

  return new Response(logo, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
