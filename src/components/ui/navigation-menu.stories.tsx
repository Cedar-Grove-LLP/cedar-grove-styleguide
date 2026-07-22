import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu'

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "A horizontal primary navigation bar for a signed-in product surface, with optional dropdown panels on individual items — the top-level Dashboard/Matters/Clients/Billing nav for this firm's internal tools. This is distinct from Menubar's desktop-application-menu framing (always-visible commands grouped by menu name, reused across many actions) and from DropdownMenu's click-anywhere framing (a menu anchored to any trigger, anywhere on a page): NavigationMenu is specifically the primary, always-present wayfinding bar at the top of an app shell, and only one or two items on it typically carry a dropdown at all.",
      },
    },
  },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Primary product nav',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#dashboard">Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#matters">Matters</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Clients</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-72 gap-1 sm:w-96 sm:grid-cols-2">
              <NavigationMenuLink
                href="#client-fairmont"
                className="flex-col items-start justify-start gap-0.5"
              >
                <span className="font-medium">Fairmont Housing Trust</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Litigation, Real Estate
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink
                href="#client-nkemdirim"
                className="flex-col items-start justify-start gap-0.5"
              >
                <span className="font-medium">Nkemdirim Foundation</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Governance advisory
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink
                href="#client-calloway"
                className="flex-col items-start justify-start gap-0.5"
              >
                <span className="font-medium">Calloway Family Trust</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Estate administration
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink
                href="#clients-all"
                className="flex-col items-start justify-start gap-0.5 text-primary"
              >
                <span className="font-medium">View all clients</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Full client directory
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#billing">Billing</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#reports">Reports</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
