# Break Your Own Site — Hardening Report

Target live domain: <https://muhammad-talha-portfolio-omega.vercel.app/>  
Local repo audited: `C:\Users\pak\Desktop\synix\synixsolution`  
Report date: 2026-08-20

## 1. Project overview

| Area | Evidence |
|---|---|
| Framework | Next.js 14 App Router with Tailwind CSS |
| Public routes inspected | `/`, `/portfolio`, `/portfolio/[id]`, `/about`, `/contact`, `/services`, `/blog`, `/blog/[id]`, `/careers` |
| Private/admin routes inspected | `/private-blog-studio`, `/api/private/blog/*` |
| Only intended public form | `components/ContactForm.jsx` using Formspree endpoint `https://formspree.io/f/mdenpklk` |
| Dynamic/private systems | Private blog studio and private blog API routes guarded by middleware/session checks |
| Asset state | Local image assets are present in `public/`; missing-image fallback was added so broken/missing image paths degrade safely |

## 2. Testing methodology

| ID | Method | Scope | Result |
|---|---|---|---|
| M-01 | Code inspection | Routes, metadata, API routes, forms, links, data, assets, env references | Completed |
| M-02 | `npm run build` baseline and final | Production compile, type checks, route generation | Final run exited 0 |
| M-03 | `npm run lint` | Existing lint command | Blocked by interactive ESLint setup prompt; no config created |
| M-04 | `npm run qa:contact` | Contact form validation edge cases | Exited 0 |
| M-05 | Local production server route checks | Public pages, 404, robots, sitemap, API/private status | Expected statuses returned |
| M-06 | Local metadata regex checks | canonical, Open Graph, Twitter card, careers noindex | Expected tags present |
| M-07 | Local response header checks | Security headers on `/contact`; X-Robots-Tag on private API | Expected headers present |
| M-08 | Lighthouse on local homepage | Performance, accessibility, best practices, SEO | 87 / 95 / 100 / 100 |

## 3. Breakage tests performed

| Test ID | Attack / break attempt | What was actually tested | Result |
|---|---|---|---|
| CT-01 | Empty contact form | Automated validation script | Rejected |
| CT-02 | One field only | Automated validation script with only name present | Rejected |
| CT-03 | Whitespace-only values | Automated validation script | Rejected |
| CT-04 | Malformed emails | `abc`, `abc@`, `abc@domain`, `abc@@gmail.com`, `test@.` | Rejected |
| CT-05 | Minimum input | One-character name and short message | Rejected |
| CT-06 | Very long input | Name, email, and message over configured limits | Rejected |
| CT-07 | HTML-like input | `<script>alert("test")</script>` as message text | Accepted as plain text, not rendered |
| CT-08 | SQL-like input | `' OR '1'='1` as message text | Accepted as plain text, not executed |
| CT-09 | Unicode / emoji | Urdu text and emoji message | Accepted |
| CT-10 | Newlines | Multi-line message | Accepted |
| NAV-01 | Direct route refresh | Local GET checks for public routes | 200 for valid routes |
| NAV-02 | Invalid project slug | Local GET `/portfolio/not-a-real-project` | 404 |
| SEC-01 | Private API unauthenticated access | Local GET `/api/private/blog/posts` | 401 with `X-Robots-Tag: noindex, nofollow, noarchive` |
| SEC-02 | Internal private studio path | Local GET `/private-blog-studio` with default configured admin path | 404 with noindex header |
| SEO-01 | robots/sitemap | Local GET `/robots.txt` and `/sitemap.xml` | 200 |
| SEO-02 | Metadata tags | Local HTML checks for canonical, OG, Twitter | Present on sampled pages |
| PERF-01 | Speed audit | Lighthouse local homepage | Performance 87 |

## 4. FIX-NOW findings

