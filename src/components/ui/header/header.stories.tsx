import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { UserType } from '../../../services/auth'

import { Header } from './'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderSignIn: Story = {
  args: {},
  render: args => {
    return (
      <BrowserRouter>
        <Header {...args} />
      </BrowserRouter>
    )
  },
}

export const HeaderWithUser: Story = {
  args: {
    userData: {
      avatar: 'https://i.pravatar.cc/300',
      id: '123',
      isEmailVerified: false,
      created: '',
      updated: '',
      name: 'User',
      email: 'email@.com',
    } as UserType,
    onLogout: () => {
      alert('Logout')
    },
  },
  render: args => {
    return (
      <BrowserRouter>
        <Header {...args} />
      </BrowserRouter>
    )
  },
}
