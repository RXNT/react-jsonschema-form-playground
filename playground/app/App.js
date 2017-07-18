import React, { Component } from "react";
import applyRules from "react-jsonschema-form-conditionals";
import playground from "../../src/playground";
import { playgroundWithStates } from "../../src/playgroundWithStates";
import Form from "react-jsonschema-form";
import samples from "./samples";

let editors = [
  {
    type: "json",
    title: "Rules",
    prop: "rules",
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

let FormToDisplay = playgroundWithStates(
  playground(applyRules(Form), editors),
  samples
);

export default class ResultForm extends Component {
  constructor(props) {
    super(props);
  }

  onSchemaConfChange = ({ schema, uiSchema }) => {
    this.setState({ activeSchema: schema, activeUiSchema: uiSchema });
  };

  render() {
    let conf = Object.assign({}, this.props, this.state);
    return (
      <FormToDisplay onSchemaConfChange={this.onSchemaConfChange} {...conf} />
    );
  }
}
