import { FC } from 'react'

import { Link } from 'react-router-dom'

import { SortTable, Table } from '../../../components/ui/table'
import { Deck } from '../../../services'
import { columns } from '../data/columns.ts'
import Mask from '../img/Mask-small.png'

import s from './decks-table.module.scss'

type Props = {
  setSort: (sort: SortTable) => void
  sort?: SortTable
  data: Deck[] | undefined
}

export const DecksTable: FC<Props> = ({ setSort, sort, data }) => {
  return (
    <Table.Root style={{ margin: '20px 0 10px' }}>
      <Table.Header columns={columns} onSort={setSort} sort={sort} />
      <Table.Body>
        {data?.map(deck => {
          return (
            <Table.Row key={deck.id}>
              <Table.Cell>
                <div className={s.wrapperName}>
                  <div className={s.cover}>
                    <img src={deck.cover ? deck.cover : Mask} alt={`cover ${deck.name}`} />
                  </div>
                  <Link className={s.link} to={`/cards/${deck.id}`}>
                    {deck.name}
                  </Link>
                </div>
              </Table.Cell>
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
