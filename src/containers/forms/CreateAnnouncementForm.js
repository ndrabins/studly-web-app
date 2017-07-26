import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import { createAnnouncement } from "../../actions";

import Paper from "material-ui/Paper";
import { TextField } from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";

const styles = {
  paperStyle: {
    margin: "10px",
    width: "70%"
  },
  formStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "space-between",
    margin: "20px",
  },
  button: {
    margin: 12
  },
  error: {
    display: "flex",
    justifyContent: "center",
    color: "red"
  }
};

const validate = values => {
  const errors = {};
  const requiredFields = ["title", "description"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

//TODO: refactor to react-redux-form - a much easier form library
class CreateAnnouncement extends Component {
  handleFormSubmit = values => {
    values["courseId"] = this.props.selectedCourse;
    console.log(values);
    this.props.createAnnouncement(values);
  };

  render() {
    return (
      <Paper style={styles.paperStyle} zDepth={2}>
        <form
          style={styles.formStyle}
          onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
        >
          <Field
            name="title"
            fullWidth={true}
            component={TextField}
            floatingLabelText="Announcement Title"
            errorText={this.props.error}
          />
          <Field
            name="description"
            fullWidth={true}
            component={TextField}
            floatingLabelText="Announcement Description"
            multiLine={true}
            rows={3}
          />
          <RaisedButton
            primary={true}
            style={styles.button}
            disabled={this.props.pristine || this.props.submitting}
            type="submit"
            label="Create Announcement"
          />
        </form>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCourse: state.courses.selectedCourse
  };
}

export default connect(mapStateToProps, { createAnnouncement })(
  reduxForm({
    form: "createAnnouncement",
    validate
  })(CreateAnnouncement)
);
