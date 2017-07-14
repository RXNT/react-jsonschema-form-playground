import React, { Component } from "react";
// Import a few CodeMirror themes; these are used to match alternative
import Codemirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
// bootstrap ones.
import "codemirror/lib/codemirror.css";
import Error from "./Error";

import { shouldRender } from "../utils";

// Patching CodeMirror#componentWillReceiveProps so it's executed synchronously
// Ref https://github.com/mozilla-services/react-jsonschema-form/issues/174
Codemirror.prototype.componentWillReceiveProps = function(nextProps) {
  if (
    this.codeMirror &&
    nextProps.value !== undefined &&
    this.codeMirror.getValue() != nextProps.value
  ) {
    this.codeMirror.setValue(nextProps.value);
  }
  if (typeof nextProps.options === "object") {
    for (var optionName in nextProps.options) {
      if (nextProps.options.hasOwnProperty(optionName)) {
        this.codeMirror.setOption(optionName, nextProps.options[optionName]);
      }
    }
  }
};

const fromJson = json => JSON.parse(json);

const jsonOptions = {
  theme: "default",
  height: "auto",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2,
};

export default class JsonEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: true, code: props.code };
  }

  componentWillReceiveProps(props) {
    this.setState({ valid: true, code: props.code });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onCodeChange = code => {
    this.setState({ valid: true, code });
    setImmediate(() => {
      try {
        this.props.onChange(fromJson(this.state.code));
      } catch (error) {
        this.setState({ valid: false, code, error });
        this.props.onError(error);
      }
    });
  };

  render() {
    const { title } = this.props;
    const icon = this.state.valid ? "ok" : "remove";
    const cls = this.state.valid ? "valid" : "invalid";
    return (
      <div>
        {!this.state.valid && <Error error={this.state.error} />}
        <div className="panel panel-default">
          <div className="panel-heading">
            <span className={`${cls} glyphicon glyphicon-${icon}`} />
            {" " + title}
          </div>
          <Codemirror
            value={this.state.code}
            onChange={this.onCodeChange}
            options={jsonOptions}
          />
        </div>
      </div>
    );
  }
}
