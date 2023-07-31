import { Meta } from '@storybook/react'

import { TabSwitcher } from './tab-switcher.tsx'

export default {
  title: 'Components/Tab-switcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  args: {
    title: 'Title',
    tabs: [
      { value: 'Tab1', title: 'Tab 1' },
      { value: 'Tab2', title: 'Tab 2' },
      { value: 'Tab3', title: 'Tab 3' },
    ],
    defaultValue: 'Tab1',
  },
} as Meta<typeof TabSwitcher>

export const Default = {}

export const DefaultWithDisabled = {
  args: {
    tabs: [
      { value: 'Tab1', title: 'Tab 1' },
      { value: 'Tab2', title: 'Tab 2' },
      { value: 'Tab3', title: 'Tab 3', disabled: true },
    ],
  },
}

export const FullWidth = {
  args: {
    fullWidth: true,
  },
}
