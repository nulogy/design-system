import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Nav from '../Nav'
import { menuItems } from './fixtures'

const meta = {
  title: 'Components/Navigation',
  component: Nav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    menuItems: menuItems,
  },
  args: { menuItems: menuItems },
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Nav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    menuItems: menuItems,
  },
}
