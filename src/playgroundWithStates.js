import React, { Component } from "react";
import Selector from "./Selector";

export function playgroundWithStates(FormComponent, states = {}) {
  class ResultForm extends Component {
    constructor(props) {
      super(props);
      this.state = states[Object.keys(states)[0]];
    }

    load = conf => {
      this.setState(conf);
    };

    render() {
      let conf = Object.assign({}, this.props, this.state);
      return (
        <div>
          <Selector
            states={states}
            current={Object.keys(states)[0]}
            onSelected={this.load}
          />
          <FormComponent {...conf} />
        </div>
      );
    }
  }

  return ResultForm;
}
