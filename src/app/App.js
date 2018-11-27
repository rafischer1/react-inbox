import React, { Component } from 'react'
import Toolbar from './Toolbar/Toolbar'
import Messages from './Messages/Messages'
import Compose from './Compose/Compose'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  composeMessageCallback = async (post) => {
    console.log("in app.js compose f(X):", post.subject, post.body)
    let body = {
      subject: post.subject,
      body: post.body
    }
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, 
    })
    console.log("response to POST:", response)
    this.getMessageState()
  }

  starCallback = async (id) => {
    // console.log('in app.js starred:', id)
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
  }

  readCallback = async (id) => {
    // console.log('in app.js starred:', id)
    let body = {
      messageIds: [id],
      command: "read"
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
      <Messages messages={this.state.messages} starCallback={this.starCallback} readCallback={this.readCallback}/>
      <Compose composeMessageCallback={this.composeMessageCallback} />
      </div>
    )
  }
}