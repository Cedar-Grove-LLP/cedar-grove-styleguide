import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
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
