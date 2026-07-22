import type { Meta, StoryObj } from '@storybook/react-vite'
import { Building2, FilePlus, Scale, UserPlus } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command'

const meta = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A cmdk-backed searchable list: type-ahead filtering, keyboard navigation, and grouped results over any set of items. Composed inside a Popover it becomes a Combobox (coming in a follow-up round); rendered on its own, unpopover-ed, it works as a persistent command palette or search block sitting directly in the page. This file wraps cmdk\'s own component tree — Command, CommandInput, CommandList, CommandGroup, CommandItem, and friends — 1:1, the same way this library\'s Radix wrappers stay close to their primitive\'s API, so it stays reusable as the shared base for both compositions rather than picking up Combobox-specific behavior here.',
      },
    },
  },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Command className="w-[420px] border border-border shadow-md" label="Search matters and clients">
      <CommandInput placeholder="Search matters and clients..." />
      <CommandList>
        <CommandEmpty>No matters or clients found.</CommandEmpty>
        <CommandGroup heading="Matters">
          <CommandItem value="alvarado-v-meridian-property-group">
            Alvarado v. Meridian Property Group
          </CommandItem>
          <CommandItem value="whitfield-sons-trademark-portfolio-review">
            Whitfield & Sons — trademark portfolio review
          </CommandItem>
          <CommandItem value="riverside-commons-ground-lease-renewal">
            Riverside Commons — ground lease renewal
          </CommandItem>
          <CommandItem value="open-harbor-fund-board-governance-review">
            Open Harbor Fund — board governance review
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Clients">
          <CommandItem value="cedar-vine-hospitality-group">Cedar & Vine Hospitality Group</CommandItem>
          <CommandItem value="open-harbor-fund">Open Harbor Fund</CommandItem>
          <CommandItem value="whitfield-sons-millwork">Whitfield & Sons Millwork</CommandItem>
          <CommandItem value="bright-path-charter-network">Bright Path Charter Network</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const Empty: Story = {
  name: 'Empty state',
  render: () => (
    <Command className="w-[420px] border border-border shadow-md" label="Search matters and clients">
      <CommandInput placeholder="Search matters and clients..." />
      <CommandList>
        <CommandEmpty>No matters or clients found.</CommandEmpty>
      </CommandList>
    </Command>
  ),
}

export const DisabledItem: Story = {
  name: 'Disabled item',
  render: () => (
    <Command className="w-[420px] border border-border shadow-md" label="Search matters and clients">
      <CommandInput placeholder="Search matters and clients..." />
      <CommandList>
        <CommandEmpty>No matters or clients found.</CommandEmpty>
        <CommandGroup heading="Matters">
          <CommandItem value="alvarado-v-meridian-property-group">
            Alvarado v. Meridian Property Group
          </CommandItem>
          <CommandItem value="whitfield-sons-trademark-portfolio-review" disabled>
            Whitfield & Sons — trademark portfolio review (closed)
          </CommandItem>
          <CommandItem value="riverside-commons-ground-lease-renewal">
            Riverside Commons — ground lease renewal
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const AsCommandPalette: Story = {
  name: 'As a persistent command palette',
  render: () => (
    <Command className="w-[420px] border border-border shadow-md" label="Command palette">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No matching commands.</CommandEmpty>
        <CommandGroup heading="Quick actions">
          <CommandItem value="new-matter">
            <FilePlus /> New matter
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="new-client">
            <UserPlus /> New client
            <CommandShortcut>⌘⇧C</CommandShortcut>
          </CommandItem>
          <CommandItem value="new-governance-engagement">
            <Building2 /> New governance advisory engagement
          </CommandItem>
          <CommandItem value="search-case-law">
            <Scale /> Search case law
            <CommandShortcut>⌘⇧L</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
