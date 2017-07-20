import React, { Component } from "react";
import applyRules from "react-jsonschema-form-conditionals";
import playground, { playgroundWithStates } from "../../src";
import Form from "react-jsonschema-form";

import withManager, { StaticConfigResolver, LocalStorageFormManager, InstantUpdateStrategy, IntervalUpdateStrategy } from "react-jsonschema-form-manager";

import samples from "./samples";

class CustomLoadingScreen extends Component {
  render() {
    return (
      <div className="container">
        <h1>Look at me I'm loading</h1>
      </div>
    );
  }
}

class CustomErrorScreen extends Component {
  render() {
    return (
      <div className="container">
        <h4>Houston, we have a problem</h4>
        <h2>
          {this.props.error.message}
        </h2>
      </div>
    );
  }
}

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
  withManager(playground(applyRules(Form), editors), CustomLoadingScreen, CustomErrorScreen),
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
