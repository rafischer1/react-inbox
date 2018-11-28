import React from 'react'


export default class Toolbar extends React.Component {

  openCompose = (ev) => {
    ev.preventDefault()
    this.props.openComposeCallback()
  }
  
  
  selectAllAction = (ev) => {
    console.log("select all action:", ev.target)
    this.props.selectAllCallback()
  }

  markAsRead = (ev) => {
    console.log("read:", ev.target)
  }

  markAsUnread = (ev) => {
    console.log("unread:", ev.target)
  }

  applyLabelSelect = (ev) => {
    let label = ev.target.value
    console.log("apply label select:", label)
    this.props.applyLabelCallback(label)
  }

  removeLabelSelect = (ev) => {
    let label = ev.target.value
    console.log("remove label select:", label)
  }

  deleteAction = (ev) => {
    ev.preventDefault()
    console.log("delete action select:", ev.target)
  }

  totalUnread = this.props.messages.filter(message => !message.read).length
  selectedCount = this.props.messages.filter(message => message.selected).length


  render() {
    let allOrNone = "fa-check-o" ? "fa-check-square-o" : "fa-square-o"
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.totalUnread}</span>
            unread messages
           </p>

          <button type="button" className="btn btn-danger" onClick={this.openCompose}>
            <i className="fa fa-plus"></i>
          </button>
          
          <button className="btn btn-default" onClick={this.selectAllAction}>
            <i className={`fa ${allOrNone}`}></i>
          </button>

          <button className="btn btn-default" onClick={this.markAsRead}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.markAsUnread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={this.applyLabelSelect}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.removeLabelSelect}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.deleteAction}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

