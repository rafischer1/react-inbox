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

  async applyLabelCallback(label) {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "addLabel",
      "label": label
    })

    const messages = this.state.messages.map(message => (
      message.selected && !message.labels.includes(label) ?
        { ...message, labels: [...message.labels, label].sort() } :
        message
    ))
    this.setState({ messages })
  }

  async removeLabelCallback(label) {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "removeLabel",
      "label": label
    })

    const messages = this.state.messages.map(message => {
      const idx = message.labels.indexOf(label)
      if (message.selected && idx > -1) {
        return {
          ...message,
          labels: [
            ...message.labels.slice(0, idx),
            ...message.labels.slice(idx + 1)
          ]
        }
      }
      return message
    })
    this.setState({ messages })
  }

  updateMessages = async (body) => {
    body = JSON.stringify(body)
    console.log('update messages:', body)
    return await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body
    })
  }

  async deleteMessagesCallback() {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "delete"
    })
    const messages = this.state.messages.filter(message => !message.selected)
    this.setState({ messages })
  }

  toggleFunc = (message, property) => {
    const idx = this.state.messages.indexOf(message)
    this.setState({
      messages: [
        ...this.state.messages.slice(0, idx),
        { ...message, [property]: !message[property] },
        ...this.state.messages.slice(idx + 1),
      ]
    })
  }

  selectCallback = (message) => {
    this.toggleFunc(message, 'selected')
  }
  
  selectAllCallback = () => {
    const selectedMessages = this.state.messages.filter(message => message.selected)
    const selected = selectedMessages.length !== this.state.messages.length
    this.setState({
      messages: this.state.messages.map(message => (
        message.selected !== selected ? { ...message, selected } : message
      ))
    })
  }

  allReadCallback = async () => {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "read",
      "read": true
    })

    this.setState({
      messages: this.state.messages.map(message => (
        message.selected ? { ...message, read: true } : message
      ))
    })
  }

  allUnreadCallback = async () => {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "read",
      "read": false
    })

    this.setState({
      messages: this.state.messages.map(message => (
        message.selected ? { ...message, read: false } : message
      ))
    })
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
        removeLabelCallback={this.removeLabelCallback}
        deleteMessagesCallback={this.deleteMessagesCallback.bind(this)}
        selectAllCallback={this.selectAllCallback}
        allReadCallback={this.allReadCallback}
        allUnreadCallback={this.allUnreadCallback}

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