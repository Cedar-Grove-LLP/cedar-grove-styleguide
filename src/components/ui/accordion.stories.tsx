import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "A vertically stacked set of headers that each reveal or hide an associated section of content. Reach for Accordion for a long list of independent sections that can stay collapsed by default — an FAQ, a matter's expandable engagement details — where showing everything at once would be overwhelming. Prefer Tabs when someone needs to switch between a small, fixed set of related views of the same record; prefer Collapsible directly (unstyled) when you only need a single show/hide section rather than a themed multi-item list.",
      },
    },
  },
  args: {
    // Radix's Accordion.Root discriminates its whole prop shape on `type` ("single" vs.
    // "multiple" changes whether `value`/`onValueChange` are a string or a string[]), so
    // it's the one required prop here — set a default so individual stories only need to
    // override it when they actually want `type="multiple"`.
    type: 'single',
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-xl">
      <AccordionItem value="intake">
        <AccordionTrigger>
          What information do you need from me to open a matter?
        </AccordionTrigger>
        <AccordionContent>
          We&apos;ll need the full legal name of every party involved, a short description of
          the matter, and a signed engagement letter before any billable work begins. Our
          intake team can usually turn this around within one business day.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="billing">
        <AccordionTrigger>How is billing calculated?</AccordionTrigger>
        <AccordionContent>
          Most matters bill hourly against the rate set in your engagement letter, in
          six-minute increments. Governance advisory and board development engagements are
          often flat-fee instead — ask your attorney which applies to your matter.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="documents">
        <AccordionTrigger>How do I share documents securely?</AccordionTrigger>
        <AccordionContent>
          Upload files directly through your client portal rather than email — it&apos;s
          encrypted in transit and at rest, and every document is automatically attached to
          the correct matter for your legal team to review.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  args: { type: 'multiple' },
  render: () => (
    <Accordion type="multiple" defaultValue={['governance', 'board']} className="w-full max-w-xl">
      <AccordionItem value="governance">
        <AccordionTrigger>Governance advisory</AccordionTrigger>
        <AccordionContent>
          We help boards clarify decision rights, update bylaws, and put conflict-of-interest
          and whistleblower policies in writing — the structural work that keeps a mission-
          driven organization accountable as it grows.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="board">
        <AccordionTrigger>Board development</AccordionTrigger>
        <AccordionContent>
          From recruiting new members to running an effective retreat, we work alongside
          executive directors and board chairs to build a board that actually functions as a
          governing body, not just a rubber stamp.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="planning">
        <AccordionTrigger>Strategic planning</AccordionTrigger>
        <AccordionContent>
          A facilitated planning process — stakeholder interviews, a working retreat, and a
          written plan with real milestones — for organizations ready to set direction for the
          next three to five years.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
