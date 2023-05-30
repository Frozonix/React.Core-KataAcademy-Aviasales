import React from 'react'

import './app.scss'
import logo from '../../img/Logo.svg'
import { ContentBlock } from '../content-block/content-block'

function App() {
  return (
    <div className="App">
      <div className="logo-wrapper">
        <div>
          <img src={logo} alt="" />
        </div>
      </div>
      <ContentBlock />
    </div>
  )
}

export default App
