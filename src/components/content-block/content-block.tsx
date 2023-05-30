import React from 'react'

import './content-block.scss'

import { Filter } from '../filter/filter'
import { Tabs } from '../tabs/tabs'
import { TicketsList } from '../tickets-list/tickets-list'

export function ContentBlock() {
  return (
    <div className="content-block">
      <Filter />
      <div className="tabs-tickets-wrapper">
        <Tabs />
        <TicketsList />
      </div>
    </div>
  )
}
