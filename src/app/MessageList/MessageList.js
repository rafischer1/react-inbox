import React from 'react'

const MessageList = ({messages}) => {
  return messages.map((el, y) => {
  return (
    <div className="row message read">
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o"></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="/" target="_blank">
          <div key={y}>
            {el.subject}
            {/* <p>{el.body}</p> */}
          </div>
        </a>
      </div>
    </div>
   
  )
})
 
}

export default MessageList