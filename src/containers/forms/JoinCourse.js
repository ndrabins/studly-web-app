import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import { addCourse } from "../../actions";

import { TextField } from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";

const styles = {
  formStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "space-between"
  },
  button: {
    margin: 12,
  },
  error:{
    display: "flex",
    justifyContent: "center",
    color: "red"
  }
};

const validate = values => {
  const errors = {}
  const requiredFields = [ 'courseKey']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
// -\w{19}
  })
  if (
    values.courseKey &&
    !/^-.{19}$/.test(values.courseKey)
  ) {
    errors.courseKey = 'Invalid course key'
  }

  return errors
}

//TODO: refactor to react-redux-form - a much easier form library
class JoinCourse extends Component {
  handleFormSubmit = values => {
    this.props.addCourse(values);
  };

  renderError(){
    if(this.props.joinCourseError){
      return <div style={styles.error}> Course does not exist </div>
    }
  }


  render() {
    return (
      <div>
        <form style={styles.formStyle} onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <div>
            <Field
              name="courseKey"
              component={TextField}
              hintText="Course ID"
              errorText={this.props.error}
            />
          </div>
          <RaisedButton
            primary={true}
            style={styles.button}
            disabled={this.props.pristine || this.props.submitting}
            type="submit"
            label="Join Course"
          />
          {this.renderError()}
        </form>
      </div>
    );
  }
}

// export default AddCourse;
// Decorate with redux-form
function mapStateToProps(state) {
  return {
    joinCourseError: state.courses.joinCourseError
  };
}

export default connect(mapStateToProps, { addCourse })(
  reduxForm({
    form: "joinCourse",
    validate
  })(JoinCourse)
);

