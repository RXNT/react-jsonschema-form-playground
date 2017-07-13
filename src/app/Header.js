import React, { Component } from "react";
import Selector from "./Selector";
import Form from "react-jsonschema-form";

const liveValidateSchema = {
  type: "object",
  properties: {
    liveValidate: { type: "boolean", title: "Live validation" },
    safeRenderCompletion: { type: "boolean", title: "Safe render completion" },
    noHtml5Validate: { type: "boolean", title: "No Html 5 Validate" },
  },
};

const liveUiSchema = {
  liveValidate: {
    classNames: "col-md-4",
  },
  safeRenderCompletion: {
    classNames: "col-md-4",
  },
  noHtml5Validate: {
    classNames: "col-md-4",
  },
};

export default class Header extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>react-jsonschema-form</h1>
        <div className="row">
          <div className="col-md-4">
            <Selector onSelected={this.props.load} />
          </div>
          <Form
            schema={liveValidateSchema}
            uiSchema={liveUiSchema}
            formData={this.props.formParams}
            onChange={({ formData }) => this.props.onUpdateMeta(formData)}>
            <div />
          </Form>
        </div>
      </div>
    );
  }
}
