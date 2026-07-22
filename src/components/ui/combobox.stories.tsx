import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Combobox, type ComboboxOption } from './combobox'
import { Label } from './label'

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A searchable Select: Popover + Command wired together so the option list can be filtered by typing rather than only scrolled. Reach for Combobox instead of Select once the list is long enough — attorneys, matters, clients — that finding an entry by scanning stops being practical. Selection is controlled: pass `value` and `onValueChange`.',
      },
    },
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const attorneyOptions: ComboboxOption[] = [
  { value: 'chen-sarah', label: 'Sarah Chen — Litigation' },
  { value: 'delacroix-marcus', label: 'Marcus Delacroix — Corporate' },
  { value: 'nakamura-yuki', label: 'Yuki Nakamura — Intellectual Property' },
  { value: 'obrien-fiona', label: "Fiona O'Brien — Employment" },
  { value: 'patel-rohan', label: 'Rohan Patel — Real Estate' },
  { value: 'washington-adaeze', label: 'Adaeze Washington — Governance Advisory' },
  { value: 'holloway-grant', label: 'Grant Holloway — Litigation' },
  { value: 'esperanza-mireille', label: 'Mireille Esperanza — Board Development' },
  { value: 'kowalski-ben', label: 'Ben Kowalski — Corporate' },
  { value: 'thibodeaux-claire', label: 'Claire Thibodeaux — Strategic Planning' },
  { value: 'reyes-daniel', label: 'Daniel Reyes — Real Estate' },
  { value: 'lindqvist-astrid', label: 'Astrid Lindqvist — Intellectual Property' },
  { value: 'okafor-chidi', label: 'Chidi Okafor — Employment' },
  { value: 'marchetti-vivian', label: 'Vivian Marchetti — Litigation' },
]

function AssignAttorneyExample() {
  const [attorney, setAttorney] = React.useState('')
  return (
    <Combobox
      options={attorneyOptions}
      value={attorney}
      onValueChange={setAttorney}
      placeholder="Select an attorney..."
      searchPlaceholder="Search attorneys..."
      emptyText="No attorney found."
      className="w-72"
      aria-label="Assign attorney"
    />
  )
}

function WithLabelExample() {
  const [attorney, setAttorney] = React.useState('nakamura-yuki')
  return (
    <div className="grid gap-1.5">
      <Label htmlFor="story-combobox-attorney">Assigned attorney</Label>
      <Combobox
        id="story-combobox-attorney"
        options={attorneyOptions}
        value={attorney}
        onValueChange={setAttorney}
        placeholder="Select an attorney..."
        searchPlaceholder="Search attorneys..."
        emptyText="No attorney found."
        className="w-72"
      />
    </div>
  )
}

export const Default: Story = {
  args: { options: attorneyOptions },
  render: () => <AssignAttorneyExample />,
}

export const WithLabel: Story = {
  name: 'With label',
  args: { options: attorneyOptions },
  render: () => <WithLabelExample />,
}
