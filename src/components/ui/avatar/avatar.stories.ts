import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './avatar.tsx'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: 'Path to picture ',
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
    src: 'https://foni.club/uploads/posts/2023-03/1677685763_foni-club-p-art-fioletovii-paren-2.jpg',
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
