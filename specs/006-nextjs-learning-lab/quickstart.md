# Quickstart: Next.js Learning Lab

## Prerequisites
- Node.js 20 or later
- pnpm or npm

## Setup
1. Clone the repository and navigate to the root.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Access the learning lab at `http://localhost:3000`.

## Key Commands
- `pnpm build`: Generate optimized production build (includes static lesson content).
- `pnpm test`: Run Playwright and Vitest suites.
- `pnpm lint`: Run ESLint check for type safety.

## Content Management
To add a new lesson:
1. Create a new file in `src/content/lessons/[section]/[lesson].md`.
2. Ensure the frontmatter follows the schema defined in `data-model.md`.
3. Register any custom preview components in `src/components/lessons/index.ts`.
