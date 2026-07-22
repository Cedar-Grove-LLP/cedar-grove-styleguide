import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { Label } from './label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './select'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "A modal overlay that interrupts the current screen to demand a decision or focused input before the user can go back to what they were doing. Reach for Dialog when an action is consequential enough to need explicit confirmation — closing a matter, deleting a record — and the description should state exactly what will happen, not just ask \"are you sure?\". For a small, non-blocking hint attached to a control, use Tooltip instead; for a short anchored list of choices, use Select rather than a full modal.",
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Close matter</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Close this matter?</DialogTitle>
          <DialogDescription>
            Estrada v. Fairmont Housing Trust will move to Closed status, stop accruing new time
            entries, and only firm admins will be able to reopen it.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-foreground">
          Time already logged but not yet invoiced stays on the matter for final billing — closing
          it does not delete any records.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Close matter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Verifies the z-index layering decision: an interactive floating overlay (Select — and by
// extension Dropdown/Context menus, Combobox, Popover) opened from INSIDE a modal must render
// ABOVE it, not behind. All of those share the `popover` tier (--z-popover), which sits above
// the modal tier (--z-modal). See docs/foundations/elevation-and-motion.mdx → Stacking order.
export const WithSelectInside: Story = {
  name: 'With a Select inside',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Reassign matter</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reassign this matter</DialogTitle>
          <DialogDescription>
            Choose the attorney who will take over as lead on Estrada v. Fairmont Housing Trust.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-1.5">
          <Label htmlFor="dialog-select-attorney">Lead attorney</Label>
          <Select>
            <SelectTrigger id="dialog-select-attorney" className="w-full">
              <SelectValue placeholder="Select an attorney" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chen">Sarah Chen — Litigation</SelectItem>
              <SelectItem value="delacroix">Marcus Delacroix — Corporate</SelectItem>
              <SelectItem value="okafor">Chidi Okafor — Employment</SelectItem>
              <SelectItem value="washington">Adaeze Washington — Governance Advisory</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Reassign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
