import { useState } from 'react'

import { Button, Slider, TabSwitcher, TextField, Typography } from '../../components'
import { Page } from '../../components/ui/page/page.tsx'
import { Pagination } from '../../components/ui/pagination'
import { Table } from '../../components/ui/table'
import { useGetDecksQuery } from '../../services/decks'
import { decksSlice } from '../../services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

import s from './decks.module.scss'
import removeImg from './img/remove.svg'

export const Decks = () => {
  const [timer, setTimer] = useState(0)
  const [sliderValue, setSliderValue] = useState([0, 20])
  const [sort, setSort] = useState<{ key: string; direction: 'desc' | 'asc' }>({
    key: 'created',
    direction: 'desc',
  })

  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)
  const showDecks = useAppSelector(state => state.decksSlice.showDecks)
  const numberOfCards = useAppSelector(state => state.decksSlice.numberOfCards)

  const sortString = sort ? `${sort?.key}-${sort?.direction}` : null
  const columns = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      key: 'cardsCount',
      title: 'Cards',
      sortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      sortable: true,
    },
    {
      key: 'created',
      title: 'Created by',
      sortable: true,
    },
  ]

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))

  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))

  const setSearch = (search: string) => {
    clearTimeout(timer)

    const timeout = setTimeout(() => {
      dispatch(decksSlice.actions.setSearchByName(search))
    }, 1000)

    setTimer(+timeout)
  }
  const setShowCards = (whoseCards: string) => {
    if (whoseCards === 'My Cards') {
      dispatch(decksSlice.actions.setShowDecks('77e008a5-9e91-485e-809b-81081e0d00cb'))
    } else {
      dispatch(decksSlice.actions.setShowDecks(''))
    }
  }

  const onChangeSliderValue = (value: number[]) => {
    setSliderValue(value)
    clearTimeout(timer)

    const timeout = setTimeout(() => {
      dispatch(decksSlice.actions.setNumberOfCards(sliderValue))
    }, 1000)

    setTimer(+timeout)
  }

  const { data, isLoading } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: searchByName,
    // orderBy: 'name-asc',
    orderBy: sortString ?? '',
    authorId: showDecks,
    minCardsCount: numberOfCards[0],
    maxCardsCount: numberOfCards[1],
  })

  const totalPages = data ? data.pagination.totalPages : 1

  // const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDecksMutation()
  // const handleCreateDeck = () => createDeck({ name: cardName })

  if (isLoading) return <div>isLoading: {isLoading.toString()}</div>

  return (
    <Page>
      <div className={s.wrapperTitle}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button>
          <Typography variant={'subtitle1'} as={'span'}>
            Add New Pack
          </Typography>
        </Button>
      </div>
      <div className={s.gridContainer}>
        <TextField type={'search'} onChangeValue={setSearch} placeholder={'Input search'} />
        <TabSwitcher
          title={'Show packs cards'}
          defaultValue={'All cards'}
          onValueChange={setShowCards}
          tabs={[
            {
              title: 'My Cards',
              value: 'My Cards',
            },
            {
              title: 'All cards',
              value: 'All cards',
            },
          ]}
        />
        <div className={s.sliderFlex}>
          <Typography as={'span'} variant="body2">
            Number of cards
          </Typography>
          <Slider value={sliderValue} max={20} onValueChange={onChangeSliderValue} />
        </div>
        <Button variant={'secondary'}>
          <img src={removeImg} alt={'remove icon'} /> Clear filter
        </Button>
      </div>
      <Table.Root style={{ marginTop: '20px' }}>
        <Table.Header columns={columns} onSort={setSort} sort={sort} />
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

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={setCurrentPage}
        perPageOptions={[8, 16, 24]}
        perPage={itemsPerPage}
        onPerPageChange={setItemsPerPage}
      />
    </Page>
  )
}
