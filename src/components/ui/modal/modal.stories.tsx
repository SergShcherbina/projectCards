import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { loremIpsum } from 'lorem-ipsum'

import { Button } from '../button'

import { Modal } from './modal.tsx'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    title: 'Title',
    open: true,
  },
} as Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: {
    title: 'Simple text',
    children: (
      <>
        <p>{loremIpsum({ count: 50, units: 'words' })}</p>
        <p>{loremIpsum({ count: 50, units: 'words' })}</p>
      </>
    ),
  },

  render: args => {
    const [isOpen, setIsOpen] = useState(false)

    function handleModalClosed() {
      setIsOpen(false)
    }
    function handleModalOpened() {
      setIsOpen(true)
    }

    return (
      <>
        <span>
          <Button onClick={handleModalOpened}>Open dialog</Button>
        </span>

        <Modal {...args} isOpen={isOpen} onClose={handleModalClosed} />
      </>
    )
  },
}
