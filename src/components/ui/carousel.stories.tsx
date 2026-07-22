import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './carousel'
import { Card, CardContent } from './card'

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A slide carousel built on `embla-carousel-react`, composed the shadcn way: `Carousel` owns the embla instance and shares it through context, while `CarouselContent`, `CarouselItem`, `CarouselPrevious`, and `CarouselNext` read from that context — arrow keys scroll when the region is focused, and the prev/next buttons disable at the ends. This is the one component in the library aimed at the firm\'s public marketing site rather than the internal dashboard: rotating client testimonials, practice-area highlights, or award callouts on a landing page. Avoid it for anything the user needs to compare or act on at once (matters, invoices, search results) — hiding data behind a swipe hurts more than it helps; use a list, table, or grid there instead.',
      },
    },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const testimonials = [
  {
    quote:
      'Cedar Grove untangled a governance dispute that had stalled our board for months. They were as much organizational advisors as they were lawyers.',
    name: 'Priya Anand',
    role: 'Board Chair, Brightwater Foundation',
  },
  {
    quote:
      'Their corporate team closed our Series B on a compressed timeline without a single surprise. The billing transparency alone won us over.',
    name: 'Tomas Reinhardt',
    role: 'CEO, Ridgeline Holdings',
  },
  {
    quote:
      'We came for litigation and stayed for the strategic planning. Cedar Grove thinks about the whole institution, not just the case in front of them.',
    name: 'Deborah Okonkwo',
    role: 'General Counsel, Vantage Logistics',
  },
  {
    quote:
      'The IP portfolio review was meticulous. They found value in filings we had written off years ago.',
    name: 'Yuki Sato',
    role: 'Founder, Nimbus Labs',
  },
]

export const Default: Story = {
  name: 'Client testimonials',
  render: () => (
    <div className="mx-auto max-w-md px-12">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name}>
              <Card>
                <CardContent className="flex flex-col gap-4">
                  <p className="font-serif text-lg leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}
