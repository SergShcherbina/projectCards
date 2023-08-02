import type { Meta, StoryObj } from '@storybook/react'

import { NewPassword } from './new-password.tsx'

const meta = {
  title: 'Auth/NewPassword',
  component: NewPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof NewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
