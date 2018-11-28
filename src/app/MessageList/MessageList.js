import React from 'react'
import Labels from '../Labels/Labels'

const MessageList = ({ messages, starCallback, selectCallback}) => {
  let body

  const toggleSelect = (ev) => {
    ev.preventDefault()
    selectCallback(ev.target.id)
  }
  
  const starFunction = (ev) => {
    ev.stopPropagation()
    console.log('star func', ev.target)
    starCallback(ev.target.id)
  }

  const readFunction = (ev) => {
    console.log('checked func', ev.target)
    // readCallback(ev.target.id)
  }
  
  return messages.map((el, idx) => {
    const messageRead = (ev) => {
      ev.preventDefault()
      console.log(el.body)
      body = el.body
      return (
        body
      )
    }

  let read = el.read ? "read" : "unread"
  let selected = el.selected ? "selected" : "unselected"
  let starred = el.starred ? "fa-star" : "fa-star-o"
  
  console.log("read:", el.read)

  return (
    renderFunction(read, selected, idx, el, readFunction, starred, starFunction, messageRead, body, toggleSelect)
  )
})
 
}

const renderFunction = (read, selected, idx, el, readFunction, starred, starFunction, messageRead, body, toggleSelect) =>
  <div className={`row message ${read} ${selected}`} key={idx} >
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input id={el.id} type="checkbox" checked={!!el.selected} onChange={toggleSelect} />
        </div>
        <div className="col-xs-2">
          <i id={el.id} className={`star fa ${starred}`} onClick={starFunction}></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      <a href="#!" onClick={messageRead}>
        <div>
          <Labels labels={el.labels} />
          {el.subject}
        </div>
      </a>
      <div>{body}</div>
    </div>
  </div>


export default MessageList
