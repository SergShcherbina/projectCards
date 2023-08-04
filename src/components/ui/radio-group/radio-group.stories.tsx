import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './radio-group'

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    name: 'Title group',
    options: [
      { label: 'Radio1', value: 'Radio1' },
      { label: 'Radio2', value: 'Radio2' },
      { label: 'Radio3', value: 'Radio3' },
    ],
    defaultValue: 'Radio2',
  },
} as Meta<typeof RadioGroup>

type Story = StoryObj<typeof RadioGroup>

export const Default = {}

export const Disabled: Story = {
  name: 'Title group disable',
  args: {
    disabled: true,
  },
}
