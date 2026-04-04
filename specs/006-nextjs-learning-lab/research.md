# Research: Next.js Learning Lab

## Content Structure & Dynamic Routing

- **Decision**: Use dynamic App Router segments (e.g., `app/lessons/[section]/[lesson]/page.tsx`) with content stored as local Markdown/MDX files.
- **Rationale**: Keeps the structure flat and easy to maintain while allowing for powerful rendering of examples.
- **Alternatives considered**: Storing all content in a single large JSON (harder to manage long-term) or using a headless CMS (unnecessary complexity for a demo).

## Side-by-Side View Implementation

- **Decision**: Use `react-resizable-panels` for the split-view layout.
- **Rationale**: Provides a native-feeling, customizable, and accessible resizable panel experience that is widely used in modern DevTools-like apps.
- **Alternatives considered**: Custom CSS Flexbox/Grid (harder to implement smooth resizing) or `framer-motion` (overkill for simple split view).

## Code Syntax Highlighting

- **Decision**: Use `shiki` for syntax highlighting.
- **Rationale**: Shiki performs highlighting at build-time or on the server, resulting in zero client-side JavaScript for syntax highlighting, aligning perfectly with the Server-First principle (RSC).
- **Alternatives considered**: `prismjs` or `highlight.js` (both require significant client-side runtime).

## Interactive Exercise Validation

- **Decision**: Client-side validation using Zod for immediate feedback, with Server Actions for persisting completion status.
- **Rationale**: Provides the best UX for the user while ensuring type-safety across the board.
- **Alternatives considered**: Full server-side validation for every interaction (higher latency, unnecessary for simple learning exercises).
