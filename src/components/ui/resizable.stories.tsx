import type { Meta, StoryObj } from '@storybook/react-vite'

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable'

const meta = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A split-pane layout built on `react-resizable-panels` (v4): a `ResizablePanelGroup` lays out `ResizablePanel`s along one axis, and a `ResizableHandle` between them lets the user drag the boundary (or resize by keyboard when focused). Set the axis with the native `orientation="horizontal" | "vertical"` prop — v4 renamed the old `direction` prop. Reach for a resizable split only in dense desktop tools where the user genuinely benefits from re-weighting two persistent regions — a list beside a detail pane, an editor above a preview. For narrow or mobile layouts, or when one region is clearly primary, plain stacking or a fixed two-column grid is simpler and more predictable; a draggable handle is friction the user has to discover and manage.',
      },
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

const matters = [
  { name: 'Ridgeline Holdings — Series B financing', practice: 'Corporate', lead: 'M. Delacroix' },
  { name: 'Okonkwo v. Vantage Logistics', practice: 'Litigation', lead: 'S. Chen' },
  { name: 'Brightwater Foundation — board restructuring', practice: 'Governance advisory', lead: 'A. Washington' },
  { name: 'Calder Estate — lease dispute', practice: 'Real Estate', lead: 'D. Reyes' },
  { name: 'Nimbus Labs — patent portfolio review', practice: 'IP', lead: 'Y. Nakamura' },
]

export const Horizontal: Story = {
  name: 'Horizontal — matters list + detail',
  render: () => (
    <div className="h-80 w-full overflow-hidden rounded-lg border border-border">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="34%" minSize="20%">
          <div className="flex h-full flex-col">
            <div className="border-b border-border px-4 py-3 text-sm font-medium text-foreground">
              Active matters
            </div>
            <ul className="flex-1 overflow-auto">
              {matters.map((matter) => (
                <li
                  key={matter.name}
                  className="border-b border-border px-4 py-3 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  <p className="font-medium text-foreground">{matter.name}</p>
                  <p className="text-muted-foreground">{matter.practice}</p>
                </li>
              ))}
            </ul>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="66%" minSize="30%">
          <div className="flex h-full flex-col gap-4 p-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Corporate</p>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Ridgeline Holdings — Series B financing
              </h3>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Lead attorney</dt>
                <dd className="text-foreground">Marcus Delacroix</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Opened</dt>
                <dd className="text-foreground">March 4, 2026</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Billed to date</dt>
                <dd className="font-mono tabular-nums text-foreground">$248,900</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="text-foreground">In diligence</dd>
              </div>
            </dl>
            <p className="text-sm text-muted-foreground">
              Drag the divider to give the detail pane more room, or collapse it toward the list
              when scanning the full matter roster.
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const Vertical: Story = {
  name: 'Vertical — summary above activity',
  render: () => (
    <div className="h-96 w-full max-w-lg overflow-hidden rounded-lg border border-border">
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize="40%" minSize="20%">
          <div className="flex h-full flex-col justify-center gap-1 px-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">This week</p>
            <p className="font-serif text-2xl font-semibold text-foreground">
              38.5 billable hours
            </p>
            <p className="text-sm text-muted-foreground">Across 6 matters, 2 practice areas.</p>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="60%" minSize="25%">
          <div className="flex h-full flex-col">
            <div className="border-b border-border px-6 py-3 text-sm font-medium text-foreground">
              Recent activity
            </div>
            <ul className="flex-1 overflow-auto text-sm">
              <li className="border-b border-border px-6 py-3">
                <span className="text-foreground">Invoice #4821 sent</span>{' '}
                <span className="text-muted-foreground">— Ridgeline Holdings</span>
              </li>
              <li className="border-b border-border px-6 py-3">
                <span className="text-foreground">Time entry logged</span>{' '}
                <span className="text-muted-foreground">— Okonkwo v. Vantage Logistics</span>
              </li>
              <li className="border-b border-border px-6 py-3">
                <span className="text-foreground">Matter opened</span>{' '}
                <span className="text-muted-foreground">— Nimbus Labs patent review</span>
              </li>
            </ul>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}
