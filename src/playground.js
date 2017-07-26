import React, { Component } from "react";
import EditorsPanel from "./editor/EditorsPanel";
import Header from "./Header";
import deepEqual from "deep-equal";

export const DEFAULT_EDITORS = [
  {
    type: "json",
    title: "Schema",
    prop: "schema",
  },
  {
    type: "json",
    title: "UI",
    prop: "uiSchema",
  },
  {
    type: "json",
    title: "Data",
    prop: "formData",
  },
];

export default function playground(FormComponent, extraEditors = []) {
  const editors = DEFAULT_EDITORS.concat(extraEditors);
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = this.toState(this.props);
    }

    onUpdateMeta = formParams => this.setState({ formParams });
    onFormChange = ({ formData }) => this.setState({ formData });

    toState = props => {
      return editors.reduce(
        (agg, { prop }) => Object.assign({}, agg, { [prop]: props[prop] }),
        {}
      );
    };

    componentWillReceiveProps(nextProps) {
      if (!deepEqual(this.props, nextProps)) {
        this.setState(this.toState(nextProps));
      }
    }

    render() {
      editors.map(editor => {
        editor.source = this.state[editor.prop]
          ? this.state[editor.prop]
          : this.props[editor.prop];
        editor.onChange = data => {
          this.setState({ [editor.prop]: data });
        };
      });

      let conf = Object.assign(
        {},
        this.props,
        this.state,
        this.state.formParams
      );

      return (
        <div className="container-fluid">
          <Header
            load={this.load}
            onUpdateMeta={this.onUpdateMeta}
            formParams={this.state.formParams}
          />
          <div className="col-md-6">
            <FormComponent onChange={this.onFormChange} {...conf} />
          </div>
          <div className="col-md-6">
            <EditorsPanel editors={editors} />
          </div>
        </div>
      );
    }
  }

  return App;
}
