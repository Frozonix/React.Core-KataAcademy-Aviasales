import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { dataObj } from '../types/dataType'

// eslint-disable-next-line
export const getData = createAsyncThunk('tickets/getData', async (counter: number, { rejectWithValue }) => {
  const getUrl = await (await fetch('https://aviasales-test-api.kata.academy/search')).json()
  const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${getUrl.searchId}`

  try {
    if (counter < 3) {
      const responce = await fetch(url)
      if (!responce.ok) {
        throw new Error(`Server Error: ${responce.status}`)
      }
      const data = await responce.json()
      return data
    }
    throw new Error(`Server Error!`)
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue([err.message, counter])
    }
  }
})

type data = {
  tickets: dataObj[] | []
  stop: boolean
}

type init = {
  initData: dataObj[] | []
  data: data
  status: string
  error: string | Error
}

const initialState: init = {
  initData: [],
  data: { tickets: [], stop: false },
  status: 'loading',
  error: '',
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    allTickets(state, action: PayloadAction<[[boolean, boolean, boolean, boolean, boolean], number]>) {
      const [filterState, active] = action.payload
      if (filterState[0] === true) {
        const array = [...state.initData]
        if (active === 0) {
          state.data.tickets = activeFirstTab(array)
        } else if (active === 1) {
          state.data.tickets = activeSecondTab(array)
        }
      }
    },
    notAllTickets(state, action: PayloadAction<[[boolean, boolean, boolean, boolean, boolean], number]>) {
      const [filterState, active] = action.payload
      /* eslint-disable */
      function length_0(x: dataObj) {
        if (filterState[1]) return x.segments[0].stops.length === 0
      }
      function length_1(x: dataObj) {
        if (filterState[2]) return x.segments[0].stops.length === 1
      }
      function length_2(x: dataObj) {
        if (filterState[3]) return x.segments[0].stops.length === 2
      }
      function length_3(x: dataObj) {
        if (filterState[4]) return x.segments[0].stops.length === 3
      }
      /* eslint-enable */
      let array = [...state.initData]
      array = array.filter((item) => length_0(item) || length_1(item) || length_2(item) || length_3(item))

      if (active === 0) {
        state.data.tickets = activeFirstTab(array)
      } else if (active === 1) {
        state.data.tickets = activeSecondTab(array)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getData.fulfilled, (state, action: PayloadAction<data>) => {
      state.status = 'ok'
      state.data = action.payload
      state.initData = action.payload.tickets
      state.error = ''
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(getData.rejected, (state, action: PayloadAction<[string, number]>) => {
      if (action.payload[1] >= 2) {
        state.status = 'rejected'
      } else {
        state.status = 'loading'
      }
      if (typeof action.payload[0] === 'string') {
        state.error = `${action.payload[0]} :: ${action.payload[1]}`
      }
    })
  },
})

function activeFirstTab(array: dataObj[]) {
  return array.sort((a: dataObj, b: dataObj) => a.price - b.price)
}
function activeSecondTab(array: dataObj[]) {
  return array.sort((a: dataObj, b: dataObj) => a.segments[0].duration - b.segments[0].duration)
}

export const { allTickets, notAllTickets } = ticketsSlice.actions
export default ticketsSlice.reducer
