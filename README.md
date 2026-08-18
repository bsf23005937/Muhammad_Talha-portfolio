# SynixSolution

SynixSolution is a Next.js 14 digital agency website for AI automation, SEO, backend development, and responsive web solutions. It includes a public blog plus a hidden private blog studio backed by Supabase/Postgres for posts and Vercel Blob for image uploads.

## Tech Stack

- Next.js 14 and React 18
- Tailwind CSS
- Supabase/Postgres via `pg`
- Vercel Blob via `@vercel/blob`

## Install

Use npm because this repo includes `package-lock.json`.

```bash
npm install
```

## Environment Variables

Create a local `.env.local` file from `.env.example` and fill in your own values. Do not commit `.env.local` or real secrets.

```bash
BLOG_ADMIN_PATH=/secret-blog-studio
BLOG_ADMIN_PASSWORD_HASH=scrypt\$16384\$8\$1\$replace-with-generated-salt\$replace-with-generated-key
BLOG_SESSION_SECRET=replace-with-a-long-random-secret

POSTGRES_URL=postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
POSTGRES_PRISMA_URL=postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require&pgbouncer=true
POSTGRES_URL_NON_POOLING=postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
POSTGRES_URL_NO_SSL=postgres://USER:PASSWORD@HOST:5432/DATABASE
POSTGRES_USER=USER
POSTGRES_HOST=HOST
POSTGRES_PASSWORD=PASSWORD
POSTGRES_DATABASE=DATABASE

BLOB_READ_WRITE_TOKEN=vercel_blob_rw_placeholder
```

Notes:

- `BLOG_ADMIN_PATH` is the public URL for the hidden admin studio. This project defaults to `/secret-blog-studio`.
- `BLOG_ADMIN_PASSWORD_HASH` must be generated with the script below. Do not store the plain admin password.
- In `.env.local`, escape each `$` in `BLOG_ADMIN_PASSWORD_HASH` as `\$` so Next does not treat it as an environment variable reference. In the Vercel dashboard, paste the hash without backslashes.
- `BLOG_SESSION_SECRET` signs the admin session cookie. Use a long random value.
- The public blog falls back to `data/blogPosts.js` when Postgres is not configured. The private admin studio requires Postgres to create, edit, publish, or delete posts.
- Image upload requires `BLOB_READ_WRITE_TOKEN`. Uploaded images are public Blob URLs under the `blog/` path.

To generate a session secret, you can run:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

## Generate Admin Password Hash

Choose an admin password with at least 10 characters, then run:

```bash
npm run blog:hash-password -- "your-admin-password"
```

Use the generated value for `BLOG_ADMIN_PASSWORD_HASH` in `.env.local` and in Vercel.

When putting the hash into `.env.local`, escape the dollar signs:

Example output format:

```bash
BLOG_ADMIN_PASSWORD_HASH=scrypt$16384$8$1$generated-salt$generated-key
```

Local `.env.local` format:

```bash
BLOG_ADMIN_PASSWORD_HASH=scrypt\$16384\$8\$1\$generated-salt\$generated-key
```

## Seed Blog Posts

After Postgres environment variables are available in the shell running the command, seed the database from `data/blogPosts.js`:

```bash
npm run blog:seed
```

If you intentionally want the seed data to overwrite existing matching slugs, run:

