import { configureStore } from '@reduxjs/toolkit'

import tabsReducer from './tabsSlice'
import filterReducer from './filterSlice'
import ticketsReducer from './ticketsSlice'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    tabs: tabsReducer,
    tickets: ticketsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch
