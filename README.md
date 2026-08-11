This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AI Usage Declaration

**Code-generation tools used:** Claude Sonnet 5 (Anthropic), claude.ai web/chat interface.

**Model used:** Claude Sonnet 5 (claude-sonnet-5)

**Usage pattern:** AI was used interactively throughout development for architecture guidance, debugging, and code review — not for whole-project generation.

### Specific Uses:
- **Data model decisions:** Discussed and decided on constraints before any code was written (archive as flag not separate table, overdue as derived/computed, status as fixed enum with CHECK constraint).
- **Server Actions restructure:** AI proposed the Server Actions + server-component pattern; I implemented the files myself and had AI review them.
- **Error diagnosis:** AI diagnosed runtime/build errors from pasted terminal logs:
  - Client/server module boundary violation (Node-only modules in `'use client'`)
  - Tailwind CSS v4 syntax mismatch
  - Next/font incompatibility after Next.js version downgrade
  - SQLite boolean-binding type error
- **Code review:** AI reviewed my restructured Server Action files before committing.
- **Feature addition:** AI assisted with restore-from-archive functionality.
- **Styling guidance:** AI suggested color palette updates and Tailwind transitions.

### Tools Used:
- **In-line/IDE AI tools used:** VS Code built-in IntelliSense and autocomplete
- **AI code review tools used:** Claude (Anthropic), web-based chat interface

### Not Used For:
- Initial whole-app scaffolding beyond `create-next-app` defaults
- Writing test code (I wrote tests myself)
- Writing documentation content (I wrote docs myself)

**Declaration:** The preceding document was reviewed and edited with: Claude-Web[Claude Sonnet 5]

This repository makes use of AI code generation using the following tools:
- Claude-Web[Claude Sonnet 5]

This repository makes use of AI in-line editing using the following tools:
- VS Code (built-in IntelliSense, autocomplete, and code suggestions)

This repository does not use AI code review (beyond Claude web interface).