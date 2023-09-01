import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState = {
  itemsPerPage: 5,
  currentPage: 1,
  searchByName: '',
}

export const cardsSlice = createSlice({
  initialState,
  name: 'cardsSlice',
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
  },
})
