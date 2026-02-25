# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is `@nulogy/components`, a React component library (design system) for Nulogy applications. It is a single package (not a monorepo), built with TypeScript, styled-components, and styled-system.

## Commands

```bash
# Install dependencies (first time)
pnpm i && pnpm build

# Local development — starts Storybook at localhost:9999
pnpm start

# Build the package
pnpm build

# Run all tests
pnpm test

# Unit tests only (Vitest)
pnpm test:components

# Run a single test file
pnpm test:components -- src/Button/Button.spec.tsx

# Unit tests in watch mode
pnpm test:components:watch

# E2E tests (requires Storybook running on port 9999)
pnpm start:storybook   # in one terminal
pnpm test:cypress      # in another

# Type check, lint, and format validation
pnpm check

# Auto-fix lint and format issues
pnpm fix
```

## Architecture

### Stack
- **React** ^16.10.2–<19.0.0 (currently targeting React 18 readiness)
- **styled-components** v6 + **styled-system** for prop-based spacing/layout
- **@nulogy/tokens** — design tokens (colors, spacing, typography, radii, shadows)
- **@nulogy/icons** — Material Icons wrapper
- **@radix-ui** — accessible primitives (Tooltip, NavigationMenu)
- **i18next / react-i18next** — internationalization
- **Vitest** + **React Testing Library** — unit tests
- **Cypress** — E2E tests against Storybook
- **Storybook 8** — component documentation and visual testing via Chromatic

### Provider System

All components must be wrapped in `NDSProvider`, which composes:
- `ThemeProvider` (styled-components) with the NDS theme from `@nulogy/tokens`
- `I18nextProvider` for localization
- `ComponentVariantContextProvider` — `"desktop" | "tablet" | "phone"` responsive variant
- `FeatureFlagsContextProvider` — experimental feature opt-in
- `GlobalStylesComposer` — global typography and font defaults

### Component Structure

Each component lives in `src/[ComponentName]/` and typically contains:
```
ComponentName/
├── ComponentName.tsx        # Component implementation
├── ComponentName.story.tsx  # Storybook stories
├── ComponentName.spec.tsx   # Unit tests (if needed)
└── index.ts                 # Re-exports
```

All public exports go through `src/index.ts`.

### Styling Conventions

Components use `styled-components` with styled-system utilities. Spacing props (`mt`, `mb`, `p`, etc.) use tokens via `space` from styled-system (e.g., `"x1"`, `"x2"`). Variants are declared with `variant()` from `@styled-system/variant`.

### Testing Conventions

- **Unit tests**: Test event handlers and complex logic. Use React Testing Library.
- **E2E tests**: Use Cypress + Storybook for interactive components.
- **Visual tests**: Every story gets a visual snapshot via Chromatic.
- **Selector priority**: Label → Placeholder → Text → Alt → Title → Role → TestID. Avoid class names and IDs.
- Test IDs must be preserved across refactors to avoid breaking downstream consuming apps.

## Releases & Commits

Uses [Conventional Commits](https://www.conventionalcommits.org) with semantic-release for automated versioning.

- `fix:` → patch release
- `feat:` → minor release
- Breaking changes: include `BREAKING CHANGE:` in the **commit body** — using `!` alone (e.g., `feat!:`) is **not** sufficient for semantic-release to detect it.
