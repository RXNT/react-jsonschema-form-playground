import React, { Component } from "react";
import { shouldRender } from "./utils";
import PropTypes from "prop-types";

export default class Selector extends Component {
  constructor(props) {
    super(props);
    let current = this.props.current;
    this.state = { current };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onLabelClick = label => {
    return event => {
      event.preventDefault();
      this.setState({ current: label });
      setImmediate(() => this.props.onSelected(this.props.states[label]));
    };
  };

  render() {
    return (
      <ul className="nav nav-pills">
        {Object.keys(this.props.states).map((label, i) => {
          return (
            <li
              key={i}
              role="presentation"
              className={this.state.current === label ? "active" : ""}>
              <a href="#" onClick={this.onLabelClick(label)}>
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

Selector.propTypes = {
  states: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
};
