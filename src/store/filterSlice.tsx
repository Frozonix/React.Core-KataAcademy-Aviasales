import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type filterType = { filter: [boolean, boolean, boolean, boolean, boolean] }
type returnFilterType = [boolean, boolean, boolean, boolean, boolean]

const initialState: filterType = { filter: [true, true, true, true, true] }

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterClickHandler(state, action: PayloadAction<string>) {
      const getIndex = Number(action.payload.slice(-1)) - 1
      const firstElem = state.filter[0]

      if (getIndex === 0) {
        state.filter = allClickHandler(firstElem)
      } else if (firstElem && getIndex !== 0) {
        state.filter[0] = false
        state.filter[getIndex] = !state.filter[getIndex]
      } else {
        state.filter[getIndex] = !state.filter[getIndex]
      }

      if (JSON.stringify(state.filter) === JSON.stringify([false, true, true, true, true])) {
        state.filter[0] = true
      }
    },
  },
})

const allClickHandler = (firstElem: boolean): returnFilterType => {
  if (firstElem) {
    return [false, false, false, false, false]
  }
  return [true, true, true, true, true]
}
export const { filterClickHandler } = filterSlice.actions
export default filterSlice.reducer
