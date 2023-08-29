import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Button, TextField, Typography } from '../../components'
import { Grade } from '../../components/ui/grade'
import { Page } from '../../components/ui/page'
import { Pagination } from '../../components/ui/pagination'
import { Column, SortTable, Table } from '../../components/ui/table'
import { Card, useGetCardsQuery } from '../../services/cards'
import { cardsSlice } from '../../services/cards/cards.slice.ts'
import { useGetDeckByIdQuery } from '../../services/decks'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

import s from './cards.module.scss'
import ArrowBackIcon from './icons/ArrowBackIcon.tsx'
import { CardModalAdd, CardModalDelete } from './modals'

export const Cards = () => {
  const { deckId } = useParams<{ deckId: string }>()

  const [sortTable, setSortTable] = useState<SortTable>({ key: 'updated', direction: 'asc' })
  const orderBy = sortTable ? `${sortTable.key}-${sortTable.direction}` : null

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const itemsPerPage = useAppSelector(state => state.cardsSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.cardsSlice.currentPage)
  const searchByName = useAppSelector(state => state.cardsSlice.searchByName)

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(cardsSlice.actions.setItemsPerPage(itemsPerPage))

  const setCurrentPage = (currentPage: number) =>
    dispatch(cardsSlice.actions.setCurrentPage(currentPage))

  const setSearch = (search: string) => dispatch(cardsSlice.actions.setSearchByName(search))

  const { data: deck } = useGetDeckByIdQuery(deckId || '')

  const { data: cards, isLoading } = useGetCardsQuery({
    deckId: deckId || '',
    itemsPerPage,
    currentPage,
    orderBy,
  })

  if (!deckId) return <div>Deck not found</div>
  const isOwner = deck?.userId == 'f2be95b9-4d07-4751-a775-bd612fc9553a' // test acc

  if (searchByName) {
    cards?.items?.forEach((item: Card, index: number, object: any) => {
      debugger
      if (!item.question.search(searchByName)) {
        object.splice(index, 1)
      }
    })
  }

  const columns: Column[] = [
    { key: 'question', sortable: true, title: 'Question' },
    { key: 'answer', sortable: true, title: 'Answer' },
    { key: 'updated', sortable: true, title: 'Updated' },
    { key: 'rating', sortable: true, title: 'Grade' },
    { key: 'actions', sortable: false, title: 'Actions' },
  ]

  if (isLoading) return <div>isLoading: {isLoading.toString()}</div>

  return (
    <Page>
      <Button variant={'link'} onClick={() => navigate('/')} style={{ outline: 'none' }}>
        <Typography variant={'body2'} className={s.backLabel}>
          <ArrowBackIcon width={16} /> Back to Packs Lists
        </Typography>
      </Button>
      <div className={s.rowFlex}>
        <Typography variant={'large'}>{deck?.name}</Typography>
        <CardModalAdd deckId={deckId} />
      </div>
      {deck?.cover && <img className={s.cover} src={deck?.cover} alt="cover" />}

      <TextField
        label="Search"
        onChangeValue={setSearch}
        value={searchByName}
        placeholder="input search"
        type="search"
      />

      <Table.Root>
        <Table.Header columns={columns} sort={sortTable} onSort={setSortTable} />
        <Table.Body>
          {cards?.items.map(card => {
            return (
              <Table.Row key={card.id}>
                <Table.Cell>{card.question}</Table.Cell>
                <Table.Cell>{card.answer}</Table.Cell>
                <Table.Cell>{new Date(card.updated).toLocaleDateString('ru-Ru')}</Table.Cell>
                <Table.Cell>
                  <Grade grade={card.rating} />
                </Table.Cell>

                {isOwner && (
                  <Table.Cell>
                    <div className={s.actions}>
                      <CardModalDelete cardId={card.id} />
                      <CardModalDelete cardId={card.id} />
                    </div>
                  </Table.Cell>
                )}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>

      <Pagination
        page={currentPage}
        onChange={setCurrentPage}
        onPerPageChange={setItemsPerPage}
        count={cards?.pagination?.totalPages || 1}
        perPage={itemsPerPage}
        perPageOptions={[5, 10, 15, 20, 100]}
      />
    </Page>
  )
}
