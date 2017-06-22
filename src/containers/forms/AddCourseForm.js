import React, { Component } from "react";

import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

const renderTextField = props =>
  <TextField
    hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />;

const AddCourseForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="firstName"
          component={renderTextField}
          label="First Name"
        />
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label="Last Name" />
      </div>
    </form>
  );
};

export default reduxForm({
  form: "AddCourseForm", // a unique identifier for this form
  validate
})(AddCourseForm);
