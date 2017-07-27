import React, { Component } from "react";
import { connect } from "react-redux";

import { reduxForm, Field } from "redux-form";
import { Redirect } from "react-router";

import { createAssignment } from "../../actions";

import { TextField, DatePicker } from "redux-form-material-ui";
// import { Control, Form } from 'react-redux-form';

import { Card, CardActions } from "material-ui/Card";

import DateRange from "material-ui/svg-icons/action/date-range";
import RaisedButton from "material-ui/RaisedButton";

const renderTextField = props =>
  <TextField
    hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />;

const buttonStyle = {
  margin: 12
};

const formStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center"
};
const headerStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#206E9B",
  color: "#FFF",
  height: "80px"
};
const validate = values => {
  const errors = {};
  const requiredFields = [
    "assignmentTitle",
    "pointValue",
    "description",
    "dueDate"
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

class CreateAssignmentForm extends Component {
  constructor() {
    super();
    this.state = {
      fireRedirect: false
    };
  }

  handleFormSubmit = values => {
    values["courseId"] = this.props.selectedCourse;
    this.props.createAssignment(values);
    this.setState({ fireRedirect: true });
  };

  // assignmentTitle, courseId, dueDate, pointValue, description
  render() {
    const { from } = this.props.location.state || "/";
    const { fireRedirect } = this.state;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Card style={{ width: "60%", margin: "30px" }}>
          <div style={headerStyle}>
            <h1>Create Assignment</h1>
          </div>
          <form
            onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
            style={formStyle}
          >
            <Field
              name="assignmentTitle"
              component={TextField}
              hintText="Assignment Title"
              style={{ width: "40%" }}
            />
            <Field
              name="pointValue"
              component={TextField}
              hintText="Point Value"
              style={{ width: "20%" }}
            />
            <Field
              name="description"
              component={renderTextField}
              label="Assignment Description"
              multiLine={true}
              rows={5}
              style={{ width: "60%" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <DateRange />
              <Field
                name="dueDate"
                component={DatePicker}
                format={null}
                mode="landscape"
                hintText="Due Date"
              />
            </div>
            <CardActions>
              <RaisedButton
                primary={true}
                style={buttonStyle}
                disabled={this.props.pristine || this.props.submitting}
                type="submit"
                label="Create Assignment"
              />
            </CardActions>
          </form>
        </Card>
        {fireRedirect && <Redirect to={"/dashboard/assignments"} />}
      </div>
    );
  }
}

// Decorate with redux-form
function mapStateToProps(state) {
  return {
    selectedCourse: state.courses.selectedCourse
  };
}

export default connect(mapStateToProps, { createAssignment })(
  reduxForm({
    form: "CreateAssignmentForm",
    validate
  })(CreateAssignmentForm)
);
