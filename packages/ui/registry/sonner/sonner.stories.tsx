import * as React from 'react'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { toast } from 'sonner'

import { Sonner } from './sonner'

/**
 * An opinionated toast component for React.
 */
const meta: Meta<typeof Sonner> = {
  title: 'components/Sonner',
  component: Sonner,
  argTypes: {},
  args: {
    position: 'bottom-right',
  },
  parameters: {
    badges: ['beta', 'stable'],
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sonner>

type Story = StoryObj<typeof meta>

/**
 * The default form of the toaster.
 */
export const Default: Story = {
  render: args => (
    <div className="flex min-h-96 items-center justify-center space-x-2">
      <button
        onClick={() =>
          toast('Event has been created', {
            description: new Date().toLocaleString(),
            action: {
              label: 'Undo',
              onClick: action('Undo clicked'),
            },
          })}
      >
        Show Toast
      </button>
      <Sonner {...args} />
    </div>
  ),
}

export default meta
