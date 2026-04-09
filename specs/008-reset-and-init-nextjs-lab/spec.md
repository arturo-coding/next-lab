# Feature Specification: Reset and Initialize Next.js Lab

**Feature Branch**: `008-reset-and-init-nextjs-lab`  
**Created**: 2026-04-08  
**Status**: Draft  
**Input**: User description: "Delete all the project, the idea is to start again everything from scratch even the speckit project initialization, delete all. then we will start with the NextJS project init with the next params for instalation: yarn create next-app Would you like to use TypeScript? Yes Which linter would you like to use? ESLint Would you like to use React Compiler? Yes Would you like to use Tailwind CSS? Yes Would you like your code inside a src/ directory? Yes Would you like to use App Router? (recommended) Yes Would you like to customize the import alias (@/* by default)? Yes What import alias would you like configured? @/* Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? Yes And the important part is the AGENTS.md, as it allows any agent to get access to complete docs for NextJS and latest best practices. Once the NextJS is already initialized, then we need to start again the initialization of the psec-kit project, and all prompts will be the same with the difference that the agents will have now AGENTS.md created by NextJS. The mvp will be only one lesson, and this lesson will be the first in the NextJS docs files. ## How NextJS docs AI works[](https://nextjs.org/docs/app/guides/ai-agents#how-it-works) When you install next, the Next.js documentation is bundled at node_modules/next/dist/docs/. The bundled docs mirror the structure of the Next.js documentation site (https://nextjs.org/docs): node_modules/next/dist/docs/ ├── 01-app/ │ ├── 01-getting-started/ │ ├── 02-guides/ │ └── 03-api-reference/ ├── 02-pages/ ├── 03-architecture/ └── index.mdx This means agents always have access to docs that match your installed version — no network request or external lookup required. The AGENTS.md file at the root of your project tells agents to read these bundled docs before writing any code. Most AI coding agents — including Claude Code, Cursor, GitHub Copilot, and others — automatically read AGENTS.md when they start a session."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Project Reset and Environment Setup (Priority: P1)

As a developer, I want to completely wipe the current project state (excluding deployment workflows) and re-initialize it with the latest Next.js configuration and Spec-Kit, so that I have a clean, standard foundation for the Learning Lab.

**Why this priority**: Essential for starting from a known "clean" state as requested while preserving infrastructure.

**Independent Test**: Can be tested by verifying the project root is empty (or near-empty) before initialization, then verifying the presence of Next.js and Spec-Kit configuration files, while confirming `.github` remains.

**Acceptance Scenarios**:

1. **Given** an existing project directory, **When** the reset is executed, **Then** all files except the reset script and `.github/` directory are removed.
2. **Given** a clean directory, **When** `yarn create next-app` is run with the specified parameters, **Then** a functional Next.js project is created in the root.
3. **Given** a new Next.js project, **When** Spec-Kit is initialized, **Then** the `.specify` directory and associated configurations are restored.

---

### User Story 2 - AI-Ready Documentation Access (Priority: P2)

As a developer/agent user, I want an `AGENTS.md` file in the root that points to bundled Next.js documentation, so that AI coding agents can automatically access up-to-date best practices without external lookups.

**Why this priority**: Core requirement for enabling modern AI-assisted development workflows within the lab.

**Independent Test**: Can be tested by checking for the existence of `AGENTS.md` and verifying its content points to the correct location in `node_modules`.

**Acceptance Scenarios**:

1. **Given** the `AGENTS.md` file exists, **When** an AI agent reads it, **Then** it correctly identifies the path to bundled Next.js docs.
2. **Given** the project has `next` installed, **When** navigating to the path specified in `AGENTS.md`, **Then** the documentation files are accessible.

---

### User Story 3 - MVP Lesson Rendering (Priority: P3)

As a learner, I want to see the first lesson from the official Next.js documentation rendered within the application, so that I can begin learning immediately in a local environment.

**Why this priority**: Demonstrates the core value of the lab - local, offline-first learning using official docs.

**Independent Test**: Can be tested by running the application and verifying that the content from the first Next.js doc lesson is visible on the page.

**Acceptance Scenarios**:

1. **Given** the application is running, **When** I visit the home page or lesson route, **Then** the content from `node_modules/next/dist/docs/01-app/01-getting-started/index.mdx` (or equivalent first lesson) is displayed.

---

### Edge Cases

- **Missing node_modules**: What happens if the app tries to render a lesson before `npm install` has been run?
- **Invalid Docs Path**: How does the system handle a situation where the Next.js version doesn't bundle docs in the expected location?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a mechanism to purge the current project directory including `.specify` configuration, EXCEPT for the `.github/` directory.
- **FR-002**: System MUST initialize a Next.js project using `yarn create next-app` with: TypeScript, ESLint, React Compiler, Tailwind CSS, `src/` directory, App Router, and `@/*` alias.
- **FR-003**: System MUST include an `AGENTS.md` file in the root directory following Next.js AI guidelines.
- **FR-004**: System MUST re-initialize Spec-Kit following the Next.js setup.
- **FR-005**: System MUST render the first lesson from the bundled Next.js documentation located in `node_modules/next/dist/docs/`.

### Key Entities *(include if feature involves data)*

- **Documentation Lesson**: Represents a single unit of learning content sourced from Next.js bundled docs. Key attributes include title, content, and relative path within the docs structure.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Project reset and re-initialization (Next.js + Spec-Kit) completes successfully without manual intervention for configuration flags.
- **SC-002**: `AGENTS.md` is present in the root and contains valid pointers to `node_modules/next/dist/docs/`.
- **SC-003**: Users see the first documentation lesson rendered in the UI within 2 seconds of initial page load.
- **SC-004**: AI agents (like Claude Code or Cursor) can successfully locate and read the bundled docs using the `AGENTS.md` guidance.

## Assumptions

- **Local Environment**: Assumes `yarn` and `node` (version 20+) are installed on the developer's machine.
- **Standard Docs Structure**: Assumes the Next.js version installed follows the documented structure for bundled docs in `node_modules`.
- **Automated Init**: Assumes the `yarn create next-app` command can be fully automated or clearly guided by the agent.
