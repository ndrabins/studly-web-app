import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import { createCourse } from "../../actions";

import { TextField, DatePicker } from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";
import { CirclePicker } from "react-color";

const styles = {
  formStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    margin: 12
  }
};

const validate = values => {
  const errors = {};
  const requiredFields = ["courseName", "teacherName", "beginDate"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

//Custom colors on picker
const colors = ["#1abc9c","#16a085","#2ecc71", "#27ae60","#3498db","#2980b9",
                "#9b59b6","#8e44ad","#f1c40f", "#f39c12", "#e67e22", "#e74c3c"];

//TODO: refactor to react-redux-form - a much easier form library
class newCourseForm extends Component {
  state = {
    courseColor: "#1abc9b"
  };
  handleChangeComplete = color => {
    this.setState({ courseColor: color.hex });
  };

  handleFormSubmit = values => {
    values["courseColor"]=this.state.courseColor;
    this.props.createCourse(values);
  };

  render() {
    return (
      <div>
        <form
          style={styles.formStyle}
          onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
        >
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
            <p>Choose your course color!</p>
            <CirclePicker
              color={this.state.courseColor}
              onChangeComplete={this.handleChangeComplete}
              colors={colors}
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
