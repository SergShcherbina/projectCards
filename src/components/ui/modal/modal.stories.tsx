import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { loremIpsum } from 'lorem-ipsum'

import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { TextField } from '../text-field'

import { Modal } from './modal.tsx'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    isOpen: false,
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
} as Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const SplashText: Story = {
  args: {
    showCloseIcon: false,
    children: (
      <>
        <p>{loremIpsum({ count: 50, units: 'words' })}</p>
      </>
    ),
  },
}

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
}

export const SimpleWithButtons: Story = {
  args: {
    title: 'Simple text with button',
    confirmButtonText: 'Yes, it sounds good!',
    onConfirmButtonClick: () => alert('confirmation button was pressed'),
    cancelButtonText: "Let's get the hell out of this...",

    children: (
      <>
        <p>{loremIpsum({ count: 50, units: 'words' })}</p>
        <p>{loremIpsum({ count: 50, units: 'words' })}</p>
      </>
    ),
  },
}

export const ModalWithInputs: Story = {
  args: {
    title: 'Modal with inputs',
    cancelButtonText: "Let's get the hell out of this...",
    confirmButtonText: 'Yes, it sounds good!',
    onConfirmButtonClick: () => alert('confirmation button was pressed'),
  },

  render: args => {
    const [isOpen, setIsOpen] = useState(false)
    const [checked, setChecked] = useState(false)

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

        <Modal {...args} isOpen={isOpen} onClose={handleModalClosed}>
          <TextField type={'text'} placeholder={'Input'} />
          <TextField type={'text'} placeholder={'Input'} />
          <Checkbox
            label={'Check-box'}
            id={'id'}
            {...args}
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </Modal>
      </>
    )
  },
}
