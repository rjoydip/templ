import type { Meta, StoryObj } from '@storybook/react'

import React from 'react'
import type {
  ToastActionElement,
  ToastProps,
} from './toast'
import {
  Toast,
  ToastAction,
} from './toast'
import { Toaster } from './toaster'
import { useToast } from './use-toast'

/**
 * A succinct message that is displayed temporarily.
 */
const meta = {
  title: 'ui/Toast',
  component: Toast,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  render: args => <ToastExample {...args} />,
} satisfies Meta<typeof Toast>

export default meta

type Story = Omit<StoryObj<typeof meta>, 'args'> & {
  args: Omit<ToasterToast, 'id'>
}

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
}

function ToastExample(args: Story['args']) {
  const { toast } = useToast()
  return (
    <div>
      <button
        onClick={() => {
          toast(args)
        }}
      >
        Show Toast
      </button>
      <Toaster />
    </div>
  )
}

/**
 * The default form of the toast.
 */
export const Base: Story = {
  args: {
    description: 'Your message has been sent.',
  },
}

/**
 * Use the `title` prop to provide a title for the toast.
 */
export const WithTitle: Story = {
  args: {
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
  },
}

/**
 * Use the `action` prop to provide an action for the toast.
 */
export const WithAction: Story = {
  args: {
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  },
}

/**
 * Use the `destructive` variant to indicate a destructive action.
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  },
}
