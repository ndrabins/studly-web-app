import React, { Component } from 'react';

import CreateCourseForm from "./forms/CreateCourseForm";
import JoinCourse from "./forms/JoinCourse";

import Paper from 'material-ui/Paper';

const styles = {
  newCourseStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  row: {
    padding: "20px",
    margin: "30px"
  }
}

class newCourse extends Component {
  render() {
    return (
      <div style={styles.newCourseStyle}>
        <Paper style={styles.row}>
          <h3>Create a new course</h3>
          <CreateCourseForm />
        </Paper>
        <Paper style={styles.row}>
          <h3>Join a new course </h3>
          <JoinCourse />
        </Paper>
      </div>
    );
  }
}

export default newCourse;
