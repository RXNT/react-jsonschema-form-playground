import React, { Component } from "react";
import applyRules from "react-jsonschema-form-conditionals";
import PredicatesRuleEngine from "react-jsonschema-form-conditionals/dist/engine/SimplifiedRuleEngineFactory";
// import CacheControlRulesEngine from "react-jsonschema-form-conditionals/dist/engine/CacheControlEngineFactory";
import Form from "react-jsonschema-form";
import Error from "./Error";
import EditorsPanel from "./EditorsPanel";
import Selector from "./Selector";
import samples from "./samples";

let FormWithConditionals = applyRules(Form);

const liveValidateSchema = { type: "boolean", title: "Live validation" };

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
  onError = error => this.setState({ error });
  onExtraActionsChange = extraActions => this.setState({ extraActions });

  setLiveValidate = ({ formData }) => this.setState({ liveValidate: formData });

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
      liveValidate,
      // conf,
      error,
    } = this.state;

    let Header = (
      <div className="page-header">
        <h1>react-jsonschema-form</h1>
        <div className="row">
          <div className="col-sm-8">
            <Selector onSelected={this.load} />
          </div>
          <div className="col-sm-2">
            <Form
              schema={liveValidateSchema}
              formData={liveValidate}
              onChange={this.setLiveValidate}>
              <div />
            </Form>
          </div>
        </div>
      </div>
    );

    let CurrentViews = (
      <div className="col-md-6">
        <FormWithConditionals
          onSchemaConfChange={this.onSchemaConfChange}
          onChange={this.onFormDataChange}
          rules={rules}
          rulesEngine={PredicatesRuleEngine}
          extraActions={extraActions}
          liveValidate={liveValidate}
          safeRenderCompletion={true}
          noHtml5Validate={true}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}>
          <div />
        </FormWithConditionals>
      </div>
      //   <div className="col-md-3">
      //     <Viewer title="Conditionals schema" code={toJson(conf.schema)} />
      //   </div>
      //   <div className="col-md-3">
      //     <Viewer title="Conditionals uiSchema" code={toJson(conf.uiSchema)} />
      //   </div>
      // </div>
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
    ];

    return (
      <div className="container-fluid">
        {Header}
        <Error error={error} />
        {CurrentViews}
        <EditorsPanel active={editors[0].title} editors={editors} />
      </div>
    );
  }
}
