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

  /*****************************
  The Mark all as Read and Unread 
  are good 🙊
  ********************************/
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

   /*****************************
  Compose new message 🙈
  ********************************/
  openComposeCallback = () => this.setState({ compose: !this.state.compose })
  
  composeMessageCallback = async (post) => {
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
    this.getMessageState()
  }

   /*****************************
  Delete selected messages works 🙉
  ********************************/
  async deleteMessagesCallback(message) {
    await this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "delete"
    })

    const messages = this.state.messages.filter(message => !message.selected)
    this.setState({ messages })
  }

/*****************************
  Star callback working well! 🆒
  ********************************/
  starCallback = (message) => {
    this.updateMessages({
      "messageIds": [message[0].id],
      "command": "star",
      "star": [message[0].starred]
    })
    console.log("going into toggle func", message)
    this.toggleFunc(message[0], 'starred')
  }

  /*****************************
  Apply and Remove labels are 
  not working properly
  "messages undefined"
  probably sending the wrong data up
  ********************************/
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

  /*****************************
  Select and select all are a top
  priority to get finished before 
  anything else
  ********************************/
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

 /*****************************
 Performance and update functions
 need refactoring for efficiency 
  ********************************/
  updateMessages = async (body) => {
    body = JSON.stringify(body)
    console.log('updateMessages() app.js:', body)
    return await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body
    })
  }

  toggleFunc = (message, property) => {
    const idx = this.state.messages.indexOf(message)
    console.log('toggle func:', idx, message, property)
    this.setState({
      messages: [
        ...this.state.messages.slice(0, idx),
        { ...message, [property]: !message[property] },
        ...this.state.messages.slice(idx + 1),
      ]
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

  /*****************************
  Component did mount is ☑️
  ********************************/
  async componentDidMount() {
    this.getMessageState()
  }

  /*****************************
  Render below here ⌨️
  ********************************/
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
        {this.state.compose ? <Compose 
        composeMessageCallback={this.composeMessageCallback} /> 
        : null
        }
      <Messages messages={this.state.messages} 
      starCallback={this.starCallback} 
      selectCallback={this.selectCallback.bind(this)}
      />
       
      </div>
    )
  }
}