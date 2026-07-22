import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, buttonVariants } from './button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog'

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A focus-trapped, non-dismissible confirmation for destructive or otherwise consequential actions — voiding an invoice, deleting a matter, removing an attorney from an engagement. Unlike Dialog it cannot be dismissed by clicking the overlay or pressing a close affordance; the user must make an explicit choice via the Action or Cancel button, so reach for it only when proceeding accidentally would be costly. Use Dialog for general modal content (forms, detail panes, multi-step flows) where dismissing without a decision is harmless. Per Cedar Grove UI-copy guidance the description should state the concrete, irreversible consequence rather than a bare "Are you sure?".',
      },
    },
  },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Void invoice (destructive)',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Void invoice</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Void invoice INV-2048?</AlertDialogTitle>
          <AlertDialogDescription>
            Voiding removes the $18,400 in billed time on the Hollis Manufacturing acquisition
            from this billing period. The entries return to unbilled and the client&rsquo;s
            statement is reissued. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep invoice</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: 'destructive' })}>
            Void invoice
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const DeleteMatter: Story = {
  name: 'Delete matter (destructive)',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete matter</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete the Ardent Foods governance review?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently deletes the matter along with its 3 open tasks and 42 logged time
            entries. Attorneys assigned to it will lose access immediately and the work will not
            appear in utilization reporting. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: 'destructive' })}>
            Delete matter
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const NonDestructiveConfirm: Story = {
  name: 'Non-destructive confirm',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="primary">Submit for billing</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit June time for billing?</AlertDialogTitle>
          <AlertDialogDescription>
            This locks all 118 approved time entries for June and sends them to the billing
            team. You can still write off individual entries later, but the period can no longer
            be edited by attorneys.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Not yet</AlertDialogCancel>
          <AlertDialogAction>Submit for billing</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}
