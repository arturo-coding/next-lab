# Research: Project Reset and Next.js 16.2+ Integration

## Unknowns Resolved

### 1. Bundled Next.js Documentation Path
- **Finding**: Documentation is bundled in `node_modules/next/dist/docs/` starting from Next.js 16.2.0-canary.37.
- **Decision**: Target Next.js 16.2+ (current stable is 16.2.2 as of April 2026).
- **Rationale**: Meets the user's core requirement for offline-first, version-matched docs for AI agents.

### 2. `AGENTS.md` Purpose and Content
- **Finding**: `AGENTS.md` is a root file that instructs AI agents to use local documentation.
- **Content**:
  ```markdown
  # Next.js: ALWAYS read docs before coding
  Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`.
  Your training data is outdated — the docs are the source of truth.
  ```
- **Decision**: Ensure `create-next-app` generates this or create it manually if it doesn't.

### 3. `create-next-app` Automation
- **Finding**: `npx create-next-app@latest` includes `AGENTS.md` by default in 2026.
- **Flags**: `--ts`, `--eslint`, `--tailwind`, `--src-dir`, `--app`, `--import-alias "@/*"`.
- **Decision**: Use these flags to automate the setup as requested.

### 4. Spec-Kit Re-initialization
- **Finding**: Spec-Kit configuration is stored in `.specify/init-options.json`.
- **Decision**: Run `npx speckit init` (or equivalent) after Next.js setup, restoring the same configuration:
  - AI: Gemini
  - Branch Numbering: Sequential
  - Preset: (None)
  - Script: bash

### 5. MDX Rendering from `node_modules`
- **Finding**: `node_modules` content is accessible via standard Node.js file system APIs. Rendering requires an MDX library (like `next-mdx-remote` or Next.js built-in support).
- **Decision**: Use a simple file loader to read the first lesson and a basic MDX renderer to display it.

## Alternatives Considered
- **Keeping Next.js 15.0**: Rejected because it lacks bundled documentation and `AGENTS.md` features required by the user.
- **Manual Doc Copying**: Rejected in favor of the official `node_modules` bundling which ensures version alignment.

## Risk Assessment
- **Security**: Reading files from `node_modules` is safe as long as paths are validated and not exposed directly to user-controlled inputs.
- **Build Performance**: MDX files in `node_modules` might need specific handling to be included in the build if they are not part of the standard `src` tree.
