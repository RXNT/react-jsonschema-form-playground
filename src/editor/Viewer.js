import React, { Component } from "react";
// Import a few CodeMirror themes; these are used to match alternative
import Codemirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
// bootstrap ones.
import "codemirror/lib/codemirror.css";

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

const viewOptions = {
  theme: "default",
  height: "auto",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  lineNumbers: false,
  lineWrapping: true,
  indentWithTabs: false,
  readOnly: true,
  tabSize: 2,
};

export default class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = { code: props.code };
  }

  componentWillReceiveProps(props) {
    this.setState({ code: props.code });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  render() {
    const { title } = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {title}
        </div>
        <Codemirror value={this.state.code} options={viewOptions} />
      </div>
    );
  }
}
