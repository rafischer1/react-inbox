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
    console.log("state:", this.state.messages)
    
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
  *******************************/
  openComposeCallback = () => this.setState({ compose: !this.state.compose })
  
  composeMessageCallback = async (post) => {
    let postBody = {
      subject: post.subject,
      body: post.body
    }
    let response = await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, 
    })
    let resJson = await response.json()
    console.log("post route response:", resJson)
    this.openComposeCallback()
    this.getMessageState()
  }

/*****************************
  * Delete selected messages works 🙉
*******************************/
  async deleteMessagesCallback(id) {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/messages/${id}`, {
      "method": "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, 
    })  
    if (response.status === 200 ) {
      this.getMessageState();
    }
}

/*****************************
  * Star callback working well! 🆒
*****************************/
  starCallback = (message) => {
    this.updateMessages({
      "messageIds": [message[0].id],
      "command": "star",
      "star": [message[0].starred]
    })
    this.toggleFunc(message[0], 'starred')
  }

  /*****************************
  * Apply and Remove labels are 
  * not working properly
  * "messages undefined"
  * probably sending the wrong data up
  *******************************/
  applyLabelCallback = async (label) => {
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

 removeLabelCallback = async (label) => {
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
  Select and select all 
  ********************************/
  selectCallback = (message) => this.toggleFunc(message[0], 'selected')

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
    // body = JSON.stringify(body)
    // console.log('updateMessages() app.js:', body)
    // return await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
    //   method: "PUT",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: body
    // })
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

  getMessageState = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`)
   
    if (response.status === 200) {
      let resJson = await response.json()
      console.log("get message in app.js:", resJson)
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
        : false
        }
      <Messages messages={this.state.messages} 
      starCallback={this.starCallback} 
      selectCallback={this.selectCallback.bind(this)}
      />
      </div>
    )
  }
}