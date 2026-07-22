import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from './button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { Input } from './input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'
import { Textarea } from './textarea'

const clients = [
  { value: 'northwind-holdings', label: 'Northwind Holdings' },
  { value: 'meridian-health', label: 'Meridian Health Systems' },
  { value: 'lakeside-cooperative', label: 'Lakeside Grocers Cooperative' },
  { value: 'atlas-robotics', label: 'Atlas Robotics' },
  { value: 'harbor-point-foundation', label: 'Harbor Point Foundation' },
] as const

const practiceAreas = [
  { value: 'litigation', label: 'Litigation' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'employment', label: 'Employment' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'ip', label: 'Intellectual Property' },
  { value: 'governance', label: 'Governance Advisory' },
  { value: 'board-development', label: 'Board Development' },
] as const

const matterIntakeSchema = z.object({
  matterName: z
    .string()
    .min(3, 'Give the matter a name of at least 3 characters.')
    .max(80, 'Matter names are limited to 80 characters.'),
  client: z.string().min(1, 'Select the client this matter belongs to.'),
  practiceArea: z.string().min(1, 'Choose a practice area.'),
  notes: z
    .string()
    .max(400, 'Keep intake notes under 400 characters.')
    .optional(),
})

type MatterIntakeValues = z.infer<typeof matterIntakeSchema>

function MatterIntakeForm() {
  const [submitted, setSubmitted] = React.useState<MatterIntakeValues | null>(null)

  const form = useForm<MatterIntakeValues>({
    resolver: zodResolver(matterIntakeSchema),
    defaultValues: {
      matterName: '',
      client: '',
      practiceArea: '',
      notes: '',
    },
  })

  function onSubmit(values: MatterIntakeValues) {
    setSubmitted(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-md gap-6"
      >
        <FormField
          control={form.control}
          name="matterName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matter name</FormLabel>
              <FormControl>
                <Input placeholder="Northwind — Series B financing" {...field} />
              </FormControl>
              <FormDescription>
                A short, human-readable label the team will recognize on the docket.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Active clients</SelectLabel>
                    {clients.map((client) => (
                      <SelectItem key={client.value} value={client.value}>
                        {client.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="practiceArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Practice area</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a practice area" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {practiceAreas.map((area) => (
                    <SelectItem key={area.value} value={area.value}>
                      {area.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intake notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conflicts check status, key contacts, billing arrangement…"
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional. Visible to the assigned team only.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3">
          <Button type="submit">Create matter</Button>
          {submitted ? (
            <p className="text-sm text-success" role="status">
              Matter “{submitted.matterName}” opened.
            </p>
          ) : null}
        </div>
      </form>
    </Form>
  )
}

const meta = {
  title: 'Components/Form',
  component: MatterIntakeForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "The integration layer between react-hook-form and this system's field components (Input, Select, Textarea, Label). FormField wraps a react-hook-form Controller, and the surrounding FormItem / FormLabel / FormControl / FormDescription / FormMessage pieces wire up accessible error handling for you automatically — matching htmlFor/id, aria-describedby, and aria-invalid, and rendering the field's validation message from the resolver. Reach for it whenever a screen collects and validates structured input (matter intake, client onboarding, billing configuration); for a single uncontrolled field with no validation, a bare Label + Input is enough.",
      },
    },
  },
} satisfies Meta<typeof MatterIntakeForm>

export default meta
type Story = StoryObj<typeof meta>

export const MatterIntake: Story = {
  name: 'Matter intake',
  render: () => <MatterIntakeForm />,
}
