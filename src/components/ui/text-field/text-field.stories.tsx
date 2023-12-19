import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field.tsx'

const meta = {
  title: 'Components/Text field',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    label: 'Text',
    type: 'text',
    placeholder: 'text',
    disabled: false,
    value: '',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'password',
    disabled: false,
    value: '',
  },
}

export const Error: Story = {
  args: {
    label: 'Error',
    type: 'error',
    placeholder: 'error',
    errorMessage: 'Error!',
    disabled: false,
    value: '',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Text',
    type: 'text',
    placeholder: 'text',
    disabled: true,
    value: '',
  },
}

export const Search: Story = {
  args: {
    label: 'Text',
    type: 'search',
    placeholder: 'text',
    disabled: false,
    value: '',
  },

  render: args => {
    const [value, setValue] = useState('')

    return <TextField {...args} value={value} onChangeValue={setValue} />
  },
}
