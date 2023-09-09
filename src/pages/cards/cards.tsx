import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Button, TextField, Typography } from '../../components'
import { ButtonBack } from '../../components/ui/button-back/button-back.tsx'
import { Grade } from '../../components/ui/grade'
import { Page } from '../../components/ui/page'
import { Pagination } from '../../components/ui/pagination'
import { Column, SortTable, Table } from '../../components/ui/table'
import { useGetDeckByIdQuery } from '../../services'
import { useMeQuery } from '../../services/auth'
import { Card, useGetCardsQuery } from '../../services/cards'
import { cardsSlice } from '../../services/cards/cards.slice.ts'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

import s from './cards.module.scss'
import LearnIcon from './icons/LearnIcon.tsx'
import { CardModalAdd, CardModalDelete } from './modals'
import { CardModalEdit } from './modals/cards-modal-edit.tsx'

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

  const { data: me } = useMeQuery()
  const isOwner = me?.id === deck?.userId

  if (!deckId) return <div>Deck not found</div>
  //const isOwner = deck?.userId == 'f2be95b9-4d07-4751-a775-bd612fc9553a' // test acc

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
      <ButtonBack />
      <div className={s.rowFlex}>
        <Typography variant={'large'}>{deck?.name}</Typography>

        {isOwner ? (
          <Button onClick={() => {}}>
            Add New Card
            <CardModalEdit deckId={deckId} mode={'new'} />
          </Button>
        ) : (
          <Button onClick={() => navigate(`/learn/${deckId}`)}>Learn to Pack </Button>
        )}
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
                <Table.Cell>
                  {card?.questionImg ? (
                    <>
                      <img className={s.cardImg} src={card?.questionImg} alt="cover" />
                      <div>{card.question}</div>
                    </>
                  ) : (
                    card.question
                  )}
                </Table.Cell>

                <Table.Cell>
                  {card?.answerImg ? (
                    <>
                      <img className={s.cardImg} src={card?.answerImg} alt="cover" />
                      <div>{card.answer}</div>
                    </>
                  ) : (
                    card.answer
                  )}
                </Table.Cell>
                <Table.Cell>{new Date(card.updated).toLocaleDateString('ru-Ru')}</Table.Cell>
                <Table.Cell>
                  <Grade grade={card.rating} />
                </Table.Cell>

                <Table.Cell>
                  <div className={s.actions}>
                    {isOwner ? (
                      <>
                        <CardModalDelete cardId={card.id} />
                        <CardModalEdit currentCard={card} mode={'edit'} />
                      </>
                    ) : (
                      <LearnIcon onClick={() => navigate(`/learn/${deckId}`)} />
                    )}
                  </div>
                </Table.Cell>
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
