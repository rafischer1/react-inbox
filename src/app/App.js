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
      `https://fischer-go-inbox.herokuapp.com/messages`,
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
      `https://fischer-go-inbox.herokuapp.com/messages/${id}`,
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
    this.toggleFunc(message[0], 'starred')
  }

  /*****************************
  * Apply and Remove labels are 
  *working but adding a lot of empty string
  works "ok"
  *******************************/
  applyLabelCallback = async (label) => {
    let newLabels = ""
    await this.updateMessages({ messageIds: this.state.messages
        .filter(message => message.selected)
        .map(message => {
          return message.id;
        }), 
        command: "addLabel", 
      label: this.state.messages
        .filter(message => message.selected)
        .map(message => {
          if (label === 'personal' && message.labels.includes("personal") === false) {
            return newLabels = message.labels + 'personal';
          }
          else if (label === 'dev' && message.labels.includes("dev") === false) {
            return newLabels = message.labels + 'dev';
          }
          else if (label === 'gschool' && message.labels.includes("gschool") === false) {
            return newLabels = message.labels + 'gschool';
          }
          return newLabels;
        })
       });

    const messages = this.state.messages.map(message =>
      message.selected && !message.labels.includes(label)
        ? { ...message, labels: message.labels + label }
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
          if (label === "personal" && message.labels.includes("personal")) {
            return removeLabels = message.labels.replace("personal", " ");
          } else if (label === 'dev' && message.labels.includes("dev")) {
            return removeLabels = message.labels.replace("dev", " ");
          } else if (label === 'gschool' && message.labels.includes("gschool")) {
            return removeLabels = message.labels.replace("gschool", " "); 
          }
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
    console.log("updateMEssages", body)
    let editBodyLabel = ''
    if (body.label === undefined) {
      editBodyLabel = ''
    } else {
      editBodyLabel = body.label[0]
    }

    body.messageIds.map(async (id) => {
      let editBody = {
        ID: id,
        Labels: editBodyLabel,
        Read: body.read
      }
      console.log('updateMessages() body:', JSON.stringify(editBody))
      return await fetch(
        `https://fischer-go-inbox.herokuapp.com/messages/${id}`,
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
    const response = await fetch(`https://fischer-go-inbox.herokuapp.com/messages`);
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