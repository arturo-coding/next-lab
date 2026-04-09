# Data Model: Documentation Content

## Entities

### Documentation Lesson
Represents a single learning unit sourced from bundled Next.js documentation.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `slug` | `string` | URL-friendly identifier based on file path | Unique, non-empty |
| `title` | `string` | Human-readable title of the lesson | Non-empty |
| `content` | `string` | The raw MDX/Markdown content | Non-empty |
| `path` | `string` | Absolute or relative path to the source file in `node_modules` | Valid file path |
| `section` | `string` | Parent category (e.g., "Getting Started") | Non-empty |

## State Transitions
- **Discovery**: Locate the documentation tree in `node_modules/next/dist/docs/`.
- **Loading**: Read the file content from disk.
- **Parsing**: Extract metadata (frontmatter) and content.
- **Rendering**: Convert MDX/Markdown to HTML for display.
