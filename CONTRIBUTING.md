# Contributing

This is the practical, step-by-step guide to working in this repo. For who owns what and what
review a change needs before it ships, see [`GOVERNANCE.md`](./GOVERNANCE.md) — that page
covers the organizational model; this one covers what to actually type into a terminal.

One framing note before you start: almost nothing in this system is locked in yet. Several
foundational choices — the primary color, the type pairing — are documented as a firm
recommendation with named alternatives, not a final ruling (see
`docs/foundations/colors.mdx` in Storybook for an example: "Recommendation A" stated plainly,
"Recommendation B" named as a real alternative, neither treated as sacred). If your
contribution touches one of those open decisions, follow the same pattern in your PR
description — state what you're proposing and why, and name the alternative you considered —
rather than treating either the old or new value as obviously correct.

## 1. Local setup

```bash
npm install
npm run storybook
```

Storybook runs at `http://localhost:6006`. It's the living documentation for this
system — every component's props, states, and usage guidance, plus every Foundations and
Brand & Content page, all in one browsable place. When in doubt about whether something is
"done" or how it's supposed to look, Storybook is the source of truth, not a screenshot in a
chat thread.

There's also a minimal Vite preview app for a fast, Storybook-independent sanity check:

```bash
npm run dev
```

This opens a single page (`src/App.tsx`) rendering a handful of components against the live
token pipeline. It answers one question quickly — "did the token build and the component
actually wire up end-to-end?" — before you go hunting for a bug in Storybook configuration
instead of your actual change. It isn't a second design surface and it isn't where component
states get documented; that's Storybook's job.

## 2. Adding or changing a design token

Tokens are the only place a raw value should ever live. **Never hand-edit
`src/styles/tokens/*.css`** — those three files (`tokens-core.css`, `tokens-light.css`,
`tokens-dark.css`) are generated output, rewritten wholesale on every build, and any manual
edit will silently disappear the next time someone runs the build.

1. Edit the source of truth instead:
   - `tokens/core/*.json` for raw, context-free values — a specific hex, a spacing step, a
     radius, a shadow. These files use the W3C Design Tokens Community Group (DTCG) format:
     every token is an object with a `$value` and a `$type`, e.g.
     `{ "$value": "#5c5d4b", "$type": "color" }`.
   - `tokens/semantic/light.json` and `tokens/semantic/dark.json` for role tokens — what a
     token *means* (`primary`, `muted-foreground`, `border`) rather than what it literally is.
     A semantic token should alias a core token via `{group.token}` reference syntax rather
     than repeating a literal value:

     ```json
     "primary": { "$value": "{palette.cedar.700}", "$type": "color" }
     ```

     This is what makes a theme swap a one-line change: `primary` can point at a different
     palette step, or the dark file can point the same semantic name at a different value,
     without touching a single component.
2. Regenerate the CSS:

   ```bash
   npm run tokens:build
   ```

   (`npm run tokens:watch` reruns this on every save while you iterate.) This executes
   `style-dictionary.config.mjs`, which reads everything under `tokens/**` and writes the
   three generated files under `src/styles/tokens/`.
