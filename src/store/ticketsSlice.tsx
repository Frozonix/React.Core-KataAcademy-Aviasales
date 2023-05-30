import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { dataObj } from '../types/dataType'

export const getData = createAsyncThunk('tickets/getData', async function (_, { rejectWithValue }) {
  const getUrl = await (await fetch('https://aviasales-test-api.kata.academy/search')).json()
  const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${getUrl.searchId}`

  try {
    const responce = await fetch(url)
    if (!responce.ok) {
      throw new Error('Server Error:' + ` ${responce.status}`)
    }
    const data = await responce.json()
    return data
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message)
    }
  }
})

type init = {
  initData: dataObj[] | []
  data: {
    tickets: dataObj[] | []
    stop: boolean
  }
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
    allTickets(state, action: PayloadAction<any>) {
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
    notAllTickets(state, action: PayloadAction<any>) {
      const [filterState, active] = action.payload

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

      let array = [...state.initData]
      array = array.filter((item) => {
        return length_0(item) || length_1(item) || length_2(item) || length_3(item)
      })

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
      state.error = ''
    })
    builder.addCase(getData.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'ok'
      state.data = action.payload
      state.initData = action.payload.tickets
      state.error = ''
    })
    builder.addCase(getData.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'rejected'
      state.error = action.payload
      console.log(action.payload)
    })
  },
})

function activeFirstTab(array: dataObj[]) {
  return array.sort((a: dataObj, b: dataObj) => {
    return a.price - b.price
  })
}
function activeSecondTab(array: dataObj[]) {
  return array.sort((a: dataObj, b: dataObj) => {
    return a.segments[0].duration - b.segments[0].duration
  })
}

export const { allTickets, notAllTickets } = ticketsSlice.actions
export default ticketsSlice.reducer
