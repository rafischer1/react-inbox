import React from 'react'
import MessageList from '../MessageList/MessageList'

export default class Message extends React.Component {
  render() {
    let idx = this.props.messages.id
    return (
      <MessageList key={idx} messages={this.props.messages} starCallback={this.props.starCallback} readCallback={this.props.readCallback} selectCallback={this.props.selectCallback}/> 
    )
  }
}