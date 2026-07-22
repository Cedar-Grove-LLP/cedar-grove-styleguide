import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './chart'

const meta = {
  title: 'Components/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A theming wrapper around Recharts, not a charting library of its own — you still import and compose Recharts\' `BarChart`/`LineChart`/`Bar`/`Line`/etc. directly. `ChartContainer` takes a `config` object mapping each data-series key to a `label` and an optional `color` (or `theme: { light, dark }`), then exposes those as scoped `--color-{key}` CSS custom properties so a series can pull its color from this system\'s tokens (`fill="var(--color-billable)"`) instead of Recharts\' own default palette. `ChartTooltipContent` and `ChartLegendContent` read that same config to render a tooltip/legend styled like this system\'s popover and card surfaces. Reach for this any time you\'re charting real firm data — attorney utilization, billing, matter volume, the kind of dashboards Cedar Grove\'s own analytics app builds — rather than a one-off illustrative graphic. A series left without an explicit color in `config` falls back to a recommended six-color sequence built from existing tokens (cedar, clay, and four status colors) — see the code comment on `CHART_DEFAULT_COLORS` in chart.tsx: that sequence has not been verified for colorblind-safe distinguishability and should be treated as a starting point, not an audited palette.',
      },
    },
  },
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

const utilizationData = [
  { month: 'Jan', billable: 612, nonBillable: 158 },
  { month: 'Feb', billable: 578, nonBillable: 142 },
  { month: 'Mar', billable: 645, nonBillable: 171 },
  { month: 'Apr', billable: 601, nonBillable: 149 },
  { month: 'May', billable: 634, nonBillable: 163 },
  { month: 'Jun', billable: 589, nonBillable: 155 },
]

// No `color` set on either series here on purpose — this story is also the demonstration
// of ChartContainer's default color fallback (see CHART_DEFAULT_COLORS in chart.tsx).
// `label` alone is enough to exercise the config API.
const utilizationConfig = {
  billable: { label: 'Billable hours' },
  nonBillable: { label: 'Non-billable hours' },
} satisfies ChartConfig

export const Default: Story = {
  name: 'Bar chart — attorney utilization by month',
  args: { config: utilizationConfig, children: <div /> },
  render: () => (
    <ChartContainer config={utilizationConfig} className="h-80 w-full">
      <BarChart data={utilizationData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="billable" fill="var(--color-billable)" radius={4} />
        <Bar dataKey="nonBillable" fill="var(--color-nonBillable)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

const billingTrendData = [
  { month: 'Jan', invoiced: 128400, collected: 96200 },
  { month: 'Feb', invoiced: 141850, collected: 118300 },
  { month: 'Mar', invoiced: 152900, collected: 133750 },
  { month: 'Apr', invoiced: 139600, collected: 121400 },
  { month: 'May', invoiced: 158300, collected: 142950 },
  { month: 'Jun', invoiced: 146700, collected: 129800 },
]

// Explicit colors here, unlike the bar chart above — demonstrating that a config's own
// color always wins over the default fallback sequence.
const billingTrendConfig = {
  invoiced: { label: 'Invoiced', color: 'var(--color-cedar-700)' },
  collected: { label: 'Collected', color: 'var(--color-clay-700)' },
} satisfies ChartConfig

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export const LineChartTrend: Story = {
  name: 'Line chart — monthly billing trend',
  args: { config: billingTrendConfig, children: <div /> },
  render: () => (
    <ChartContainer config={billingTrendConfig} className="h-80 w-full">
      <LineChart data={billingTrendData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={64}
          tickFormatter={(value: number) => formatCurrency(value)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-muted-foreground">{name}</span>
                  <span className="font-mono font-medium tabular-nums text-foreground">
                    {formatCurrency(Number(value))}
                  </span>
                </div>
              )}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="invoiced"
          name="Invoiced"
          stroke="var(--color-invoiced)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="collected"
          name="Collected"
          stroke="var(--color-collected)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
}
