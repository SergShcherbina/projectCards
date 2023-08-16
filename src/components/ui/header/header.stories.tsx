import type { Meta, StoryObj } from '@storybook/react'

import userImg from './img/headerEllipse.png'
import imageLogo from './img/logo.png'

import { Header } from './'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    logo: {
      options: [imageLogo, 'https://imgcorp.com/dominate/home/img/img-logo-white.png'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderSignIn: Story = {
  args: {
    isAuth: false,
    logo: imageLogo,
    userName: 'user',
  },
}

export const HeaderWithUser: Story = {
  args: {
    isAuth: true,
    userName: 'Ivan',
    userImage: userImg,
  },
}
