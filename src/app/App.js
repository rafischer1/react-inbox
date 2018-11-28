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

  applyLabelCallback = async (label) => {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "addLabel",
      "label": label
    })
  }

  removeLabelCallback = async (label) => {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "addLabel",
      "label": label
    })
  }

  updateMessages = async (body) => {
    let putBody = JSON.stringify(body)
    return await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: putBody
    })
  }

  async deleteMessagesCallback(message) {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "delete"
    })

    const messages = this.state.messages.filter(message => !message.selected)
    this.setState({ messages })
  }

  toggleFunc = (message, property) => {
    const index = this.state.messages.indexOf(message)
    this.setState({
      messages: [
        ...this.state.messages.slice(0, index),
        { ...message, [property]: !message[property] },
        ...this.state.messages.slice(index + 1),
      ]
    })
  }

 selectCallback(message) {
    this.toggleFunc(message, 'selected')
  }

  toggleSelectAll() {
    const selectedMessages = this.state.messages.filter(message => message.selected)
    const selected = selectedMessages.length !== this.state.messages.length
    this.setState({
      messages: this.state.messages.map(message => (
        message.selected !== selected ? { ...message, selected } : message
      ))
    })
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

  openComposeCallback = () => {
    this.setState({ compose: !this.state.compose })
  }


  render() {
    return (
      <div className="App">
        <Toolbar 
        messages={this.state.messages} 
        openComposeCallback={this.openComposeCallback.bind(this)}
        applyLabelCallback={this.applyLabelCallback}
        deleteMessagesCallback={this.deleteMessagesCallback.bind(this)}

        />
        {this.state.compose ?
          <Compose composeMessageCallback={this.composeMessageCallback} /> :
          null
        }
      <Messages messages={this.state.messages} 
      starCallback={this.starCallback} 
      selectCallback={this.selectCallback.bind(this)}
      />
       
      </div>
    )
  }
}