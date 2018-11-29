import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Messages from './Messages/Messages'

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  it('renders Message component', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Messages />, div)
  })
