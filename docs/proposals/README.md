# Proposals

Rendered, self-contained artifacts for **stakeholder (partner) review** — the visual side of the
"Visualizing proposals for stakeholder review" workflow in [`CLAUDE.md`](../../CLAUDE.md).

## `design-decisions.html`

The current visual decision guide for the firm's two open brand decisions — the **color
strategy** and the **display typeface**. Open it in any browser, or forward it as a file; it is
fully self-contained (the candidate fonts are embedded, no network requests), works on a phone,
and adapts to light/dark.

It reflects the defaults confirmed by the firm's **Email Style Guide**: the **olive brand color**
and the **Inter / sans-serif body type** are shown as settled, the **voice** as adopted (Smart
Brevity), and only the color *strategy* and the *display* face are presented as open — each with
a recommendation, the honest alternatives, and an explicit "if you leave it to us → X" default.

## Using this as the reference model

This file is the **model** the `CLAUDE.md` visualization workflow points to. When the options
change (or a partner decides one), regenerate the guide rather than hand-editing it: start a
session on this repo and follow the workflow — real token swatches, the actual candidate fonts
embedded as `data:` URIs, live previews, light + dark, recommendation + alternatives + default.

**Delivery reminder:** these pages carry the firm's name and branding — hand them over as files
for review and forwarding; don't auto-publish them to a public URL. Point to the hosted Storybook
for clicking through the real components.
