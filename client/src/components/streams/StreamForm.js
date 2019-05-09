import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import classNames from "classnames";

class StreamForm extends Component {
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
    this.props.onSubmit(formValues);
  };

  onClickCancel = () => {
    this.props.onClickCancel();
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
        <button type="submit" className="ui button primary">
          Submit
        </button>
        <button
          type="button"
          className="ui button"
          onClick={this.onClickCancel}
        >
          Cancel
        </button>
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

// wrap the StreamForm component with reduxForm
export default reduxForm({
  form: "streamForm",
  validate: validate
})(StreamForm);
