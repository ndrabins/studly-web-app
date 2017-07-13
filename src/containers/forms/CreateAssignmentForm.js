import React, { Component } from 'react';
import { connect } from "react-redux";

import { reduxForm, Field } from "redux-form";
import { Redirect } from 'react-router'

import { createAssignment } from "../../actions";

import { TextField, DatePicker } from "redux-form-material-ui";
// import { Control, Form } from 'react-redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const renderTextField = props => (
  <TextField hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />
)

class CreateAssignmentForm extends Component {
  constructor () {
    super();
    this.state = {
      fireRedirect: false
    }
  }


  handleFormSubmit = values => {
    values["courseId"] = this.props.selectedCourse;
    this.props.createAssignment(values);
    this.setState({ fireRedirect: true })
  };

  // assignmentTitle, courseId, dueDate, pointValue, description
  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state

    return (
      <div style={{}}>
        <h2>Create Assignment</h2>
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <div>
            <Field
              name="assignmentTitle"
              component={TextField}
              hintText="Assignment Title"
            />
          </div>
          <div>
            <Field
              name="pointValue"
              component={TextField}
              hintText="Point Value"
            />
          </div>
          <div>
            <Field name="description" component={renderTextField} label="Assignment Description" multiLine={true} rows={5}/>
          </div>
          <div>
            {/*<DateRange />*/}
            <Field
              name="dueDate"
              component={DatePicker}
              format={null}
              mode="landscape"
              hintText="Due Date"
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        {fireRedirect && (
          <Redirect to={'/dashboard/assignments'}/>
        )}
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
    form: "CreateAssignmentForm"
    // validate
  })(CreateAssignmentForm)
);
