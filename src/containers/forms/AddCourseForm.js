import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import { createCourse } from "../../actions";

import { TextField, DatePicker } from "redux-form-material-ui";
import DateRange from "material-ui/svg-icons/action/date-range";

class AddCourse extends Component {
  handleFormSubmit = values => {
    this.props.createCourse(values)
  };


  render() {
    return (
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
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

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

// MyForm = reduxForm({
//   form: "addCourse"
// })(MyForm);

// export default MyForm;