```bash
npm run blog:seed -- --overwrite
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the public site at [http://localhost:3000](http://localhost:3000).

Open the private blog studio at the path set in `BLOG_ADMIN_PATH`. For example, if your `.env.local` contains:

```bash
BLOG_ADMIN_PATH=/secret-blog-studio
```

then open [http://localhost:3000/secret-blog-studio](http://localhost:3000/secret-blog-studio). When `BLOG_ADMIN_PATH` is different from `/private-blog-studio`, the internal `/private-blog-studio` route returns 404.

## Dynamic Contact Form Feature

This portfolio has exactly one public dynamic feature: the Contact page form.

### What is a backend?

A backend is the server-side part of a website. It receives data, processes it, stores it, or sends it somewhere else. In this portfolio, I am not building my own backend for the contact form yet.

### What the contact form does

The Contact page lets a visitor enter:

- Full Name
- Email Address
- Message

When the visitor clicks **Send Message**, the form validates the fields, sends the submission to Formspree, and then Formspree forwards it to the configured inbox.

### Contact form data flow

Visitor → Portfolio Contact Form → Formspree → Configured email/inbox → I receive the message

### Why Formspree is used

Formspree is used because it gives the portfolio a working contact form on a free tier without creating a custom backend, database, or private server credentials. The Formspree endpoint is public and safe to use in frontend code. No secret API key is exposed.

### Configure the Formspree endpoint

1. Create a free Formspree form.
2. Copy the public form endpoint. It usually looks like `https://formspree.io/f/yourFormId`.
3. In `.env.local`, set:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=YOUR_FORMSPREE_ENDPOINT
```

4. Replace `YOUR_FORMSPREE_ENDPOINT` with the real Formspree endpoint.
5. In Vercel, add the same environment variable in Project Settings → Environment Variables.
6. Redeploy the Vercel site.
7. Submit a real test message from the deployed Contact page and confirm it reaches the configured inbox.

## Using The Private Blog Studio

1. Visit the hidden admin path and log in with the plain password you used to generate `BLOG_ADMIN_PASSWORD_HASH`.
2. Click `New Post` to create a post, or choose `Edit` from the post list to update one.
3. Fill in the title, slug, category, date, read time, author, image, excerpt, SEO description, intro, sections, long content, conclusion, and tags.
4. Write sections one per line as `Heading | Body`.
5. Separate long content paragraphs with blank lines.
6. Use `Upload Image` to send JPG, PNG, WebP, or GIF files up to 5 MB to Vercel Blob. The returned Blob URL is placed into the Image URL field.
7. Check `Published` or use the `Publish`/`Unpublish` button to control public visibility.
8. Check `Featured` to feature a post. Saving a featured post clears the featured flag from other posts.
9. `Delete` soft-deletes the post and unpublishes it.

Published posts appear on `/blog` and `/blog/[slug]`.

## Deploy On Vercel

1. Create or connect the Vercel project for this repo.
2. Add Supabase/Postgres environment variables and Vercel Blob storage to the project.
3. In Vercel Project Settings, add the blog variables:
   - `BLOG_ADMIN_PATH`
   - `BLOG_ADMIN_PASSWORD_HASH`
   - `BLOG_SESSION_SECRET`
4. Add the Supabase-provided Postgres variables, including `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, `POSTGRES_USER`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`, and `POSTGRES_DATABASE`.
5. Add the Vercel Blob variable `BLOB_READ_WRITE_TOKEN`.
6. Deploy the site.
7. Run `npm run blog:seed` in an environment that has the Supabase/Postgres variables loaded, or seed locally while connected to the production database if that is your intended workflow. The seed script reads `process.env`, so `.env.local` must be loaded into that shell before running it.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run blog:hash-password -- "your-admin-password"
npm run blog:seed
```

## Troubleshooting

- `Admin authentication is not configured.` means `BLOG_ADMIN_PASSWORD_HASH` or `BLOG_SESSION_SECRET` is missing.
- `Invalid password.` means the entered password does not match `BLOG_ADMIN_PASSWORD_HASH`. Generate a new hash and update the environment variable if needed.
- `Postgres is not configured` or `Postgres is not configured for blog management` means the Supabase/Postgres URL variables are missing from the current environment.
- `Blob storage is not configured` means `BLOB_READ_WRITE_TOKEN` is missing.
- Image uploads must be JPG, PNG, WebP, or GIF and 5 MB or smaller.
- If `npm run lint` prompts to create an ESLint config, finish that interactive setup first or rely on `npm run build` until the ESLint config exists.