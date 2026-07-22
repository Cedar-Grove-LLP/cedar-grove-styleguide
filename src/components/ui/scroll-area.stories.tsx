import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from './separator'
import { ScrollArea } from './scroll-area'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A cross-browser, token-styled replacement for a native scrollbar. Reach for it whenever a fixed-height or fixed-width region needs to scroll independently of the page — a matter list in a side panel, a long dropdown or dialog body — and the default OS scrollbar would look inconsistent across platforms or clash with the surrounding chrome. For content that should scroll with the page itself, just let it overflow naturally; ScrollArea is for contained regions.',
      },
    },
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const matters = [
  { name: 'Alvarez Family Trust — Estate Restructuring', area: 'Trusts & Estates' },
  { name: 'Bright Harbor Nonprofit — Board Governance Review', area: 'Governance advisory' },
  { name: 'Castellano v. Meridian Logistics', area: 'Litigation' },
  { name: 'Driftwood Housing Coalition — 501(c)(3) Formation', area: 'Corporate' },
  { name: 'Elmwood Youth Services — Strategic Planning Retreat', area: 'Strategic planning' },
  { name: 'Fenwick & Ashe Merger', area: 'Corporate' },
  { name: 'Gallo v. Gallo — Dissolution of Partnership', area: 'Litigation' },
  { name: 'Harborview Tenants Union — Fair Housing Complaint', area: 'Employment' },
  { name: 'Ibarra Construction — Commercial Lease Negotiation', area: 'Real Estate' },
  { name: 'Juniper Trailhead Land Trust — Conservation Easement', area: 'Real Estate' },
  { name: 'Kestrel Robotics — Provisional Patent Filing', area: 'Intellectual Property' },
  { name: 'Lundgren v. City of Port Alma', area: 'Litigation' },
  { name: 'Meridian Arts Collective — Board Development Series', area: 'Board development' },
  { name: 'Nomad Bicycle Co. — Trademark Opposition', area: 'Intellectual Property' },
  { name: 'Osprey Creek Watershed Alliance — Bylaws Revision', area: 'Governance advisory' },
  { name: 'Pinnacle Home Health — Wage & Hour Audit', area: 'Employment' },
  { name: 'Quimby Retail Group — Storefront Lease Dispute', area: 'Real Estate' },
  { name: 'Rivera Family Foundation — Succession Planning', area: 'Trusts & Estates' },
  { name: 'Sable Ridge Vineyards — Partnership Agreement', area: 'Corporate' },
  { name: 'Tolliver v. Northgate Manufacturing', area: 'Litigation' },
]

export const Default: Story = {
  name: 'Matter list',
  render: () => (
    <ScrollArea className="h-72 w-96 rounded-lg border border-border bg-card">
      <div className="p-4">
        <h4 className="mb-3 font-serif text-sm font-semibold text-foreground">
          Open matters ({matters.length})
        </h4>
        {matters.map((matter, index) => (
          <div key={matter.name}>
            <div className="py-2 text-sm">
              <p className="text-foreground">{matter.name}</p>
              <p className="text-xs text-muted-foreground">{matter.area}</p>
            </div>
            {index < matters.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
