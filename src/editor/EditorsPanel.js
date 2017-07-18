import React, { Component } from "react";
import Viewer from "./Viewer";
import JSEditor from "./JSEditor";
import JsonEditor from "./JSONEditor";
import PropTypes from "prop-types";

const toJson = val => JSON.stringify(val, null, 2);

export default class EditorsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { active: this.props.editors[0].title };
  }

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
      case "js": {
        let { title, source, onChange, onError } = editor;
        return (
          <JSEditor
            title={title}
            code={source}
            onChange={onChange}
            onError={onError}
          />
        );
      }
    }
  };

  render() {
    let { editors } = this.props;
    let activeTitle = this.state.active;
    let activeEditor = editors.find(editor => editor.title === activeTitle);

    return (
      <div>
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

EditorsPanel.propTypes = {
  editors: PropTypes.array.isRequired,
};
