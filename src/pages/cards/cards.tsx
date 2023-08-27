import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { Button, ControlledTextField, TextField, Typography } from '../../components'
import { Modal } from '../../components/ui/modal'
import { Page } from '../../components/ui/page'
import { Pagination } from '../../components/ui/pagination'
import { Column, SortTable, Table } from '../../components/ui/table'
import { Card, useCreateCardsMutation, useGetCardsQuery } from '../../services/cards'
import { cardsSlice } from '../../services/cards/cards.slice.ts'
import { useGetDeckByIdQuery } from '../../services/decks'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

import { CardModal } from './cards-modals.tsx'
import s from './cards.module.scss'
import ArrowBackIcon from './icons/ArrowBackIcon.tsx'

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
    { key: 'actions', sortable: false, title: '' },
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
        <Button variant={'primary'} onClick={() => navigate('/')}>
          <Typography as={'span'} variant={'body2'}>
            Add New Card
          </Typography>
        </Button>
        <CardModal deckId={deckId} />
      </div>
      <TextField placeholder={'Search'} value={searchByName} />
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
                <Table.Cell>{card.rating}</Table.Cell>
                <Table.Cell>{card.rating}</Table.Cell>
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
