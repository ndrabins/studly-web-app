import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import { createCourse } from "../../actions";

import { TextField, DatePicker } from "redux-form-material-ui";

//TODO: refactor to react-redux-form - a much easier form library
class AddCourse extends Component {
  handleFormSubmit = values => {
    this.props.createCourse(values);
  };

  render() {
    return (
      <div>
        <div>add course</div>
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
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

export default connect(mapStateToProps, { createCourse })(
  reduxForm({
    form: "addCourse"
    // validate
  })(AddCourse)
);

