import type { Meta, StoryObj } from '@storybook/react'

import { SignUp, SignUpType } from './sign-up.tsx'

const meta = {
  title: 'Auth/Sign up',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isSubmitting: false,
    className: 'your-class-name',
    onSubmit: (data: SignUpType) => alert(JSON.stringify(data)),
  },
}