| Finding ID | Severity | Before | Fix | After |
|---|---:|---|---|---|
| F-01 | High | Contact form only checked required fields and basic email format. | Added shared validation with min/max limits, stricter email checks, trim normalization, and QA script. | `npm run qa:contact` passed all listed contact validation cases. |
| F-02 | High | Rapid double/triple submit could enter the async handler before React disabled the button. | Added a ref-based submission lock and kept disabled button state. | Duplicate submissions are guarded in code; browser click automation was not available. |
| F-03 | Medium | Contact form lacked length guidance and complete `aria-describedby` hints. | Added field hints, min/max attributes, and combined hint/error descriptions. | Form is clearer for keyboard and screen-reader users. |
| F-04 | High | Root metadata had only title/description; no canonical, metadata base, OG, Twitter card, or production URL. | Added central site config and full metadata in `app/layout.tsx` plus page canonical/OG metadata. | Sampled pages include canonical, OG title, and Twitter card tags. |
| F-05 | High | `sitemap.xml` was missing. | Added `app/sitemap.js` with public static, portfolio, and blog routes. | `/sitemap.xml` returns 200 locally. |
| F-06 | High | `robots.txt` did not advertise sitemap and only disallowed `/api/private/`. | Added sitemap/host and disallowed admin, internal studio, and all `/api/` paths. | `/robots.txt` returns 200 locally; private API also has noindex header. |
| F-07 | Medium | Public pages referenced local images, but no `public/` image assets exist. | Added `SafeImage` server fallback and replaced routed image usage. | Missing assets render branded fallback UI instead of broken images. |
| F-08 | Medium | `/Logo.png` route read `public/logo.png`, which is missing. | Replaced file read with generated branded SVG response. | `/Logo.png` returns 200 locally. |
| F-09 | High | `/careers` had a simulated client-side application form, creating an unrelated public dynamic submission flow. | Converted `/careers` to a static noindex information page with a link to `/contact`. | Only the Formspree contact form remains as the public submission feature. |
| F-10 | Medium | Security response headers were not configured centrally. | Added `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and `Permissions-Policy`. | `/contact` returned expected security headers locally. |
| F-11 | Low | Mobile nav button had no `aria-controls`; desktop underline used `group-hover` without a parent group. | Added `aria-controls` and desktop link `group` class. | Navigation markup is more accessible and hover underline can work. |
| F-12 | Medium | Default 404 page was generic. | Added branded `app/not-found.jsx` with noindex metadata. | Invalid project route returned 404 locally. |

## 5. Fixes implemented

| Fix ID | Files | Summary |
|---|---|---|
| FIX-01 | `components/ContactForm.jsx`, `lib/contactValidation.mjs`, `scripts/qa-contact-validation.mjs`, `package.json` | Hardened contact validation, plain-text edge cases, duplicate-submit lock, honeypot field, and repeatable QA script. |
| FIX-02 | `app/layout.tsx`, `lib/siteConfig.js`, page metadata exports | Added production metadata base, canonical URLs, Open Graph, Twitter card, robots metadata, keywords, and icon reference. |
| FIX-03 | `app/sitemap.js`, `app/robots.js` | Added sitemap and tightened robots rules for admin/API paths. |
| FIX-04 | `next.config.js`, `middleware.js` already present | Added global security headers and API noindex header rules; existing middleware continues to protect private routes. |
| FIX-05 | `components/SafeImage.jsx`, image-using routed pages/components | Added missing-image fallback while preserving existing image slots and layout. |
| FIX-06 | `app/Logo.png/route.js`, `app/icon.svg`, `app/opengraph-image.jsx` | Added resilient branded image/icon/OG assets. |
| FIX-07 | `app/careers/page.jsx` | Replaced simulated application form with static noindex careers information and contact CTA. |
| FIX-08 | `app/not-found.jsx`, `components/Navbar.jsx`, copy updates | Improved 404, nav accessibility, and stale contact copy. |

## 6. Verification evidence

| Evidence ID | Command / check | Output summary |
|---|---|---|
| V-01 | `npm run qa:contact` | `Contact validation QA passed.` Exit 0 |
| V-02 | `npm run build` | Compiled successfully; generated 28 app routes; exit 0 |
| V-03 | Local route checks on `http://localhost:3100` | 200 for `/`, `/portfolio`, `/about`, `/contact`, `/services`, `/blog`, `/careers`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/Logo.png`; 404 for invalid project; 401 for private API |
| V-04 | Metadata check | `/`, `/contact`, `/portfolio`, `/careers` had canonical, OG title, and Twitter card; `/careers` had noindex |
| V-05 | Security header check | `/contact` returned `nosniff`, `strict-origin-when-cross-origin`, `DENY`, and `camera=(), microphone=(), geolocation=()` |
| V-06 | Private route indexing check | `/api/private/blog/posts` and `/private-blog-studio` returned `X-Robots-Tag: noindex, nofollow, noarchive` |
| V-07 | Lighthouse local homepage | Performance 87, Accessibility 95, Best Practices 100, SEO 100 |
| V-08 | Cursor diagnostics | No linter diagnostics reported for edited files |

## 7. KNOWN LIMITATIONS

| Limitation ID | Limitation | Impact |
|---|---|---|
| L-01 | No browser DevTools or Playwright-style visual automation was available. | I did not visually verify every breakpoint at 320/375/390/414/768/1024/1280/1440. |
| L-02 | I did not submit real messages to Formspree. | Avoided sending external test spam; form network success depends on Formspree account/inbox state. |
| L-03 | I did not perform authenticated private blog studio testing. | Admin behavior depends on `BLOG_ADMIN_PASSWORD_HASH`, `BLOG_SESSION_SECRET`, Postgres, and Blob env vars not available locally. |
| L-04 | I did not deploy, commit, or push. | Live Vercel will not reflect these fixes until the user reviews and deploys from GitHub/Vercel. |
| L-05 | Google indexing was not verified through Search Console. | Site is SEO-ready locally, but indexing is not guaranteed and may take time after deployment. |
| L-06 | Public project screenshot assets are absent from this repo. | Fallbacks prevent broken UI; they are not a substitute for real proof screenshots. |
| L-07 | `npm run lint` is interactive in this repo. | Lint was documented as unavailable unless ESLint config is intentionally created. |

