import React from 'react'

const MessageList = ({messages}) => {
  
  return messages.map((el, idx) => {
  let read = el.read ? "read" : "unread"
  let selected = el.selected ? "selected" : "unselected"
  
  return (
   <div className={`row message ${read} ${selected}`} key={idx}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o">&nbsp;&nbsp;&nbsp;&nbsp;</i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="/" target="_blank">
          <div >
            &nbsp;&nbsp;&nbsp;&nbsp;
            {el.subject}
          </div>
        </a>
      </div>
    </div>
  )
})
 
}

export default MessageList