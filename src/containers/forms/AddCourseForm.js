import React, { Component } from "react";

import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const style = {
  margin: 12
};

const validate = values => {
  const errors = {};
  const requiredFields = ["courseName"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const renderTextField = props =>
  <TextField
    hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />;

class AddCourseForm extends React.Component {
  handleFormSubmit = values => {
    console.log("submitting");
  };

  // const { pristine, reset, submitting } = props;


  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        <div>
          <Field
            name="courseName"
            component={renderTextField}
            label="Course Name"
          />
        </div>
        <div>
          <RaisedButton  type="submit" label="Submit" primary={true} style={style} />
          <RaisedButton  type="submit" label="Clear" onClick={this.props.handleFormSubmit} style={style} />
          {/*<button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>*/}
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "AddCourseForm", // a unique identifier for this form
  validate
})(AddCourseForm);
