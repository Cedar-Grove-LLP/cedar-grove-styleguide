# Cedar Grove Design System

This repo is Cedar Grove LLP's design system: a shared source of truth for how the firm's
digital work looks, sounds, and behaves. It has two halves, documented together in one
Storybook instance. The visual and component half covers design tokens and accessible React
primitives built on Radix UI and Tailwind CSS v4. The written half is a brand and content
style guide — voice, tone, terminology, and UI copy patterns — filed under **Brand & Content**
in the same Storybook sidebar. Both halves matter equally: an accessible button with the wrong
words on it still fails a client, and well-written copy in an inaccessible dialog fails them
too.

One thing to be clear about up front: this is not a finished, ratified system. It's a first,
thorough proposal — a comprehensive menu of grounded recommendations for Cedar Grove to
accept, adjust, or override, decision by decision. Wherever there's a real choice to make
(a primary color, a type pairing, an ownership model), the docs in this repo name a
recommendation and defend it, and name at least one genuine alternative alongside it. Nothing
here should be read as locked in until the firm says so.

## Quick start

```bash
npm install
npm run storybook
```

Storybook opens at `http://localhost:6006`. It's the living documentation for this system —
every component's props and states, plus every Foundations, Components, and Brand & Content
page — and it's the place to look when you want to see something rather than read about it.

## Tech stack

- **React 19 + TypeScript** for components.
- **Tailwind CSS v4**, configured CSS-first via `@theme` — no `tailwind.config.js`.
- **Radix UI** primitives underneath interactive components, for keyboard and screen-reader
  behavior that doesn't have to be rebuilt by hand.
- **class-variance-authority** for typed, constrained component variants.
- **Design tokens** authored as JSON in the
  [W3C Design Tokens Community Group](https://www.designtokens.org/) format and compiled to
  CSS custom properties by [Style Dictionary](https://styledictionary.com/).
- **Storybook** (Vite builder), with the accessibility (`a11y`), `addon-docs`,
  `addon-themes`, `addon-links`, and `storybook-design-token` addons.

None of this is a new direction for the firm. Cedar Grove's own production analytics app
(`cedar-grove-analytics`) already runs React 19, Tailwind v4, and Lucide icons — this system
continues that stack rather than introducing a second one for the firm to maintain.

## Repository structure

| Path | What it is |
| --- | --- |
| `tokens/` | Source-of-truth design tokens (JSON) — core values and semantic (light/dark) aliases. Edit here. |
| `style-dictionary.config.mjs` | The build pipeline that compiles `tokens/` into CSS. |
| `src/styles/` | Generated token CSS plus `globals.css`, which wires tokens into Tailwind's theme. The `tokens/` subfolder here is generated — don't hand-edit it, run `npm run tokens:build` instead. |
| `src/components/ui/` | Component primitives (button, input, dialog, and so on), each with a Storybook stories file alongside it. |
| `src/lib/` | Shared utilities (class-name merging, etc.) used across components. |
| `docs/` | Written MDX content: Foundations, Components context, Brand & Content, and Governance — everything Storybook renders as prose. |
| `.storybook/` | Storybook configuration (addons, theming, preview setup). |

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs a minimal Vite preview app — a fast, Storybook-independent check that the token pipeline and components wire up end to end. |
| `npm run build` | Type-checks and builds the Vite app. |
| `npm run storybook` | Starts Storybook locally at `http://localhost:6006`. |
| `npm run build-storybook` | Builds static Storybook output, e.g. for hosting or review. |
| `npm run tokens:build` | Compiles `tokens/**/*.json` into the generated CSS in `src/styles/tokens/`. Runs automatically before `dev` and `build`. |
| `npm run lint` | Runs ESLint across the repo. |
| `npm run typecheck` | Runs the TypeScript compiler in no-emit mode. |

## Where to go next

- **[`docs/system/introduction.mdx`](./docs/system/introduction.mdx)** (rendered in Storybook
  as **Introduction**) — start here. It lays out how the system is organized and how to use
  it day to day.
- **[`CONTRIBUTING.md`](./CONTRIBUTING.md)** — the practical, step-by-step guide to making a
  change in this repo, from local setup through what a pull request should include.
- **[`GOVERNANCE.md`](./GOVERNANCE.md)** — who owns what, and what review a change needs
  before it ships.

## Ownership

Internal design system for Cedar Grove LLP. Not an open-source project; there is no public
license.
