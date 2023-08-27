import { FC } from 'react'

import { SortTable, Table } from '../../../components/ui/table'
import { Deck } from '../../../services/decks'
import { columns } from '../data/columns.ts'

type Props = {
  setSort: (sort: SortTable) => void
  sort?: SortTable
  data: Deck[] | undefined
}

export const DecksTable: FC<Props> = ({ setSort, sort, data }) => {
  return (
    <Table.Root style={{ marginTop: '20px' }}>
      <Table.Header columns={columns} onSort={setSort} sort={sort} />
      <Table.Body>
        {data?.map(deck => {
          return (
            <Table.Row key={deck.id}>
              <Table.Cell>{deck.name}</Table.Cell>
              <Table.Cell>{deck.cardsCount}</Table.Cell>
              <Table.Cell>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</Table.Cell>
              <Table.Cell>{deck.author.name}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
