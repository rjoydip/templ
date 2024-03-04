import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './menubar'

/**
 * A visually persistent menu common in desktop applications that provides
 * quick access to a consistent set of commands.
 */
const meta = {
  title: 'components/Menubar',
  component: Menubar,
  argTypes: {},
  parameters: {
    badges: ['beta', 'stable'],
    layout: 'centered',
  },
} satisfies Meta<typeof Menubar>

type Story = StoryObj<typeof meta>

/**
 * The default form of the menubar.
 */
export const Default: Story = {
  render: args => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab
            {' '}
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
} satisfies Meta<typeof Menubar>

/**
 * A menubar with a submenu.
 */
export const WithSubmenu: Story = {
  render: args => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Actions</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Download</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

/**
 * A menubar with radio items.
 */
export const WithRadioItems: Story = {
  render: args => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel inset>Device Size</MenubarLabel>
          <MenubarRadioGroup value="md">
            <MenubarRadioItem value="sm">Small</MenubarRadioItem>
            <MenubarRadioItem value="md">Medium</MenubarRadioItem>
            <MenubarRadioItem value="lg">Large</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

/**
 * A menubar with checkbox items.
 */
export const WithCheckboxItems: Story = {
  render: args => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Filters</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Show All</MenubarItem>
          <MenubarGroup>
            <MenubarCheckboxItem checked>Unread</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Important</MenubarCheckboxItem>
            <MenubarCheckboxItem>Flagged</MenubarCheckboxItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export default meta
