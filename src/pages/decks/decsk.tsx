import { useState } from 'react'

import { Button, TextField } from '../../components'
import { Table } from '../../components/ui/table'
import { useCreateDecksMutation, useGetDecksQuery } from '../../services/decks'
import { decksSlice } from '../../services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

export const Decks = () => {
  //const [itemsPerPage, setItemsPerPage] = useState(20)
  const [cardName, setCardName] = useState('')

  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))

  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))

  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const { data, isLoading, refetch } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: searchByName,
    orderBy: 'created-desc',
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDecksMutation()
  const handleCreateDeck = () => createDeck({ name: cardName })

  if (isLoading) return <div>isLoading: {isLoading.toString()}</div>

  return (
    <div>
      <Button onClick={refetch}>refetch</Button>
      <Button onClick={() => setItemsPerPage(10)}>itemsPerPage:10</Button>
      <Button onClick={() => setItemsPerPage(15)}>itemsPerPage:15</Button>
      <Button onClick={() => setItemsPerPage(20)}>itemsPerPage:20</Button>
      <Button onClick={() => setCurrentPage(1)}>currentPage:1</Button>
      <Button onClick={() => setCurrentPage(2)}>currentPage:2</Button>
      <Button onClick={() => setCurrentPage(3)}>currentPage:3</Button>
      <TextField value={searchByName} onChange={e => setSearch(e.currentTarget.value)}></TextField>
      <TextField
        value={cardName}
        onChange={e => setCardName(e.currentTarget.value)}
        label={'card-name'}
      ></TextField>
      <Button onClick={handleCreateDeck}>Create deck</Button>
      isCreateDeckLoading: {isCreateDeckLoading.toString()}
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created by</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.items.map(deck => {
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
    </div>
  )
}
