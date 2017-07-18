import React, { Component } from "react";

export default class Error extends Component {
  render() {
    let { error } = this.props;
    if (error && error.message) {
      return (
        <div className="panel panel-danger errors">
          <div className="panel-heading">
            <h3 className="panel-title">Errors</h3>
          </div>
          <ul className="list-group">
            <li className="list-group-item text-danger">
              {error.message}
            </li>
          </ul>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
