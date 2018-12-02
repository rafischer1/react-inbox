import React from 'react'
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'
import App from './App'
import Messages from './Messages/Messages'
import MessageList from './MessageList/MessageList'
import Toolbar from './Toolbar/Toolbar'

const div = document.createElement('div')
// const renderer = new ShallowRenderer()
// renderer.render(<MessageList {...props}/>)
// const result = renderer.getRenderOutput()

// expect(result.type).toBe('div');
// expect(result.props.children).toEqual([
//   <div></div>
// ]);

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

// describe("rendered `MessageList`", () => {
//   it("recieves so many props!", () => {
//     let messages;
//     expect(Object.keys(messages.props()).length).toBeGreaterThan(8);
//   });
// });