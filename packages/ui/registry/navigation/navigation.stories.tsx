import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation'

/**
 * A collection of links for navigating websites.
 */
const meta = {
  title: 'components/NavigationMenu',
  component: NavigationMenu,
  argTypes: {},
  parameters: {
    badges: ['beta', 'stable'],
    layout: 'centered',
  },
} satisfies Meta<typeof NavigationMenu>

type Story = StoryObj<typeof meta>

/**
 * The default form of the navigation menu.
 */
export const Default: Story = {
  render: args => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Overview
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-96 p-2">
                <li>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    API Reference
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Getting Started
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Guides
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="https:www.google.com"
            target="_blank"
          >
            External
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
} satisfies Meta<typeof NavigationMenu>

export default meta
