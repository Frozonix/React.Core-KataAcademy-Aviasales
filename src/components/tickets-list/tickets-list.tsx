import React, { useEffect, useState } from 'react'

import './tickets-list.scss'
import { TicketCard } from '../ticket-card/ticket-card'
import { Loading } from '../loading/loading'
import { Alert } from '../alert/alert'
import { getData } from '../../store/ticketsSlice'
import { allTickets, notAllTickets } from '../../store/ticketsSlice'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { dataObj } from '../../types/dataType'

export function TicketsList() {
  const [viewTickets, setViewTickets] = useState<dataObj[] | []>([])
  const [viewCounter, setViewCounter] = useState<number>(5)
  //   const [renderTickets, setRenderTickets] = useState<dataObj[] | []>([])
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector((state) => state.tickets)
  const filterState = useAppSelector((state) => state.filter.filter)
  const tabsState = useAppSelector((state) => state.tabs.tabs)

  useEffect(() => {
    async function get() {
      const active = tabsState.findIndex((item) => item === true)
      await dispatch(getData())
      await dispatch(allTickets([filterState, active]))
    }
    get()
    //  dispatch(getData())
  }, [dispatch])

  //   useEffect(() => {
  //     setViewTickets((state) => {
  //       console.log(state)
  //       console.log([...state, ...data.tickets.slice(viewCounter, viewCounter + 5)])
  //       return [...state, ...data.tickets.slice(viewCounter, viewCounter + 5)]
  //     })
  //   }, [data, viewCounter])

  useEffect(() => {
    setViewTickets([...data.tickets].slice(0, viewCounter))
  }, [data, viewCounter])

  useEffect(() => {
    const active = tabsState.findIndex((item) => item === true)
    if (filterState[0]) {
      console.log(active)
      dispatch(allTickets([filterState, active]))
    } else {
      console.log(active)
      dispatch(notAllTickets([filterState, active]))
    }
  }, [filterState, tabsState])

  function partTickets() {
    if (status === 'loading') {
      return <Loading />
    } else if (status === 'ok') {
      // console.log(data.tickets)
      // setViewTickets([...data.tickets])

      if (viewTickets.length !== 0) {
        //   console.log(viewTickets)

        return viewTickets.map((item: any) => {
          //   console.log(item)
          return (
            <TicketCard
              data={item}
              key={
                'avia-' +
                Math.random().toString(36).substring(2).toString() +
                Math.random().toString(36).substring(2).toString()
              }
            />
          )
        })
      } else {
        return <Alert type="info" text="Рейсов, подходящих под заданные фильтры, не найдено" />
      }
    } else {
      return <Alert type="error" text={error.toString()} />
    }
  }
  function showPartTickets() {}
  function showBtn() {
    if (status === 'ok' && viewTickets.length !== 0) {
      return (
        <li className="tickets-load-btn-wrapper">
          <button
            className="tickets-load-btn"
            onClick={() => {
              setViewCounter((viewCounter) => viewCounter + 5)
              console.log(document.body.clientHeight)
            }}
          >
            Загрузить еще 5 билетов!
          </button>
        </li>
      )
    } else {
      return null
    }
  }

  return (
    <ul className="tickets-list">
      {partTickets()}
      {showBtn()}
    </ul>
  )
}