## 8. SEO/meta changes

| SEO item | Implemented |
|---|---|
| Metadata base | `https://muhammad-talha-portfolio-omega.vercel.app` via `NEXT_PUBLIC_SITE_URL` fallback |
| Canonical URLs | Root plus sampled static/dynamic pages |
| Open Graph | Site title, description, URL, site name, and generated OG image |
| Twitter card | `summary_large_image` with generated image |
| Robots meta | Public pages indexable by default; careers/no real application page marked noindex; private studio noindex |
| OG image | `app/opengraph-image.jsx` generated branded 1200x630 image |
| Icon | `app/icon.svg` branded MT icon |
| Page descriptions | Updated contact/about copy and key page metadata |

## 9. Findability status

| Item | Status |
|---|---|
| SEO readiness | Improved locally with canonical, OG/Twitter, sitemap, robots, and title/description metadata |
| Google indexing | Not verified; no indexing claim made |
| Sitemap submission | Not performed |
| Live deployment status | Not changed by this pass because no commit/push/deploy was requested |

## 10. Performance/speed results

| Audit | URL | Performance | Accessibility | Best Practices | SEO | Notes |
|---|---|---:|---:|---:|---:|---|
| Lighthouse | `http://localhost:3100/` | 87 | 95 | 100 | 100 | Local production build; Lighthouse default emulation. |

Build warnings observed: Browserslist/caniuse-lite is outdated, and Next recommended installing optional `sharp` for production image optimization. I did not add `sharp` because this pass kept dependency changes minimal.

## 11. Browser/device testing

| Device/browser item | Status |
|---|---|
| Local browser visual QA | Not available in this environment |
| 320/375/390/414/768/1024/1280/1440 viewport visual checks | Not performed; documented limitation |
| Static responsive review | Completed by inspecting Tailwind breakpoints (`sm`, `md`, `lg`, `xl`) on routed pages |
| Lighthouse mobile-style audit | Completed for homepage |
| Console/runtime DevTools checks | Not available; local route checks and build used instead |

## 12. Accessibility checks

| Check | Result |
|---|---|
| Contact labels | Inputs and textarea have explicit labels |
| Contact error messages | Errors use field-specific IDs and `aria-describedby` |
| Submit status | Success/error status uses live region roles |
| Mobile nav | Toggle now has `aria-expanded` and `aria-controls` |
| Image alt/fallback | Routed images use alt text; missing assets render accessible fallback `role="img"` labels |
| 404 | Branded 404 has clear heading and recovery links |
| Lighthouse accessibility | 95 on local homepage |

## 13. Security/input hardening

| Area | Before | After |
|---|---|---|
| Contact input | Required-only and basic email regex | Trim normalization, stricter email, min/max length, plain-text adversarial cases covered |
| Duplicate form submits | Button disabled after state update only | Immediate ref lock blocks repeated handler entry |
| Bot noise | No honeypot | `_gotcha` honeypot value included for Formspree |
| XSS risk | React escaped displayed errors; no message rendering | HTML-like input remains plain text and is not inserted as HTML |
| Private admin/API | Existing middleware protection | Robots and response headers also discourage indexing |
| Security headers | Missing central browser hardening headers | Added nosniff, frame denial, referrer policy, and permissions policy |
| Secrets | `.env.example` contains placeholders only | No real secrets found in source scan |

## 14. Regression test results

| Command / check | Result |
|---|---|
| `npm run qa:contact` | Passed |
| `npm run build` | Passed, exit 0 |
| `npm run lint` | Did not run to completion because Next prompted for ESLint setup |
| Local route regression | Expected status codes for public, private, robots, sitemap, OG, logo routes |
| Local metadata regression | Canonical/OG/Twitter tags present on sampled pages |
| Local security header regression | Expected security headers present on `/contact` |

## 15. Build/deployment status

| Item | Status |
|---|---|
| Local production build | Passed |
| Local production server smoke test | Passed on port 3100, then stopped |
| Git commit | Not created |
| Git push | Not performed |
| Vercel deployment | Not performed |

## 16. Final readiness assessment

| Area | Assessment |
|---|---|
| Functional readiness | Good for local build and route smoke tests |
| Contact form readiness | Validation and duplicate-submit protection improved; real Formspree delivery still needs live inbox verification |
| SEO readiness | Good local implementation; deploy and Search Console submission remain separate steps |
| Accessibility readiness | Improved; Lighthouse accessibility 95 on homepage |
| Security readiness | Improved for input handling, headers, private route noindex, and API access behavior |
| Deployment readiness | Ready for user review before commit/push/deploy |

Overall: the site is locally hardened for Week 7 QA/security/SEO/accessibility/performance requirements, with honest limitations around browser automation, live Formspree submission, authenticated admin testing, and deployment.
