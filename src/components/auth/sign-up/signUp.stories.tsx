import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './signUp.tsx'

const meta = {
  title: 'Auth/Sign up',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
