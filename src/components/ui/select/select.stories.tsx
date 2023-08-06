import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {},
}
