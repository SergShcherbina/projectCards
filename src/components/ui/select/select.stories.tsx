import { useState } from 'react'

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
  args: {
    options: [1, 2, 3],
    value: 1,
  },
  render: args => {
    const [value, setValue] = useState(1)

    return <Select {...args} value={value} onChangeValue={setValue} />
  },
}
