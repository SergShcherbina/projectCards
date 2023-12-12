import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from './edit-profile.tsx'

const meta: Meta<typeof EditProfile> = {
  title: 'Components/Edit Profile',
  component: EditProfile,
  tags: ['autodocs'],
  argTypes: {
    logoutHandler: {
      action: 'clicked',
    },
    replaceName: {
      action: 'clicked',
    },
    replaceAvatar: {
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
    email: 'ivan№1@gmail.com',
    src: 'https://otkritkis.com/wp-content/uploads/2021/12/8bb216d8c6df77d3feca6a6bc6ac4ec5.jpeg',
  },

  render: args => {
    const [name, setName] = useState('username')
    const [ava, setAva] = useState(
      'https://otkritkis.com/wp-content/uploads/2021/12/8bb216d8c6df77d3feca6a6bc6ac4ec5.jpeg'
    )

    const logOut = () => {
      alert('Your logout')
    }

    const replaceAvatar = (image: string | Blob) => {
      if (typeof image !== 'string') {
        setAva(URL.createObjectURL(image))
      }
    }

    const replaceName = (name: string) => {
      setName(name)
    }

    return (
      <EditProfile
        {...args}
        name={name}
        src={ava}
        logoutHandler={logOut}
        replaceAvatar={replaceAvatar}
        replaceName={replaceName}
      />
    )
  },
}
