import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

export async function GET() {
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const logo = await readFile(logoPath);

  return new Response(logo, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
