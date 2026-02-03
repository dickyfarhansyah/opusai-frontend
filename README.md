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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployment

Dockerfile already provided, however the base url should be adjusted by the backend url via docker build args in build time. You could use the command below.

```
docker build --build-arg NEXT_PUBLIC_BASE_URL="<backend url>" -t <tag-name> <Dockerfile path>
```

To run, refer to this docker command.

```
docker run -d -p <host-port>:3000 <tag-name>
```