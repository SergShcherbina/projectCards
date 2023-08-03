import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './avatar.tsx'
import userPhoto from './img/elipse.png'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: 'Path to picture ',
      options: ['', userPhoto],
      control: { type: 'radio' },
    },
    size: {
      description: 'Type number',
      defaultValue: 36,
      options: [36, 96],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const AvatarWithPhoto: Story = {
  args: {
    src: userPhoto,
  },
}
export const AvatarNoPhoto: Story = {
  args: {},
}
export const BigAvatar: Story = {
  args: {
    size: 96,
  },
}
