import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field.tsx'

const meta = {
  title: 'Components/text-field',
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
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'password',
    disabled: false,
  },
}

export const Error: Story = {
  args: {
    label: 'Error',
    type: 'error',
    placeholder: 'error',
    errorMessage: 'Error!',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Text',
    type: 'text',
    placeholder: 'text',
    disabled: true,
  },
}

export const Search: Story = {
  args: {
    label: 'Text',
    type: 'search',
    placeholder: 'text',
    disabled: false,
  },
}
