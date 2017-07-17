import React, { Component } from "react";
import applyRules from "react-jsonschema-form-conditionals";
import playground from "./playground";
import SimplifiedRuleEngineFactory from "react-jsonschema-form-conditionals/lib/engine/SimplifiedRuleEngineFactory";
import Form from "react-jsonschema-form";

import samples from "./samples";

let FormToDisplay = playground(applyRules(Form));

export default class ResultForm extends Component {
  constructor(props) {
    super(props);
    const { schema, uiSchema } = samples.Simple;
    this.state = samples.Simple;
    this.state = Object.assign({}, samples.Simple, {
      activeSchema: schema,
      activeUiSchema: uiSchema,
    });
  }

  onSchemaConfChange = ({ schema, uiSchema }) => {
    console.log(`Schema configuration change ${JSON.stringify(schema)}`);
    this.setState({ activeSchema: schema, activeUiSchema: uiSchema });
  };

  render() {
    return (
      <FormToDisplay
        onSchemaConfChange={this.onSchemaConfChange}
        {...this.state}
        rulesEngine={SimplifiedRuleEngineFactory}
      />
    );
  }
}
