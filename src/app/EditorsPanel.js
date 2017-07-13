import React, { Component } from "react";
import { JsonEditor } from "./Editor";
import PropTypes from "prop-types";

const toJson = val => JSON.stringify(val, null, 2);

export default class JsonEditors extends Component {
  setActive = active => this.setState({ active });

  render() {
    let { editors } = this.props;
    let activeTitle =
      this.state && this.state.active ? this.state.active : this.props.active;
    let activeEditor = editors.find(editor => editor.title === activeTitle);
    let { title, source, onChange, onError } = activeEditor;

    return (
      <div className="col-md-6">
        <ul className="nav nav-pills">
          {editors.map(({ title }) =>
            <li
              key={title}
              className={activeTitle === title ? "active" : ""}
              onClick={() => this.setActive(title)}>
              <a>
                {title}
              </a>
            </li>
          )}
        </ul>
        <br />
        <JsonEditor
          title={title}
          code={toJson(source)}
          onChange={onChange}
          onError={onError}
        />
      </div>
    );
  }
}

JsonEditors.propTypes = {
  active: PropTypes.string.isRequired,
  editors: PropTypes.array.isRequired,
};
