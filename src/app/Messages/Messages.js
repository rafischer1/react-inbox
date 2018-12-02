import React from 'react'
import MessageList from '../MessageList/MessageList'

export default class Messages extends React.Component {
  idx = this.props.messages.id
  render() {
    return (
      <MessageList key={this.idx} messages={this.props.messages} starCallback={this.props.starCallback} readCallback={this.props.readCallback} selectCallback={this.props.selectCallback}/> 
    )
  }
}