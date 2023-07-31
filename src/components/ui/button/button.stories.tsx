import type { Meta, StoryObj } from '@storybook/react'

import SampleIcon from './img/sampleIcon.svg'

import { Button } from './'
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    disabled: false,
    children: 'Button primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button secondary',
    disabled: false,
  },
}
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary',
    disabled: false,
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link-button',
    disabled: false,
    as: 'a',
    href: '#',
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}

export const PrimaryIcon: Story = {
  args: {
    variant: 'primary',
    disabled: false,
    children: (
      <>
        <img src={SampleIcon} alt="sample" /> Button primary
      </>
    ),
  },
}

export const SecondaryIcon: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <img src={SampleIcon} alt="sample" /> Secondary button
      </>
    ),
    disabled: false,
  },
}
