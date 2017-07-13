import React, { Component } from "react";
import applyRules from "react-jsonschema-form-conditionals";
import PredicatesRuleEngine from "react-jsonschema-form-conditionals/dist/engine/SimplifiedRuleEngineFactory";
// import CacheControlRulesEngine from "react-jsonschema-form-conditionals/dist/engine/CacheControlEngineFactory";
import Form from "react-jsonschema-form";
import Error from "./Error";
import EditorsPanel from "./EditorsPanel";
import Header from "./Header";
import samples from "./samples";

let FormWithConditionals = applyRules(Form);

export class App extends Component {
  constructor(props) {
    super(props);
    // initialize state with Simple data sample
    const { schema, uiSchema, formData, rules, extraActions } = samples.Simple;
    this.state = {
      schema,
      uiSchema,
      formData,
      extraActions,
      rules,
      conf: { schema, uiSchema },
      liveValidate: false,
    };
  }

  onRulesEdited = rules => this.setState({ rules });
  onSchemaEdited = schema => this.setState({ schema });
  onUISchemaEdited = uiSchema => this.setState({ uiSchema });
  onFormDataEdited = formData => this.setState({ formData });

  onFormDataChange = ({ formData }) => this.setState({ formData });
  onSchemaConfChange = conf => this.setState({ conf });

  onUpdateMeta = formParams => this.setState({ formParams });
  onError = error => this.setState({ error });

  onExtraActionsChange = extraActions => this.setState({ extraActions });

  load = data => {
    this.setState({ form: false }, _ => this.setState({ ...data, form: true }));
  };

  render() {
    const {
      schema,
      uiSchema,
      formData,
      rules,
      extraActions,
      formParams,
      conf,
      error,
    } = this.state;

    let CurrentViews = (
      <div className="col-md-6">
        <FormWithConditionals
          onSchemaConfChange={this.onSchemaConfChange}
          onChange={this.onFormDataChange}
          rules={rules}
          rulesEngine={PredicatesRuleEngine}
          extraActions={extraActions}
          {...formParams}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
        />
      </div>
    );
    let onError = this.onError;

    let editors = [
      {
        type: "json",
        title: "JSON schema",
        source: schema,
        onChange: this.onSchemaEdited,
        onError,
      },
      {
        type: "json",
        title: "UI schema",
        source: uiSchema,
        onChange: this.onUISchemaEdited,
        onError,
      },
      {
        type: "json",
        title: "Rules",
        source: rules,
        onChange: this.onRulesEdited,
        onError,
      },
      {
        type: "json",
        title: "Form Data",
        source: formData,
        onChange: this.onFormDataEdited,
        onError,
      },
      {
        type: "viewer",
        title: "Active Schema",
        source: conf.schema,
      },
      {
        type: "viewer",
        title: "Active UI Schema",
        source: conf.uiSchema,
      },
    ];

    return (
      <div className="container-fluid">
        <Header
          load={this.load}
          onUpdateMeta={this.onUpdateMeta}
          formParams={this.state.formParams}
        />
        <Error error={error} />
        {CurrentViews}
        <EditorsPanel active={editors[0].title} editors={editors} />
      </div>
    );
  }
}
