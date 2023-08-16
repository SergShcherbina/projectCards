import { useState } from 'react'

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

  render: args => {
    const [image, setImage] = useState(
      'https://otkritkis.com/wp-content/uploads/2021/12/8bb216d8c6df77d3feca6a6bc6ac4ec5.jpeg'
    )
    const [name, setName] = useState('Nickname')

    const onSetImage = (file: Blob | MediaSource) => {
      setImage(URL.createObjectURL(file))
    }

    return (
      <>
        <EditProfile
          {...args}
          src={image}
          name={name}
          logoutHandler={() => alert('logout')}
          replaceNickname={setName}
          replaceAvatar={onSetImage}
        />
      </>
    )
  },
}
