import type { Meta, StoryObj } from '@storybook/react'

import { SignIn, SignInType } from './sign-in.tsx'

const meta = {
  title: 'Auth/Sign in',
  component: SignIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isSubmitting: false,
    onSubmit: (data: SignInType) => alert(JSON.stringify(data)),
  },
}
