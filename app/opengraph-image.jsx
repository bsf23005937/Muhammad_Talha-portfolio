import { ImageResponse } from 'next/og';
import { SITE_DESCRIPTION, SITE_NAME } from '../lib/siteConfig';

export const runtime = 'edge';
export const alt = `${SITE_NAME} preview card`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 45%, #e6e9ff 100%)',
          color: '#111827',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          padding: 72,
          width: '100%',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.92)',
            border: '2px solid #f3efff',
            borderRadius: 48,
            boxShadow: '0 32px 80px rgba(164, 125, 255, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            padding: 64,
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div
              style={{
                alignItems: 'center',
                background: '#A47DFF',
                borderRadius: 28,
                color: '#ffffff',
                display: 'flex',
                fontSize: 38,
                fontWeight: 900,
                height: 96,
                justifyContent: 'center',
                width: 96,
              }}
            >
              MT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ color: '#A47DFF', fontSize: 28, fontWeight: 800, letterSpacing: 4 }}>
                BUSINESS SOFTWARE DEVELOPER
              </div>
              <div style={{ fontSize: 44, fontWeight: 900 }}>{SITE_NAME}</div>
            </div>
          </div>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.04, maxWidth: 940 }}>
            Practical systems for real business workflows.
          </div>
          <div style={{ color: '#4b5563', fontSize: 32, fontWeight: 600, lineHeight: 1.35, maxWidth: 920 }}>
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    size
  );
}
