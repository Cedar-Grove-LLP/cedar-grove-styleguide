import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from './badge'
import { DataTable, DataTableColumnHeader, type DataTableProps } from './data-table'

type InvoiceStatus = 'Paid' | 'Sent' | 'Pending' | 'Overdue' | 'Draft'

interface Invoice {
  invoice: string
  matter: string
  client: string
  status: InvoiceStatus
  hours: number
  amount: number
}

const statusVariant: Record<InvoiceStatus, ComponentProps<typeof Badge>['variant']> = {
  Paid: 'success',
  Sent: 'info',
  Pending: 'warning',
  Overdue: 'destructive',
  Draft: 'secondary',
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'invoice',
    header: 'Invoice',
    enableSorting: false,
    cell: ({ row }) => <span className="font-medium tabular-nums">{row.getValue('invoice')}</span>,
  },
  {
    accessorKey: 'matter',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Matter" />,
  },
  {
    accessorKey: 'client',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Client" />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.getValue<InvoiceStatus>('status')
      return <Badge variant={statusVariant[status]}>{status}</Badge>
    },
  },
  {
    accessorKey: 'hours',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hours" />,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{row.getValue<number>('hours').toFixed(1)}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {currency.format(row.getValue<number>('amount'))}
      </div>
    ),
  },
]

const invoices: Invoice[] = [
  { invoice: 'INV-2043', matter: 'Northwind Merger Review', client: 'Northwind Capital', status: 'Paid', hours: 42.5, amount: 21250 },
  { invoice: 'INV-2044', matter: 'Aster Biotech IP Portfolio', client: 'Aster Biotech', status: 'Sent', hours: 18.0, amount: 9000 },
  { invoice: 'INV-2045', matter: 'Cedarwood HOA Dispute', client: 'Cedarwood Residences', status: 'Overdue', hours: 27.75, amount: 13875 },
  { invoice: 'INV-2046', matter: 'Board Governance Refresh', client: 'Meridian Nonprofit Alliance', status: 'Pending', hours: 12.25, amount: 6125 },
  { invoice: 'INV-2047', matter: 'Voss Employment Arbitration', client: 'Voss Logistics', status: 'Paid', hours: 33.5, amount: 16750 },
  { invoice: 'INV-2048', matter: 'Harbor Point Lease Buildout', client: 'Harbor Point Developers', status: 'Draft', hours: 8.5, amount: 4250 },
  { invoice: 'INV-2049', matter: 'Solstice Series B Financing', client: 'Solstice Robotics', status: 'Sent', hours: 51.0, amount: 25500 },
  { invoice: 'INV-2050', matter: 'Trademark Opposition — HALCYON', client: 'Halcyon Studios', status: 'Overdue', hours: 15.5, amount: 7750 },
  { invoice: 'INV-2051', matter: 'Executive Team Restructure', client: 'Pinnacle Health Group', status: 'Pending', hours: 22.0, amount: 11000 },
  { invoice: 'INV-2052', matter: 'Riverside Zoning Appeal', client: 'Riverside Community Trust', status: 'Paid', hours: 19.25, amount: 9625 },
  { invoice: 'INV-2053', matter: 'Data Processing Agreement Audit', client: 'Lumen Analytics', status: 'Draft', hours: 6.0, amount: 3000 },
  { invoice: 'INV-2054', matter: 'Foundational Bylaws Rewrite', client: 'Greenfield Family Foundation', status: 'Sent', hours: 14.75, amount: 7375 },
]

const meta: Meta<DataTableProps<Invoice>> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A data grid that layers @tanstack/react-table’s headless sorting, global filtering, and pagination logic over the design system’s Table primitive, so it inherits the same styling automatically. This is the recommended pattern for any sortable / filterable / paginated grid in the utilization dashboard — matters, time entries, invoices. Describe each row with a `ColumnDef`, use `DataTableColumnHeader` in a column’s `header` to make it sortable, then pass `columns` and `data`. Reach for the raw Table primitive only for a purely static, presentational table.',
      },
    },
  },
} satisfies Meta<DataTableProps<Invoice>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { columns, data: invoices },
}

export const WithoutSearch: Story = {
  name: 'Without search',
  args: { columns, data: invoices, searchable: false },
}

export const WithoutPagination: Story = {
  name: 'Without pagination',
  args: { columns, data: invoices, paginated: false },
}

export const SmallPageSize: Story = {
  name: 'Small page size',
  args: { columns, data: invoices, pageSize: 5 },
}

export const Empty: Story = {
  args: { columns, data: [] },
}
