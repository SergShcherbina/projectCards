import { FC } from 'react'

import { Link } from 'react-router-dom'

import iconLearn from '../../../assets/icons/play.svg'
import { SortTable, Table } from '../../../components/ui/table'
import { Deck } from '../../../services'
import { columns } from '../data/columns.ts'
import { DecksModalDelete } from '../decks-modals'
import { DecksModalEdit } from '../decks-modals/modal-edit/decks-modal-edit.tsx'
import Mask from '../img/Mask-small.png'

import s from './decks-table.module.scss'

type Props = {
  setSort: (sort: SortTable) => void
  sort?: SortTable
  data: Deck[] | undefined
  myCards: string
}

export const DecksTable: FC<Props> = ({ setSort, sort, data, myCards }) => {
  return (
    <Table.Root style={{ margin: '20px 0 10px' }}>
      <Table.Header columns={columns} onSort={setSort} sort={sort} />
      <Table.Body>
        {data?.map(deck => {
          return (
            <Table.Row key={deck.id}>
              <Table.Cell>
                {/*<div className={s.wrapperName}>*/}
                <Link className={s.link} to={`/cards/${deck.id}`}>
                  <div className={s.cover}>
                    <img
                      className={s.coverImg}
                      src={deck.cover ? deck.cover : Mask}
                      alt={`cover ${deck.name}`}
                    />
                  </div>
                  {deck.name}
                </Link>
                {/*</div>*/}
              </Table.Cell>
              <Table.Cell>{deck.cardsCount}</Table.Cell>
              <Table.Cell>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</Table.Cell>
              <Table.Cell>{deck.author.name}</Table.Cell>
              <Table.Cell>
                <div className={s.wrapperIcons}>
                  <Link to={`/learn/${deck.id}`} className={s.itemLink}>
                    <img src={iconLearn} alt={'icon learn packs'} />
                  </Link>

                  {myCards && (
                    <>
                      <DecksModalEdit
                        decksId={deck.id}
                        prevDeckName={deck.name}
                        prevCover={deck.cover}
                        isPrevPrivate={deck.isPrivate}
                      />
                      <DecksModalDelete decksId={deck.id} />
                    </>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
