import React, { Component } from "react";

export default class Error extends Component {
  render() {
    let { error } = this.props;
    return (
      <div className="row">
        {error
          ? <h2>
              {error.message}
            </h2>
          : <h2 />}
      </div>
    );
  }
}
