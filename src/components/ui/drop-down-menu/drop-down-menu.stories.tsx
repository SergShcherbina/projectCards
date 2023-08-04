import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '../avatar'

import { DropDownMenuHeader } from './drop-down-menu-header/drop-down-menu-header.tsx'
import { DropDownMenuItem } from './drop-down-menu-item/drop-down-menu-item.tsx'
import { DropDownMenu } from './drop-down-menu.tsx'
import logOutIcon from './img/logOut.svg'
import personIcon from './img/personOutline.svg'

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
