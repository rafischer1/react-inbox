import React from 'react'
import Labels from '../Labels/Labels'

const MessageList = ({messages, starCallback}) => {

  const starFunction = (ev) => {
    console.log('star func', ev.target)
    starCallback(ev.target.id)
  }
  
  return messages.map((el, idx) => {

  let read = el.read ? "read" : "unread"
  let selected = el.selected ? "selected" : "unselected"
  let starred = el.starred ? "fa-star" : "fa-star-o"

  return (
   <div className={`row message ${read} ${selected}`} key={idx}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={el.selected} />
          </div>
          <div className="col-xs-2">
            <i id={el.id} className={`star fa ${starred}`} onClick={starFunction}>&nbsp;&nbsp;&nbsp;&nbsp;</i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="/" target="_blank">
          <div >
            &nbsp;&nbsp;
           <Labels labels={el.labels}/>
            &nbsp;&nbsp;
            {el.subject}
          </div>
        </a>
      </div>
    </div>
  )
})
 
}

export default MessageList