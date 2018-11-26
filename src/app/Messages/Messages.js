import React from 'react'
import MessageList from '../MessageList/MessageList'

export default class Message extends React.Component {
  render() {
    return (
      <MessageList messages={this.props.messages} /> 
    )
  }
}