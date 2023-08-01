import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '../avatar'

import { DropDownMenu } from './dropDownMenu.tsx'
import { DropDownMenuHeader } from './dropDownMenuHeader/dropDownMenuHeader.tsx'
import { DropDownMenuItem } from './dropDownMenuItem/dropDownMenuItem.tsx'
import logOutIcon from './images/log-out.svg'
import personIcon from './images/person-outline.svg'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDown: Story = {
  args: {
    children: (
      <>
        <DropDownMenuHeader userName={'userName'} userEmail={'j&johnson@gmail.com'} />
        <DropDownMenuItem icon={personIcon} text={'My Profile'} onClick={() => {}} />
        <DropDownMenuItem icon={logOutIcon} text={'Sing Out'} onClick={() => {}} />
      </>
    ),
    trigger: <Avatar />,
  },
}
export const DropDownMenuOnlyItem: Story = {
  args: {
    children: (
      <>
        <DropDownMenuItem icon={personIcon} text={'Text'} onClick={() => {}} />
        <DropDownMenuItem icon={logOutIcon} text={'Text 1'} onClick={() => {}} />
        <DropDownMenuItem icon={personIcon} text={'Text 2'} onClick={() => {}} />
        <DropDownMenuItem icon={logOutIcon} text={'Text 3'} onClick={() => {}} />
      </>
    ),
    trigger: <Avatar />,
  },
}
