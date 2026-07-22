import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "A plain styled semantic table — `<table>`/`<thead>`/`<tbody>`/`<tfoot>` wrapped in an overflow-x-auto container so wide tables scroll on small screens instead of breaking layout. This primitive intentionally has no sorting, filtering, or pagination logic of its own; it is the visual/semantic layer only. Recommended default, not yet wired up: once a table needs real sorting, filtering, or pagination behavior, pair this component with TanStack Table for the headless logic and keep this component's pieces (Table, TableHeader, TableRow, TableHead, TableCell, ...) as the rendering layer — that dependency isn't installed here, this doc is naming it as the path to reach for later rather than committing to it now.",
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Unbilled time for Cedar Grove LLP — June 2026.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Matter</TableHead>
          <TableHead>Client</TableHead>
          <TableHead className="text-right">Hours</TableHead>
          <TableHead className="text-right">Rate</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Nonprofit bylaws restatement</TableCell>
          <TableCell>Willow Creek Land Trust</TableCell>
          <TableCell className="text-right">4.5</TableCell>
          <TableCell className="text-right">$325.00</TableCell>
          <TableCell className="text-right">$1,462.50</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Board governance advisory</TableCell>
          <TableCell>Cascade Youth Alliance</TableCell>
          <TableCell className="text-right">6.0</TableCell>
          <TableCell className="text-right">$275.00</TableCell>
          <TableCell className="text-right">$1,650.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Commercial lease negotiation</TableCell>
          <TableCell>Fernwood Family Dental</TableCell>
          <TableCell className="text-right">3.25</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
          <TableCell className="text-right">$1,137.50</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Employment policy review</TableCell>
          <TableCell>Maple &amp; Vine Café Group</TableCell>
          <TableCell className="text-right">2.0</TableCell>
          <TableCell className="text-right">$325.00</TableCell>
          <TableCell className="text-right">$650.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Trademark registration — wordmark</TableCell>
          <TableCell>Harborlight Design Studio</TableCell>
          <TableCell className="text-right">5.5</TableCell>
          <TableCell className="text-right">$310.00</TableCell>
          <TableCell className="text-right">$1,705.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$6,605.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}
