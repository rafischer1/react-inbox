import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Messages from './Messages/Messages'
import Toolbar from './Toolbar/Toolbar'

const div = document.createElement('div')

describe('Rendering', () => {
  it('APP renders without crashing', () => ReactDOM.render(<App />, div))
  it('renders Message component', () => ReactDOM.render(<Messages />, div))
  it('renders Toolbar component', () => ReactDOM.render(<Toolbar />, div))
})