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
    let response = await fetch(
      `http://localhost:3003/messages`,
      {
        method: "POST",
        body: JSON.stringify(postBody),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    console.log("POST response:", response)
    this.openComposeCallback()
    this.getMessageState()
  }

/*****************************
  * Delete selected messages works 🙉
*******************************/
  async deleteMessagesCallback(id) {
    let response = await fetch(
      `http://localhost:3003/messages/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );  
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
    await this.updateMessages({ messageIds: this.state.messages
        .filter(message => message.selected)
        .map(message => {
          return message.id;
        }), 
        command: "addLabel", 
      label: this.state.messages
        .filter(message => message.selected)
        .map(message => {
          console.log("message:", message.labels, "message.labels + label:", `${message.labels}, ${label}`);
          return `${message.labels}, ${label}`;
        })
       });

    const messages = this.state.messages.map(message =>
      message.selected && !message.labels.includes(label)
        ? { ...message, labels: `${message.labels}, ${label}` }
        : message
    );
    this.setState({ messages })
  }

 removeLabelCallback = async (label) => {
   let removeLabels = ""
    await this.updateMessages({
      messageIds: this.state.messages
        .filter(message => message.selected)
        .map(message => message.id),
      command: "removeLabel",
      label: this.state.messages
        .filter(message => message.selected)
        .map(message => {
          console.log("message.labels before:", message.labels);
          if (message.labels.includes("personal")) {
            removeLabels = message.labels.replace("personal", " ");
          }
          if (message.labels.includes("dev")) {
            console.log("message.labels dev before replace:", message.labels)
            removeLabels = message.labels.replace("dev", " ");
            console.log("message.labels dev before replace:", removeLabels);
          }
          if (message.labels.includes("gschool")) {
            removeLabels = message.labels.replace("gschool", " ");
          }
          console.log("label removed:", removeLabels)
          return removeLabels;
        })
    });

    const messages = this.state.messages.map(message => {
      const idx = message.labels.indexOf(label)
      if (message.selected && idx > -1) {
        return {
          ...message,
          labels: removeLabels
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
    console.log("updateMEssages", body.messageIds)
    body.messageIds.map(async (id) => {
      let editBody = {
        ID: id,
        Labels: `${body.label}`
      }
      console.log('updateMessages() body:', JSON.stringify(editBody))
      return await fetch(
        `http://localhost:3003/messages/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(editBody)
        }
      );
    })
    
  
  
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
    console.log("in get messages state")
    const response = await fetch(`http://localhost:3003/messages`);
    console.log("second log:", response)
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