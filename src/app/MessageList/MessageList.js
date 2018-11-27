import React from 'react'
import Labels from '../Labels/Labels'

const MessageList = ({messages, starCallback, readCallback}) => {

  const starFunction = (ev) => {
    console.log('star func', ev.target)
    starCallback(ev.target.id)
  }

  const readFunction = (ev) => {
    console.log('checked func', ev.target)
    readCallback(ev.target.id)
  }
  
  return messages.map((el, idx) => {
  let read = el.read ? "read" : "unread"
  let selected = el.selected ? "selected" : "unselected"
  let starred = el.starred ? "fa-star" : "fa-star-o"

  return (
   renderFunction(read, selected, idx, el, readFunction, starred, starFunction)
  )
})
 
}

const renderFunction = (read, selected, idx, el, readFunction, starred, starFunction) =>
  <div className={`row message ${read} ${selected}`} key={idx}>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input id={el.id} type="checkbox" checked={el.selected} onChange={readFunction} />
        </div>
        <div className="col-xs-2">
          <i id={el.id} className={`star fa ${starred}`} onClick={starFunction}>&nbsp;&nbsp;&nbsp;&nbsp;</i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      <a href="/" target="_blank">
        <div>
          &nbsp; &nbsp;
          <Labels labels={el.labels} />
          &nbsp; &nbsp;
          {el.subject}
        </div>
      </a>
    </div>
  </div>


export default MessageList
