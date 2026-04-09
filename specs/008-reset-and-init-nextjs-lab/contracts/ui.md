# UI Contract: Documentation Viewer

## Overview
The application MUST provide a clean, accessible interface for reading bundled Next.js documentation.

## Components

### 1. Sidebar Navigation
- **Requirement**: Display a tree or list of all sections and lessons found in `node_modules/next/dist/docs/`.
- **Behavior**: Clicking a lesson updates the main content area.

### 2. MDX Content Area
- **Requirement**: Render MDX/Markdown content with syntax highlighting for code blocks.
- **Styling**: Use Tailwind CSS for typography (e.g., `@tailwindcss/typography`).
- **Standard**: Follow official Next.js documentation styling (minimalist, clean).

### 3. "AI Source" Indicator
- **Requirement**: Small badge or footer indicating that the content is sourced from the local `node_modules` (version-specific).
- **Purpose**: Reassure users (and agents) that they are viewing the ground truth for their installed version.
