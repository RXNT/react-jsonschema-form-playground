import React, { Component } from "react";
import { JsonEditor, Viewer } from "./Editor";
import PropTypes from "prop-types";

const toJson = val => JSON.stringify(val, null, 2);

export default class JsonEditors extends Component {
  setActive = active => this.setState({ active });

  toView = editor => {
    switch (editor.type) {
      case "viewer": {
        let { title, source } = editor;
        return <Viewer title={title} code={toJson(source)} />;
      }
      case "json": {
        let { title, source, onChange, onError } = editor;
        return (
          <JsonEditor
            title={title}
            code={toJson(source)}
            onChange={onChange}
            onError={onError}
          />
        );
      }
    }
  };

  render() {
    let { editors } = this.props;
    let activeTitle =
      this.state && this.state.active ? this.state.active : this.props.active;
    let activeEditor = editors.find(editor => editor.title === activeTitle);

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
        {this.toView(activeEditor)}
      </div>
    );
  }
}

JsonEditors.propTypes = {
  active: PropTypes.string.isRequired,
  editors: PropTypes.array.isRequired,
};
