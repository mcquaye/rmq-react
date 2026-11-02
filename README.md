This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## GitHub contribution graph

The graph loads from `public/api/github.php`, which keeps the GitHub token on the server and caches the result for 30 minutes. The host must run PHP 8.1 or newer. Put the token in `.env.local` as `GITHUB_TOKEN=ghp_...` (no `NEXT_PUBLIC_` prefix, which would put it in the browser code). `npm run build` writes it into `out/api/github-token.php`, which `out/api/.htaccess` blocks from being opened, so it goes up with the rest of `out`.

`next dev` does not run PHP, so the graph shows as unavailable in local development unless the endpoint is served separately.

## PeoplePerHour portfolio images

`npm run portfolio:images` renders one image per project into `portfolio-images/dark` and `portfolio-images/light`, using Chrome on macOS. The projects and wording are listed in `scripts/portfolio-images.mjs`. PeoplePerHour bans links and contact details in these images, so check each one before uploading.
