import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CommandSeparator } from 'cmdk'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command'

/**
 * Fast, composable, unstyled command menu for React.
 */
const meta = {
  title: 'components/Command',
  component: Command,
  argTypes: {},
  args: {
    className: 'rounded-lg w-96 border shadow-md',
  },
  parameters: {
    badges: ['beta', 'stable'],
    layout: 'centered',
  },
} satisfies Meta<typeof Command>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default form of the command.
 */
export const Default: Story = {
  render: args => (
    <Command {...args}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
