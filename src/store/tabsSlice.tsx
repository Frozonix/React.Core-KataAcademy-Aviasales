import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type tabsFilter = { tabs: [boolean, boolean, boolean] }

const initialState: tabsFilter = { tabs: [true, false, false] }

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    changeTabFilter(state, action: PayloadAction<string>) {
      state.tabs = [false, false, false]
      const getIndex = Number(action.payload.slice(-1))
      state.tabs[getIndex] = true
    },
  },
})

export const { changeTabFilter } = tabsSlice.actions
export default tabsSlice.reducer
