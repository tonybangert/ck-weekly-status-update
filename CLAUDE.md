# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally
- `npm run lint` — ESLint (flat config, JS/JSX files)

## Architecture

This is a single-page React 19 + Vite 8 app (JSX, not TypeScript) that renders a **client engagement status report** for CK Marketing Solutions. There is no routing, no external state management, and no backend.

### Single-component structure

The entire UI lives in `src/ClientStatusReport.jsx` (~890 lines). It contains:

- **`milestones` array** — All engagement data (scope, deliverables, sprint data, meeting notes) is hardcoded here. Each milestone has a `status` of `"complete"`, `"active"`, or `"upcoming"`.
- **`BRAND` object** — The color palette (navy, orange, green, grays). All components reference this for consistency.
- **Components** (all in the same file): `StatusIcon`, `ProgressBar`, `MilestoneCard`, `MeetingNotesModal`, and the default export `ClientStatusReport`.

### Styling approach

All styles are **inline** via React `style` props — no CSS framework, no CSS modules. CSS animations (`@keyframes`) are injected via a `<style>` tag inside the component. The only external CSS is `src/index.css` which resets margins/padding.

### Key patterns

- Milestone expansion state is toggled via `expandedId` in the root component.
- Meeting notes modal renders conditionally and filters milestones that have a `meetingNotes` property.
- Grid layout in expanded cards adapts columns based on whether `sprintData` exists (2-col vs 3-col).

## Lint

ESLint uses flat config (`eslint.config.js`). Custom rule: `no-unused-vars` ignores identifiers starting with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
