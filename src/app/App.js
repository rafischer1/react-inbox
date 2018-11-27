import React, { Component } from 'react';
import Toolbar from './Toolbar/Toolbar'
import Messages from './Messages/Messages'
import Compose from './Compose/Compose'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  async composeMessageCallback(post) {
    console.log("in app.js compose f(X):", post.subject, post.body)
    let body = {
      subject: post.subject,
      read: false,
      starred: false,
      labels: [],
      body: post.body
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(body),
    })
    console.log("response to POST:", response)
  } 

  starCallback = async (id) => {
    console.log('in app.js starred:', id)
    let body = {
      messageIds: [id],
      command: "star"
    }

    // send starred to the database and update that message 
    const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    console.log(response)
    this.getMessageState()
    return true
  }

  getMessageState = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`)
    if (response.status === 200) {
      let resJson = await response.json()
      // console.log('resJson', response)
      this.setState({
        ...this.state,
        messages: resJson
      })
    } else {
      console.log('I broke on the GET fetch', response)
      throw new Error('Uh oh! I broke on the GET request')
    }
  }

  async componentDidMount() {
    this.getMessageState()
  }

  render() {
    return (
      <div className="App">
      <Toolbar />
      <Messages messages={this.state.messages} starCallback={this.starCallback}/>
      <Compose composeMessageCallback={this.composeMessageCallback} />
      </div>
    );
  }
}


