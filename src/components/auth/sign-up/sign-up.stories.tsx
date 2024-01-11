import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

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
  render: args => {
    return (
      <BrowserRouter>
        <SignUp {...args} />
      </BrowserRouter>
    )
  },
}
