import React, { Component } from 'react';

import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
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
  handleFormSubmit = values => {
    // this.props.createAssignment(values);
    console.log(values)
  };

  // assignmentTitle, courseId, dueDate, pointValue, description
  render() {
    return (
      <div>
        <div>Create Assignment</div>
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
      </div>
    );
  }
}

// export default AddCourse;
// Decorate with redux-form
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { createAssignment })(
  reduxForm({
    form: "CreateAssignmentForm"
    // validate
  })(CreateAssignmentForm)
);
