import React, { Component } from 'react';
import Toolbar from './Toolbar/Toolbar'
import Message from './Message/Message'
import MessageList from './MessageList/MessageList'
import Compose from './Compose/Compose'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  render() {
    return (
      <div className="App">
      <Toolbar />
      <Message />
      <MessageList messages={this.messages}/>
      <Compose />
      </div>
    );
  }
}


