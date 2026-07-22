import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from './label'
import { RadioGroup, RadioGroupItem } from './radio-group'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A Radix-backed exclusive-choice control: exactly one option is selected at a time. Reach for RadioGroup when every option should stay visible at once and the set is short (two to four items) — for a longer or off-screen list of options prefer Select, and for a single independent on/off setting prefer Switch or Checkbox instead.',
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="open" aria-label="Matter status">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="open" id="story-status-open" />
        <Label htmlFor="story-status-open">Open</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pending" id="story-status-pending" />
        <Label htmlFor="story-status-pending">Pending</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="closed" id="story-status-closed" />
        <Label htmlFor="story-status-closed">Closed</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="open" disabled aria-label="Matter status">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="open" id="story-status-open-disabled" />
        <Label htmlFor="story-status-open-disabled">Open</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pending" id="story-status-pending-disabled" />
        <Label htmlFor="story-status-pending-disabled">Pending</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="closed" id="story-status-closed-disabled" />
        <Label htmlFor="story-status-closed-disabled">Closed</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithLabels: Story = {
  name: 'With labels',
  render: () => (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium text-foreground">Engagement type</legend>
      <RadioGroup defaultValue="legal-counsel">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="legal-counsel" id="story-engagement-legal" />
          <Label htmlFor="story-engagement-legal">Legal counsel</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="governance-advisory" id="story-engagement-governance" />
          <Label htmlFor="story-engagement-governance">Governance advisory</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="board-development" id="story-engagement-board" />
          <Label htmlFor="story-engagement-board">Board development</Label>
        </div>
      </RadioGroup>
    </fieldset>
  ),
}