3. Confirm the change shows up where you expect, in Storybook (restart it if it was already
   running — token CSS isn't hot-reloaded the way component code is) or in the `npm run dev`
   preview.

**A naming detail worth understanding, not just copying:** raw palette tokens are exposed as
CSS custom properties named `--palette-*` (e.g. `--palette-cedar-500`), while
`src/styles/globals.css` maps them into Tailwind's theme namespace under a *different* name,
`--color-*` (e.g. `--color-cedar-500: var(--palette-cedar-500);`). That's deliberate. Tailwind
v4's `@theme inline` block wires a custom property to a `var()` reference so the reference
stays live at runtime — which is exactly what lets a `.dark` class swap every semantic color
without rebuilding any utility class. But a CSS custom property can't reference itself
(`--color-cedar-500: var(--color-cedar-500);` is invalid per the CSS custom properties spec —
it just fails to resolve). Giving the raw value a distinct name sidesteps that problem
entirely rather than working around it. Keep the two-name pattern for any new palette ramp or
semantic role: a source name in the generated token CSS, and a separate `--color-*` name in
`globals.css`'s `@theme inline` block that points at it.

## 3. Adding a new component

Before writing anything, read `src/components/ui/button.tsx` and `src/components/ui/card.tsx`
in full. Nearly every convention this system expects is visible in those two files, and
matching them is most of the review — a component that reinvents its own patterns instead of
following theirs will bounce back for rework even if it works correctly.

1. **Match the file shape.** A single primary component export (plus sub-components for a
   compound pattern, the way `card.tsx` exports `Card`, `CardHeader`, `CardTitle`, and so on),
   a `data-slot="…"` attribute on the root element for stable styling/testing hooks, and
   variants expressed with `class-variance-authority` (`cva`) whenever the component has more
   than one visual variant or size — see `buttonVariants` in `button.tsx`.
2. **Use `cn()` for every className, no exceptions.** Import it from `src/lib/utils.ts`. It
   merges conditional classes via `clsx` and resolves conflicting Tailwind utilities via
   `tailwind-merge`, which is what lets a consumer override a default
   (`<Button className="px-8" />`) without fighting specificity. Never hand-concatenate class
   strings.
3. **Semantic tokens only.** Reach for `bg-primary`, `text-muted-foreground`, `border-border` —
   never a raw palette class (`bg-cedar-700`) and never an arbitrary hex or pixel value in the
   className. This keeps every future retheme a token-only change instead of a
   grep-and-replace across every component.
4. **Accessibility comes from the primitive, not from you re-deriving it.** Where Radix has a
   primitive for what you're building (dialog, select, tabs, switch, tooltip, etc.), build on
   top of it rather than assembling raw `div`s with ARIA attributes by hand — Radix has already
   solved focus management, keyboard navigation, and screen-reader labeling for that pattern.
   Reserve plain HTML elements for genuinely simple, non-interactive cases (a card, a badge).
5. **Ship a stories file next to the component**, named `component-name.stories.tsx`, with
   `tags: ['autodocs']` in the meta export so Storybook generates its docs page automatically.
   Cover every meaningful state: each variant, each size, disabled, and any error/invalid state
   the component supports. `button.stories.tsx` shows the shape to follow — a `meta` object
   with `argTypes` and default `args`, one named story per state, plus "All variants"/
   "All sizes" overview stories for a fast visual diff.
6. **Meet the "what done looks like for a component" checklist** in Storybook's Introduction
   page: semantic tokens only, keyboard-operable and screen-reader-labeled, a story for every
   meaningful state, WCAG 2.1 AA contrast at minimum.

**Next.js App Router consumers, note this explicitly:** most interactive primitives here
depend on React hooks and context via Radix (`useState`, `useContext`, event handlers). Cedar
Grove's own production app, `cedar-grove-analytics`, runs on Next.js 16 App Router — and in App
Router, any component using hooks must be a Client Component. If you import one of these
components directly into a Server Component tree, add `'use client'` as the first line of the
file doing the importing (or a thin wrapper around the primitive, if you want the boundary
drawn further out). Skipping this isn't a silent failure — it's a build error — but it's worth
flagging up front so nobody loses time chasing it.

## 4. Adding or changing brand/content guidance

Content is not a second-class citizen here — a change to `docs/brand/*.mdx` goes through
exactly the same pull request process as a code change. In the PR description, say plainly
what you're replacing and why: which existing guidance or example this supersedes, and the
reasoning (a real ambiguity a writer hit, a UI pattern the current guidance doesn't cover, a
correction). "Because I preferred it" isn't something a reviewer can evaluate; "the current
empty-state copy doesn't cover a zero-results-from-a-filter case, here's the gap and a proposed
line" is.

## 5. Before opening a PR

Run all four of these locally — a red CI run costs more of everyone's time than catching it
yourself would have:

```bash
npm run lint
npm run typecheck
npm run build
npm run build-storybook
```

Beyond a clean run, confirm:

- Every new or changed component has stories covering its meaningful states (see step 3.5
  above) — a component missing a disabled-state story is incomplete even if the prop works.
- Any new copy follows `docs/brand/writing-principles.mdx` (plain language, active voice,
  sentence case for UI text, and the rest of that page's guidance).

## 6. Review expectations

Cedar Grove uses a tiered review model depending on what changed — see
[`GOVERNANCE.md`](./GOVERNANCE.md) (or the Governance page in Storybook) for the full
breakdown of who reviews tokens versus components versus content, and why. This file won't
duplicate it — go there for specifics.
