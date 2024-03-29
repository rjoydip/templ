import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Bold, Italic, Underline } from 'lucide-react'

import {
  ToggleGroup,
  ToggleGroupItem,
} from './toggle-group'

/**
 * A set of two-state buttons that can be toggled on or off.
 */
const meta = {
  title: 'components/Toggle Group',
  component: ToggleGroup,
  argTypes: {
    type: {
      options: ['multiple', 'single'],
      control: { type: 'radio' },
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    type: 'multiple',
    disabled: false,
  },
  parameters: {
    badges: ['beta', 'stable'],
    layout: 'centered',
  },
} satisfies Meta<typeof ToggleGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default form of the toggle group.
 */
export const Default: Story = {
  render: args => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Use the `outline` variant to emphasizing the individuality of each button
 * while keeping them visually cohesive.
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: args => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Use the `single` type to create exclusive selection within the button
 * group, allowing only one button to be active at a time.
 */
export const Single: Story = {
  args: {
    type: 'single',
  },
  render: args => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Use the `sm` size for a compact version of the button group, featuring
 * smaller buttons for spaces with limited real estate.
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: args => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Use the `lg` size for a more prominent version of the button group, featuring
 * larger buttons for emphasis.
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: args => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Add the `disabled` prop to a button to prevent interactions.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
