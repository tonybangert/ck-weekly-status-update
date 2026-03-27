# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally
- `npm run lint` — ESLint (flat config, JS/JSX files)

No test framework is configured.

## Architecture

Single-page React 19 + Vite 8 app (JSX, not TypeScript) that renders a **client engagement status report** for CK Marketing Solutions. No routing, no state management library, no backend.

### Single-file structure

The entire UI lives in `src/ClientStatusReport.jsx` (~900 lines). Sub-components are defined in the same file:

- `StatusIcon` — renders a status indicator (checkmark / pulsing dot / empty circle) based on `status`
- `ProgressBar` — calculates completion % from milestones and renders a progress bar
- `MilestoneCard` — expandable card for each milestone; grid layout adapts columns based on whether `sprintData` exists (2-col vs 3-col)
- `MeetingNotesModal` — modal that displays structured meeting notes for milestones that have them
- `ClientStatusReport` (default export) — root component managing `expandedId` and `showNotes` state

### Data model

All engagement data is hardcoded in the `milestones` array at the top of the file. Each milestone object:

```
{ id, week, date, title, subtitle, status, details[], deliverables[] }
```

Optional fields that change rendering behavior:
- `sprintData[]` — when present, the expanded card uses a 3-column grid (adds a "Sprint Data" column)
- `meetingNotes { sections[] }` — when present, the milestone appears in the Meeting Notes modal; each section has `heading` and `items[]`

The `statusConfig` object maps `status` values (`"complete"`, `"active"`, `"upcoming"`) to display labels, colors, and icon types.

### Styling

All styles are **inline** via React `style` props — no CSS framework, no CSS modules. CSS animations (`@keyframes`) are injected via a `<style>` tag inside the root component. The only external CSS is `src/index.css` (reset only).

Colors come from the `BRAND` object (navy/orange/green palette). All components reference this for consistency.

## Lint

ESLint uses flat config (`eslint.config.js`). Custom rule: `no-unused-vars` ignores identifiers starting with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
