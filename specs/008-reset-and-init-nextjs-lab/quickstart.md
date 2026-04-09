# Quickstart: Reset and Initialize Next.js Lab

This guide explains how to execute the project reset and verify the new AI-enabled Next.js environment.

## Execution

1.  **Run the Reset Script**:
    ```bash
    # (Optional: Backup any unique work outside this project)
    # The reset command will be part of the implementation tasks
    ./scripts/reset-project.sh
    ```

2.  **Verify Next.js Initialization**:
    - Ensure `package.json` shows `next` version `16.2.x` or higher.
    - Check for `AGENTS.md` in the root directory.

3.  **Verify Spec-Kit Restoration**:
    - Ensure `.specify/init-options.json` exists and matches previous configuration.

## Verification Steps

### 1. Documentation Access
Run the following command to verify the bundled documentation is present:
```bash
ls -R node_modules/next/dist/docs/
```

### 2. AI Agent Recognition
Open the project in an AI-enabled editor (e.g., Cursor) or run an agent (e.g., Gemini CLI). The agent should acknowledge the `AGENTS.md` file and its instructions.

### 3. Application Rendering
Start the development server:
```bash
yarn dev
```
Navigate to `http://localhost:3000`. You should see the first lesson from the Next.js documentation ("Getting Started") rendered on the page.
