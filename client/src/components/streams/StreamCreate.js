import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import classNames from "classnames";

import { createStream } from "../../actions";

class StreamCreate extends Component {
  // or  -- renderInput(formProps ) {
  renderInput = formProps => {
    const { input, label, meta } = formProps;
    let fieldclass = classNames("field", { error: meta.touched && meta.error });

    return (
      <div className={fieldclass}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError = meta => {
    const { error, touched } = meta;

    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

// wrap the StreamCreate component with reduxForm
const formWrapped = reduxForm({
  form: "streamCreate",
  validate: validate
})(StreamCreate);

// connect the states and actions to the form wrapped component(this)
export default connect(
  null,
  { createStream }
)(formWrapped);
