# CLAUDE.md

Agent-facing guide for Cedar Grove LLP's design system. Read this before making changes.

## What this is

Cedar Grove's design system: design tokens (W3C DTCG) → Style Dictionary → a Tailwind v4
`@theme` layer, ~49 accessible React components (Radix + shadcn conventions), and the written
brand & content style guide — including the firm's **adopted Email Style Guide** (see
`docs/brand/client-communication.mdx`). The brand is grounded in the firm's real mark: a muted
olive (`cedar`) on warm ivory.

## Visualizing proposals for stakeholder review — the firm's preferred workflow

**Cedar Grove's partners are non-technical but design-savvy, and they prefer to _see_ proposals
rendered, not read about them.** So whenever anyone needs to review, compare, or decide between
options in this system — the color **strategy**, the display **typeface**, or any other
"options menu, not yet decided" item in the Foundations/Brand docs — **default to producing a
visual decision guide.** Generating rich visual artifacts costs more tokens than prose; that
cost is expected and worth it here — it is the client's stated preference. Do not skip the
visual and summarize in text instead.

**What to build** — a single, self-contained HTML **decision guide** (the color + typeface
guide already produced is the model). For each open choice it must:

- Render every option at **real fidelity** — real token hex swatches, the **actual candidate
  fonts embedded as base64 `data:` URIs** (from `node_modules/@fontsource*`), and live
  button/component previews — in **both light and dark**.
- State the **recommendation**, the honest **alternatives and trade-offs**, and an explicit
  **"if you leave it to us → X"** default per decision.
- Read in ~10 minutes: plain language, phone-friendly, written for a partner, not an engineer.
- Be **fully self-contained**: inline all CSS and fonts, no external/CDN requests.

**Where the content comes from:** the Foundations (Colors, Typography) and Brand docs already
frame each decision as an "options menu, not a mandate" with a recommendation — visualize
straight from those. The two currently-open decisions are the **color strategy** (Heritage /
Ink-first / Evolved) and the **display typeface** (Fraunces / Almarai / Source Serif 4);
everything beneath them is already a committed default. Keep the guide set in the firm's own
recommended defaults so it doubles as a live preview.

**Delivery — important:** these pages carry Cedar Grove's real name and branding, so **hand
them over as self-contained files** for the user to review and forward. **Do not auto-publish
them to a public URL.** For clicking through the real components, point to the hosted Storybook
(the complete, living reference) instead — the guide is the decide-in-10-minutes surface, the
Storybook is the operating manual.

## Commands

| Task | Command |
| --- | --- |
| Install | `npm install` |
| Run the docs (Storybook) | `npm run storybook` |
| Rebuild tokens after editing `tokens/**` | `npm run tokens:build` |
| Typecheck / Lint | `npm run typecheck` / `npm run lint` |
| **Full gate — run before you're done** | `npm run check` |
| Build app / Storybook | `npm run build` / `npm run build-storybook` |

`check` runs tokens:build → typecheck → lint → build-storybook.

## The token pipeline — the one rule that bites

**Never hand-edit `src/styles/tokens/*.css`.** They are *generated* by Style Dictionary from
`tokens/**/*.json`, overwritten on every build, and eslint-ignored. To change a token: edit the
source JSON in `tokens/` (`core/` for raw values, `semantic/{light,dark}.json` for roles), run
`npm run tokens:build`, and — if you added a brand-new semantic role — map it in
`src/styles/globals.css` under `@theme`. Tokens are W3C DTCG: `{ "$value": "…", "$type": "…" }`.

## Theme model

Components reference **semantic roles only** (`bg-primary`, `text-muted-foreground`,
`border-border`) — never `palette.*`, `--color-cedar-*`, or raw hex. Roles are defined once per
theme in `tokens/semantic/light.json` / `dark.json` (identical names), so dark mode is a `.dark`
class swap and **components never branch on theme**.

## Authoring a component

Match `src/components/ui/`: wrap a **Radix primitive** where one exists with `data-slot`;
variants via **`cva`** exported alongside the component (`export { Button, buttonVariants }`);
merge classes with **`cn()`** (`@/lib/utils`); type props as `React.ComponentProps<'el'> &
VariantProps<…>`; **semantic tokens only** for color; disabled = `disabled:pointer-events-none
disabled:opacity-50`; portalled overlays use `z-[var(--z-*)]`; **co-locate a `*.stories.tsx`**;
named exports.

## Guardrails

- **Do NOT edit generated files** — `src/styles/tokens/**`, `dist/`, `storybook-static/`.
- **Do NOT add a `tailwind.config.js`** — this is Tailwind v4 CSS-first; the theme is in `globals.css`.
- **Don't decide the two open brand choices by default** (color strategy, display typeface) —
  they belong to the firm's partners; visualize them (above) and let them choose.
- Run **`npm run check`** before declaring work done; keep stories co-located with components.

## Map

`tokens/` — DTCG sources (edit) · `src/styles/tokens/` — generated CSS (do not edit) ·
`src/styles/globals.css` — `@theme` wiring · `src/components/ui/` — components + stories ·
`src/lib/utils.ts` — `cn()` · `docs/` — foundations / brand / system MDX (renders in Storybook) ·
`style-dictionary.config.mjs` — token build · `.storybook/` — Storybook config.
