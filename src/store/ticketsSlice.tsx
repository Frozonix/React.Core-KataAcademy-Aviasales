import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { dataObj, dataSegmentsObj } from '../types/dataType'
// import { useAppDispatch } from './hooks'
// import tabsSlice from './tabsSlice'
type currentAppStateType = [boolean[], number]

export const getData = createAsyncThunk('tickets/getData', async function (_, { rejectWithValue }) {
  const getUrl = await (await fetch('https://aviasales-test-api.kata.academy/search')).json()
  const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${getUrl.searchId}`

  try {
    const responce = await fetch(url)
    if (!responce.ok) {
      throw new Error('Server Error:' + ` ${responce.status}`)
    }
    const data = await responce.json()
    //  console.log(data)
    //  const sortedData = data.tickets.sort((a: dataObj, b: dataObj) => {
    //    return a.price - b.price
    //  })
    // if (filterState[0] === true) {
    // dispatch(allTickets([filterState, active]))
    // } else {
    //  dispatch(notAllTickets([filterState, active]))
    // }
    return data
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message)
    }
  }
})

// type tabsFilter = { tabs: [boolean, boolean, boolean] }

// type dataSegmentsObj = {
//   origin: string
//   destination: string
//   date: string
//   duration: number
//   stops: [string]
// }

// type dataObj = {
//   price: number
//   carrier: string
//   segments: [dataSegmentsObj, dataSegmentsObj]
// }

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
          //  state.data.tickets = array.sort((a: dataObj, b: dataObj) => {
          //    return a.price - b.price
          //  })
        } else if (active === 1) {
          state.data.tickets = activeSecondTab(array)
        }
      }
      // if (action.payload[0] === true) {
      //   const array = [...state.initData]
      //   state.data.tickets = array.sort((a: dataObj, b: dataObj) => {
      //     return a.price - b.price
      //   })
      // }
    },
    notAllTickets(state, action: PayloadAction<any>) {
      // function length_0(x: dataObj) {
      // 	if (action.payload[1]) return x.segments[0].stops.length === 0 || x.segments[1].stops.length === 0
      //  }
      //  function length_1(x: dataObj) {
      // 	if (action.payload[2]) return x.segments[0].stops.length === 1 || x.segments[1].stops.length === 1
      //  }
      //  function length_2(x: dataObj) {
      // 	if (action.payload[3]) return x.segments[0].stops.length === 2 || x.segments[1].stops.length === 2
      //  }
      //  function length_3(x: dataObj) {
      // 	if (action.payload[4]) return x.segments[0].stops.length === 3 || x.segments[1].stops.length === 3
      //  }
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
    //  [getData.pending]: (state) => {
    //    state.status = 'loading'
    //    state.error = null
    //  },
    //  [getData.fulfilled]: (state, action: PayloadAction<any>) => {
    //    state.status = 'ok'
    //    state.data = action.payload
    //    state.error = null
    //  },
    //  [getData.rejected]: (state, action: PayloadAction<any>) => {
    //    state.status = 'rejected'
    //    state.error = action.payload
    //    console.log(action.payload)
    //  },
  },
})

// function activeFirstTab(state, array) {
//   state.data.tickets = array.sort((a: dataObj, b: dataObj) => {
//     return a.price - b.price
//   })
// }

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
