import React from 'react'

export default class Message extends React.Component {
  render() {
    return (
      <div className="row message read">
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" />
            </div>
            <div className="col-xs-2">
              <i className="star fa fa-star-o"></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="#">
            Here is some message text that has a bunch of stuff
          </a>
        </div>
      </div>
    )
  }
}