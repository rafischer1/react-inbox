import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Messages from './Messages/Messages'
import MessageList from './MessageList/MessageList'
import Toolbar from './Toolbar/Toolbar'

const div = document.createElement('div')

describe('Rendering', () => {
  let props = {}
  props.messages = []
  it('APP renders without crashing', () => {
    ReactDOM.render(<App  />, div)
  })
  it('renders Message component', () => {
    ReactDOM.render(<Messages {...props} />, div)
  })
  it('renders MessageList component', () => {
    ReactDOM.render(<MessageList {...props} />, div)
  })
  it('renders Toolbar component', () => {
    ReactDOM.render(<Toolbar {...props} />, div)
  })
})

