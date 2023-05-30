import React from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { filterClickHandler } from '../../store/filterSlice'

import './filter.scss'

export function Filter() {
  const dispatch = useAppDispatch()
  const filterState = useAppSelector((state) => state.filter.filter)
  const clickEvent = (htmlElem: Element) => dispatch(filterClickHandler(htmlElem.id))
  return (
    <div className="filter">
      <div className="filter-wrapper">
        <span className="filter-title">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        <form action="" id="filter">
          <ul>
            <label htmlFor="filter-1" id="filter-label-0">
              <li className="first">
                <input
                  type="checkbox"
                  id="filter-1"
                  checked={filterState[0]}
                  onChange={(e) => clickEvent(e.target as Element)}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-1" />
                <span>Все</span>
              </li>
            </label>
            <label htmlFor="filter-2" id="filter-label-1">
              <li>
                <input
                  type="checkbox"
                  id="filter-2"
                  checked={filterState[1]}
                  onChange={(e) => clickEvent(e.target as Element)}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-2" />
                <span>Без пересадок</span>
              </li>
            </label>
            <label htmlFor="filter-3" id="filter-label-2">
              <li>
                <input
                  type="checkbox"
                  id="filter-3"
                  checked={filterState[2]}
                  onChange={(e) => clickEvent(e.target as Element)}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-3" />
                <span>1 пересадка</span>
              </li>
            </label>
            <label htmlFor="filter-4" id="filter-label-3">
              <li>
                <input
                  type="checkbox"
                  id="filter-4"
                  checked={filterState[3]}
                  onChange={(e) => clickEvent(e.target as Element)}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-4" />
                <span>2 пересадки</span>
              </li>
            </label>
            <label htmlFor="filter-5" id="filter-label-4">
              <li>
                <input
                  type="checkbox"
                  id="filter-5"
                  checked={filterState[4]}
                  onChange={(e) => clickEvent(e.target as Element)}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-5" />
                <span>3 пересадки</span>
              </li>
            </label>
          </ul>
        </form>
      </div>
    </div>
  )
}
