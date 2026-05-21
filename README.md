# erp-api-tester-next

ERP API testing platform — playbooks, assertions, and shared reports.

Built for teams that integrate with ERP systems (TOTVS Protheus, Sankhya, etc.) and need a reliable way to test, document, and monitor API endpoints.

## Features

- **API Explorer** — test any ERP endpoint with auto-filled fields and schema validation
- **Playbooks** — chain multiple requests into automated test sequences with assertions
- **Shared Reports** — share playbook run results via public links
- **Multi-ERP** — support for multiple ERP systems and environments per company
- **Collections** — organize and browse API responses with structured viewers
- **Records** — save and categorize API call results for documentation
- **Request History** — full audit log of every API call with filters and search
- **Role-based Access** — admin, editor, viewer roles with Clerk authentication
- **Command Palette** — keyboard-first navigation across the entire app

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions, Prisma ORM
- **Database:** PostgreSQL with pgvector
- **Auth:** Clerk
- **Monorepo:** pnpm workspaces
- **Testing:** Vitest
- **Deploy:** Docker, VPS-ready

## Quick Start

```bash
git clone https://github.com/arktnld/erp-api-tester-next
cd erp-api-tester-next
pnpm install
cp apps/web/.env.example apps/web/.env.local
# Configure database and Clerk keys in .env.local
pnpm -F db db:push
pnpm -F web dev
```

## Project Structure

```
apps/
  web/              Next.js application
    app/            Pages and routes
    components/     UI components
    lib/            Business logic, actions, services
packages/
  db/               Prisma schema and migrations
docs/               Architecture docs and plans
```

## License

MIT
