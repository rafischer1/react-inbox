import React, { Component } from 'react';
import Toolbar from './Toolbar/Toolbar'
import Message from './Message/Message'
import Compose from './Compose/Compose'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
      <Toolbar />
      <Message />
      <Compose />
      </div>
    );
  }
}


