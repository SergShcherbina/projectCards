import { useState } from 'react'

import { Navigate } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import iconDelete from '../../assets/icons/delete.svg'
import { Button, Slider, TabSwitcher, TextField, Typography } from '../../components'
import { Pagination } from '../../components/ui/pagination'
import { SortTable } from '../../components/ui/table'
import { useGetDecksQuery, decksSlice, useAppDispatch, useAppSelector } from '../../services'
import { useMeQuery } from '../../services/auth'

import { tabs } from './data/tabs.ts'
import { DecksModalCreate } from './decks-modals'
import { DecksTable } from './decks-table'
import s from './decks.module.scss'

export const Decks = () => {
  const [toggleModal, setToggleModal] = useState(false)
  const [sort, setSort] = useState<SortTable>({ key: 'cardsCount', direction: 'desc' })
  const sortString = sort ? `${sort?.key}-${sort?.direction}` : 'name-asc'

  const dispatch = useAppDispatch()

  const { data: userData } = useMeQuery()

  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)
  const showDecks = useAppSelector(state => state.decksSlice.showDecks)
  const sliderValue = useAppSelector(state => state.decksSlice.sliderValue)

  const debounceSliderValue = useDebounce<number[]>(sliderValue, 700)
  const debounceSearchByName = useDebounce<string>(searchByName, 700)

  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))

  const setItemsPerPage = (itemsPerPage: number) => {
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
    setCurrentPage(1)
  }

  const setSearch = (search: string) => {
    dispatch(decksSlice.actions.setSearchByName(search))
    setCurrentPage(1)
  }

  const onSetSliderValue = (value: number[]) => {
    dispatch(decksSlice.actions.setSliderValue(value))
    setCurrentPage(1)
  }

  const setShowCards = (whoseCards: string) => {
    if (whoseCards === 'My cards' && userData) {
      dispatch(decksSlice.actions.setShowDecks([whoseCards, userData.id]))
    } else {
      dispatch(decksSlice.actions.setShowDecks([whoseCards, '']))
    }
    setCurrentPage(1)
  }

  const onClearFilter = () => {
    setCurrentPage(1)
    setSearch('')
    setShowCards('All cards')
    onSetSliderValue([0, 20])
  }

  const { data } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: debounceSearchByName,
    authorId: showDecks[1],
    orderBy: sortString,
    minCardsCount: debounceSliderValue[0],
    maxCardsCount: debounceSliderValue[1],
  })

  const totalPages = data ? data.pagination.totalPages : 1

  if (!userData) return <Navigate to={'/login'} />

  return (
    // <Page>
    <div className={s.wrapperDecks}>
      <div className={s.wrapperTitle}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button onClick={() => setToggleModal(true)}>
          <Typography variant={'subtitle1'} as={'span'}>
            Add New Pack
          </Typography>
        </Button>
      </div>

      <div className={s.gridContainer}>
        <TextField
          type={'search'}
          onChangeValue={setSearch}
          placeholder={'Input search'}
          value={searchByName}
        />

        <TabSwitcher
          className={s.tabSwitcher}
          title={'Show packs cards'}
          value={showDecks[0]}
          onValueChange={setShowCards}
          tabs={tabs}
        />

        <div className={s.sliderFlex}>
          <Typography as={'span'} variant="body2">
            Number of cards
          </Typography>
          <Slider value={sliderValue} max={20} onValueChange={onSetSliderValue} />
        </div>

        <Button variant={'secondary'} onClick={onClearFilter}>
          <img src={iconDelete} alt={'remove icon'} /> Clear filter
        </Button>
      </div>

      <DecksTable setSort={setSort} sort={sort} data={data?.items} myCards={showDecks[1]} />

      <DecksModalCreate toggleModal={toggleModal} setToggleModal={setToggleModal} />

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={setCurrentPage}
        perPageOptions={[8, 16, 24]}
        perPage={itemsPerPage}
        onPerPageChange={setItemsPerPage}
      />
    </div>
    // </Page>
  )
}
