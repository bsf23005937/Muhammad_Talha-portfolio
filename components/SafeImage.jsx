import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

function isLocalPublicAsset(src) {
  return typeof src === 'string' && src.startsWith('/') && !src.startsWith('//');
}

function publicAssetExists(src) {
  if (!isLocalPublicAsset(src)) return true;

  try {
    const cleanPath = decodeURIComponent(src.split(/[?#]/)[0]).replace(/^\/+/, '');
    const normalizedPath = path.normalize(cleanPath);

    if (normalizedPath.startsWith('..') || path.isAbsolute(normalizedPath)) {
      return false;
    }

    return fs.existsSync(path.join(process.cwd(), 'public', normalizedPath));
  } catch {
    return false;
  }
}

export default function SafeImage({ src, alt, fallbackLabel, className = '', fill = false, ...props }) {
  if (!publicAssetExists(src)) {
    const fillClassName = fill ? 'absolute inset-0 h-full w-full' : '';

    return (
      <div
        role="img"
        aria-label={`${alt}. Image asset unavailable.`}
        className={`${fillClassName} flex items-center justify-center bg-gradient-to-br from-[#F8F9FF] via-white to-[#E6E9FF] p-6 text-center ${className}`}
      >
        <div className="max-w-xs rounded-2xl border border-dashed border-purple-200 bg-white/85 p-4 shadow-sm backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47DFF]">Image unavailable</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
            {fallbackLabel || 'The referenced portfolio image is not available in this build.'}
          </p>
        </div>
      </div>
    );
  }

  return <Image src={src} alt={alt} fill={fill} className={className} {...props} />;
}
