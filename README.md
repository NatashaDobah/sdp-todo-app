# SDP Todo App

A local-first todo application built with Next.js and SQLite. Tasks can
be created, sorted, archived, restored, and edited, with overdue status
computed automatically from the due date.

## Getting Started

### Requirements
- Node.js v20.0.0 or higher (Tailwind CSS v4 requires Node 20+)
- npm v9.0.0 or higher

### Setup

```bash
git clone https://github.com/NatashaDobah/sdp-todo-app.git
cd sdp-todo-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The SQLite database file (`todo.db`) is created automatically on first
run in the project root, and data persists across restarts.

### Running Tests

```bash
npm test
```

Full setup details, troubleshooting, and Node version notes are in
[`docs/running.md`](docs/running.md).

## Project Structure

- `src/app/` — Next.js App Router pages and components
- `lib/` — database connection, task CRUD functions, and server actions
- `db/schema.sql` — SQLite schema
- `docs/` — database design, running instructions, and third-party library notes
- `tests/` — Vitest test suite

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