import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { Button } from './button'

// A deliberately small render + a11y smoke test on the pattern-setting primitive.
// Its job is to give a real signal beyond "it compiles": that the component still
// renders as the right accessible element, still applies its cva variants, still
// carries its data-slot, and has no obvious accessibility regressions. Copy this
// shape when a component's behavior is worth pinning down.
describe('Button', () => {
  it('renders its children as an accessible <button> with the default variant', () => {
    render(<Button>Save changes</Button>)
    const button = screen.getByRole('button', { name: 'Save changes' })
    expect(button.tagName).toBe('BUTTON')
    expect(button.getAttribute('data-slot')).toBe('button')
    expect(button.className).toContain('bg-primary')
  })

  it('applies the requested cva variant (outline)', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button', { name: 'Outline' }).className).toContain('border-input')
  })

  it('renders as a child element when asChild is set (Radix Slot)', () => {
    render(
      <Button asChild>
        <a href="/matters">Open matters</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Open matters' })
    expect(link.tagName).toBe('A')
    expect(link.className).toContain('bg-primary')
  })

  it('has no detectable accessibility violations (smoke test)', async () => {
    const { container } = render(
      <div>
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Delete matter</Button>
        <Button disabled>Disabled</Button>
      </div>,
    )
    // `region` is a page-level landmark rule, not a component concern — disable it so a
    // bare component tree doesn't report a false positive.
    //
    // Scope note: jsdom has no canvas, so axe cannot evaluate `color-contrast` here —
    // this catches structural/ARIA problems, not contrast. Contrast is verified against
    // the token values in docs/foundations/accessibility.mdx and in Storybook's a11y panel.
    const results = await axe(container, { rules: { region: { enabled: false } } })
    expect(results.violations.map((violation) => violation.id)).toEqual([])
  })
})
