import React from 'react'
import Labels from '../Labels/Labels'
import Body from '../Body/Body'


const MessageList = ({ messages, starCallback, selectCallback}) => {
  let body

  const starFunction = (ev) => {
    let message = messages.filter(message => message.id === +(ev.target.id))
    console.log("star funct:", message, ev.target.id)
    return starCallback(message)
  }

  
  return messages.map((el, idx) => {

  const toggleSelect = (ev) => {
    let message = messages.filter(message => message.id === +(ev.target.id))
    selectCallback(message)}
    
  const messageRead = (ev) => {
      ev.preventDefault()
      console.log("hi", el.body)
      body = el.body
      return (
        el
      )
  }

  const read = el.read ? "read" : "unread"
  const selected = el.selected ? "selected" : "unselected"
  const starred = el.starred ? "fa-star" : "fa-star-o"
 

  return (
   <div>
    <div className={`row message ${read} ${selected}`} key={idx} >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input el={el} id={el.id} message={el} type="checkbox" checked={!!el.selected} onChange={toggleSelect} />
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
      <br />
      
  
    </div>
    {/* <Body key={el} body={el.body} /> */}
    </div>

  )
}) 
}

export default MessageList
