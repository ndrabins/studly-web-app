import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import { createCourse } from "../../actions";

import { TextField, DatePicker } from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";

const styles = {
  formStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    margin: 12
  },
};

const validate = values => {
  const errors = {}
  const requiredFields = [ 'courseName', 'teacherName', 'beginDate']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  return errors
}

//TODO: refactor to react-redux-form - a much easier form library
class newCourseForm extends Component {
  handleFormSubmit = values => {
    this.props.createCourse(values);
  };

  render() {
    return (
      <div>
        <form style={styles.formStyle} onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <div>
            <Field
              name="courseName"
              component={TextField}
              hintText="Course Name"
            />
          </div>
          <div>
            <Field
              name="teacherName"
              component={TextField}
              hintText="Teacher Name"
            />
          </div>
          {/*Start date*/}
          <div>
            {/*<DateRange />*/}
            <Field
              name="beginDate"
              component={DatePicker}
              format={null}
              mode="landscape"
              hintText="What day does your course begin?"
            />
          </div>

          <RaisedButton
            primary={true}
            style={styles.button}
            disabled={this.props.pristine || this.props.submitting}
            type="submit"
            label="Create Course"
          />
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

export default connect(mapStateToProps, { createCourse })(
  reduxForm({
    form: "newCourseForm",
    validate
  })(newCourseForm)
);
