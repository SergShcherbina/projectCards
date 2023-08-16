import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination.tsx'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    onChange: { actions: 'clicked' },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 300,
    page: 1,
    onChange: () => ({}),
    perPage: 10,
    perPageOptions: [5, 10],
    onPerPageChange: () => {},
  },

  render: args => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    return (
      <>
        <Pagination
          {...args}
          count={300}
          page={page}
          onChange={setPage}
          perPageOptions={[20, 30]}
          perPage={perPage}
          onPerPageChange={setPerPage}
        />
      </>
    )
  },
}
