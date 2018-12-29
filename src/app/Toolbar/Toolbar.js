import React from 'react'

export default class Toolbar extends React.Component {

  openCompose = (ev) => this.props.openComposeCallback()
  deleteAction = (ev) => {
    this.props.messages.map((message) => {
      if (message.selected === true) {
        this.props.deleteMessagesCallback(message.id);
      }
    })
    
  }
  markAsRead = (ev) => this.props.allReadCallback()
  markAsUnread = (ev) => this.props.allUnreadCallback()
  selectAllAction = () => this.props.selectAllCallback()
  
  applyLabelSelect = (ev) => {
    let label = ev.target.value
    console.log("apply label select cmpt:", label)
    ev.target.selectedIndex = 0
    this.props.applyLabelCallback(label, ev.target.selectedIndex)
  }

  removeLabelSelect = (ev) => {
    let label = ev.target.value
    this.props.removeLabelCallback(label)
  }

/****************************
 * 
 * Everything above this 
 * line is working just fine 🙈
 * 
 ****************************/

  render() {
    let selectedCount = this.props.messages.filter(message => message.selected).length
    let allOrNone
    switch (selectedCount) {
      case 0:
        allOrNone = "fa-square-o"
        break
      case (this.props.messages.length):
        allOrNone = "fa-check-square-o"
        break
      default:
        allOrNone = "fa-minus-square-o"
    }
  
    
    let totalUnread = this.props.messages.filter(message => !message.read).length
  
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{totalUnread}</span>
            unread {totalUnread === 1 ? "message" : "messages"} 
           </p>

          <button type="button" className="btn btn-danger" onClick={this.openCompose}>
            <i className="fa fa-plus" ></i>
          </button>
          
          <button className={`btn btn-default`} onClick={this.selectAllAction}>
            <i className={`fa ${allOrNone}`}></i>
          </button>

          <button disabled={selectedCount === 0} className="btn btn-default" onClick={this.markAsRead}>
            Mark As Read
          </button>

          <button disabled={selectedCount === 0} className="btn btn-default" onClick={this.markAsUnread}>
            Mark As Unread
          </button>

          <select disabled={selectedCount === 0} className="form-control label-select" onChange={this.applyLabelSelect}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select disabled={selectedCount === 0} className="form-control label-select" onChange={this.removeLabelSelect}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button disabled={selectedCount === 0} className="btn btn-default" onClick={this.deleteAction}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

