import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeTabFilter } from '../../store/tabsSlice'
import './tabs.scss'

export function Tabs() {
  const dispatch = useAppDispatch()
  const tabsState = useAppSelector((state) => state.tabs.tabs)

  const renderActive = () => tabsState.findIndex((elem) => elem === true)

  return (
    <div className="tabs">
      <button
        id="tabs-0"
        onClick={(e) => dispatch(changeTabFilter((e.target as Element).id))}
        className={renderActive() === 0 ? 'active' : ''}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        id="tabs-1"
        onClick={(e) => dispatch(changeTabFilter((e.target as Element).id))}
        className={renderActive() === 1 ? 'active' : ''}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        id="tabs-2"
        onClick={(e) => dispatch(changeTabFilter((e.target as Element).id))}
        className={renderActive() === 2 ? 'active' : ''}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  )
}
