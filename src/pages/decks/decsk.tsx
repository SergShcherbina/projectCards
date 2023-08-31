import { useState } from 'react'

import { useDebounce } from 'usehooks-ts'

import { Button, Slider, TabSwitcher, TextField, Typography } from '../../components'
import { Page } from '../../components/ui/page'
import { Pagination } from '../../components/ui/pagination'
import { SortTable } from '../../components/ui/table'
import { useGetDecksQuery, decksSlice, useAppDispatch, useAppSelector } from '../../services'

import { tabs } from './data/tabs.ts'
import { DecksModal } from './decks-modal'
import { DecksTable } from './decks-table'
import s from './decks.module.scss'
import removeImg from './img/remove.svg'

export const Decks = () => {
  const [toggleModal, setToggleModal] = useState(false)
  const [sort, setSort] = useState<SortTable>(null)
  const sortString = sort ? `${sort?.key}-${sort?.direction}` : null

  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)
  const showDecks = useAppSelector(state => state.decksSlice.showDecks)
  const sliderValue = useAppSelector(state => state.decksSlice.sliderValue)

  const debounceSliderValue = useDebounce<number[]>(sliderValue, 1000)
  const debounceSearchByName = useDebounce<string>(searchByName, 1000)

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))

  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))

  const setSearch = (search: string) => {
    dispatch(decksSlice.actions.setSearchByName(search))
  }

  const onSetSliderValue = (value: number[]) => {
    dispatch(decksSlice.actions.setSliderValue(value))
  }

  const setShowCards = (whoseCards: string) => {
    if (whoseCards === 'My cards') {
      dispatch(
        decksSlice.actions.setShowDecks([whoseCards, '77e008a5-9e91-485e-809b-81081e0d00cb'])
      )
    } else {
      dispatch(decksSlice.actions.setShowDecks([whoseCards, '']))
    }
  }

  const onClearFilter = () => {
    setCurrentPage(1)
    setSearch('')
    setShowCards('All cards')
    onSetSliderValue([0, 20])
  }

  const { data, isLoading } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: debounceSearchByName,
    authorId: showDecks[1],
    orderBy: sortString ?? '',
    minCardsCount: debounceSliderValue[0],
    maxCardsCount: debounceSliderValue[1],
  })

  const totalPages = data ? data.pagination.totalPages : 1

  if (isLoading) return <div>isLoading: {isLoading.toString()}</div>

  return (
    <Page>
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
          <img src={removeImg} alt={'remove icon'} /> Clear filter
        </Button>
      </div>

      <DecksTable setSort={setSort} sort={sort} data={data?.items} />

      <DecksModal toggleModal={toggleModal} setToggleModal={setToggleModal} />

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
