import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from './check-email.tsx'

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmail,
  tags: ['autodocs'],
  args: {
    email: 'example@mail.com',
  },
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
