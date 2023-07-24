import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'body1',
        'subtitle1',
        'body2',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
      ],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    children: 'h1',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    children: 'h2',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    children: 'h3',
    variant: 'h3',
  },
}

export const Body1: Story = {
  args: {
    children: 'body1',
    variant: 'body1',
  },
}

export const SubTitle1: Story = {
  args: {
    children: 'subtitle1',
    variant: 'subtitle1',
  },
}

export const Body2: Story = {
  args: {
    children: 'body2',
    variant: 'body2',
  },
}

export const Subtitle2: Story = {
  args: {
    children: 'subtitle2',
    variant: 'subtitle2',
  },
}

export const Caption: Story = {
  args: {
    children: 'caption',
    variant: 'caption',
  },
}

export const Overline: Story = {
  args: {
    children: 'overline',
    variant: 'overline',
  },
}

export const TypographyAsLink_1: Story = {
  args: {
    children: 'link_1',
    variant: 'link1',
    href: '#',
    as: 'a',
  },
}

export const TypographyAsLink_2: Story = {
  args: {
    children: 'link_2',
    variant: 'link2',
    href: '#',
    as: 'a',
  },
}
