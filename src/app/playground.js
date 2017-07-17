import React, { Component } from "react";
import EditorsPanel from "./editor/EditorsPanel";
import Header from "./Header";

let DEFAULT_EDITORS = [
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
    title: "Rules",
    prop: "rules",
  },
  {
    type: "json",
    title: "Data",
    prop: "formData",
  },
  {
    type: "viewer",
    title: "Active Schema",
    prop: "activeSchema",
  },
  {
    type: "viewer",
    title: "Active UI",
    prop: "activeUiSchema",
  },
];

export default function playground(FormComponent, editors = DEFAULT_EDITORS) {
  class App extends Component {
    constructor(props) {
      super(props);
      const { schema, uiSchema, formData, rules, extraActions } = this.props;
      this.state = {
        schema,
        uiSchema,
        formData,
        extraActions,
        rules,
        formParams: { liveValidate: false },
        conf: { schema, uiSchema },
      };
    }

    onUpdateMeta = formParams => this.setState({ formParams });
    onFormChange = ({ formData }) => this.setState({ formData });

    load = data => {
      this.setState({ form: false }, _ =>
        this.setState({ ...data, form: true })
      );
    };

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
          <div className="col-md-4">
            <FormComponent onChange={this.onFormChange} {...conf} />
          </div>
          <div className="col-md-8">
            <EditorsPanel editors={editors} />
          </div>
        </div>
      );
    }
  }

  return App;
}
