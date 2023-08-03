import { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from './edit-profile.tsx'

const meta: Meta<typeof EditProfile> = {
  title: 'Auth/Edit Profile',
  component: EditProfile,
  tags: ['autodocs'],
  argTypes: {
    logoutHandler: {
      action: 'clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Nickname',
    email: 'userEmail@gmail.com',
  },
}
export const WithPhoto: Story = {
  args: {
    name: 'Ivan',
    email: 'ivan№One@gmail.com',
    src: 'https://otkritkis.com/wp-content/uploads/2021/12/8bb216d8c6df77d3feca6a6bc6ac4ec5.jpeg',
  },
}
