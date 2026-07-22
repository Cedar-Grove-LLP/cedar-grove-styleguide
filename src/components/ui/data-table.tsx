import * as React from 'react'
import {
  type Column,
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableColumnHeaderProps<TData, TValue> extends React.ComponentProps<'div'> {
  column: Column<TData, TValue>
  title: string
}

/**
 * Drop this into a column's `header` to make it sortable: it renders `title` as a
 * ghost Button that toggles the column between ascending and descending on click and
 * shows the current direction with an arrow. Columns whose `enableSorting` is false
 * render the plain title instead, so the same helper is safe to use everywhere.
 */
function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div data-slot="data-table-column-header" className={className} {...props}>
        {title}
      </div>
    )
  }

  const sorted = column.getIsSorted()

  return (
    <div
      data-slot="data-table-column-header"
      className={cn('flex items-center', className)}
      {...props}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(sorted === 'asc')}
        className="-ml-3 h-8 text-muted-foreground hover:text-foreground data-[state=open]:bg-accent"
      >
        <span>{title}</span>
        {sorted === 'desc' ? <ArrowDown /> : sorted === 'asc' ? <ArrowUp /> : <ChevronsUpDown />}
      </Button>
    </div>
  )
}

interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Show the global search Input above the table. Defaults to true. */
  searchable?: boolean
  /** Placeholder (and accessible label) for the search Input. */
  searchPlaceholder?: string
  /** Slice rows into pages with Prev/Next controls. Defaults to true. */
  paginated?: boolean
  /** Rows per page when `paginated`. Defaults to 10. */
  pageSize?: number
  className?: string
}

/**
 * A headless-logic-plus-styled-primitive data grid: it layers @tanstack/react-table's
 * sorting, global filtering, and pagination models over the design system's Table
 * primitive, so every attorney-utilization / billing grid (matters, time entries,
 * invoices) inherits the same styling and behavior. Describe rows with `ColumnDef`s
 * — use {@link DataTableColumnHeader} in a column's `header` to make it sortable —
 * and pass them plus `data`. Reach for the raw Table primitive only for a purely
 * static, presentational table with no sorting/filtering/pagination.
 */
function DataTable<TData, TValue = unknown>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = 'Search...',
  paginated = true,
  pageSize = 10,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  // TanStack Table intentionally returns fresh function instances each render; the
  // React Compiler cannot memoize them, which is expected and safe here (the table
  // instance is consumed inline, not passed into other memoized components).
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    initialState: { pagination: { pageSize } },
  })

  const rows = table.getRowModel().rows

  return (
    <div data-slot="data-table" className={cn('space-y-4', className)}>
      {searchable ? (
        <div data-slot="data-table-toolbar" className="flex items-center">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="pl-9"
            />
          </div>
        </div>
      ) : null}

      <div data-slot="data-table-content" className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {paginated ? (
        <div
          data-slot="data-table-pagination"
          className="flex items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { DataTable, DataTableColumnHeader }
export type { DataTableProps, DataTableColumnHeaderProps }
