import React, { Component } from "react";
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
      <div>
        <div className="container-fluid">
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
