import React from 'react'

import './ticket-card.scss'
import logoS7 from '../../img/S7 Logo.png'
import { dataObj } from '../../types/dataType'

interface I_TicketCardProps {
  data: dataObj
}

export function TicketCard({ data }: I_TicketCardProps) {
  const partTop = data.segments[0]
  const partBottom = data.segments[1]

  const getPrice = (price: number) =>
    price.toString().length === 5
      ? price.toString().slice(0, 2) + ' ' + price.toString().slice(2)
      : price.toString().slice(0, 3) + ' ' + price.toString().slice(3)

  const getDuration = (time: number) => {
    const h = Math.floor(time / 60)
    let m: string | number = time - 60 * h
    m = m.toString().length === 1 ? '0' + m : m
    return `${h}ч ${m}м`
  }

  const getTime = (date: string, duration: number) => {
    const startDate = new Date(date)

    const firstTime: string =
      (startDate.getHours().toString().length === 1 ? '0' + startDate.getHours() : startDate.getHours()).toString() +
      ':' +
      (startDate.getMinutes().toString().length === 1 ? '0' + startDate.getMinutes() : startDate.getMinutes())

    const endDate = new Date(Date.parse(startDate.toString()) + duration * 60 * 1000)

    const secondTime: string =
      (endDate.getHours().toString().length === 1 ? '0' + endDate.getHours() : endDate.getHours()).toString() +
      ':' +
      (endDate.getMinutes().toString().length === 1 ? '0' + endDate.getMinutes() : endDate.getMinutes())
    return `${firstTime} – ${secondTime}`
  }

  return (
    <li className="ticket-card">
      <div className="ticket-wrapper">
        <div className="ticket__header">
          <span>{getPrice(data.price)} Р</span>
          <img src={logoS7} alt="" />
        </div>
        <div className="ticket__info">
          <div className="ticket__info-elem">
            <p className="ticket__info-elem-top">
              {partTop.origin} - {partTop.destination}
            </p>
            <p className="ticket__info-elem-bottom">{getTime(partTop.date, partTop.duration)}</p>
          </div>
          <div className="ticket__info-elem">
            <p className="ticket__info-elem-top">В ПУТИ</p>
            <p className="ticket__info-elem-bottom">{getDuration(partTop.duration)}</p>
          </div>
          <div className="ticket__info-elem">
            <p className="ticket__info-elem-top">{partTop.stops.length} пересадки</p>
            <p className="ticket__info-elem-bottom">{partTop.stops.length ? partTop.stops.join(', ') : '—'}</p>
          </div>
          <div className="ticket__info-elem">
            <p className="ticket__info-elem-top">
              {partBottom.origin} - {partBottom.destination}
            </p>
            <p className="ticket__info-elem-bottom">{getTime(partBottom.date, partBottom.duration)}</p>
          </div>
          <div className="ticket__info-elem">
            <p className="ticket__info-elem-top">В ПУТИ</p>
            <p className="ticket__info-elem-bottom">{getDuration(partBottom.duration)}</p>
          </div>
          <div className="ticket__info-elem">
            <p className="ticket__info-elem-top">{partBottom.stops.length} пересадки</p>
            <p className="ticket__info-elem-bottom">{partBottom.stops.length ? partBottom.stops.join(', ') : '—'}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
