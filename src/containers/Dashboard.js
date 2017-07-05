import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Route, Switch } from "react-router-dom";

import Sidenav from "./Sidenav";
import AddCourseForm from "./forms/AddCourseForm";
import CreateAssignmentForm from "./forms/CreateAssignmentForm";

import CourseNotes from "./CourseNotes";
import CourseChat from "./CourseChat";
import Assignments from "./Assignments";

import "../styles/app.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: true };
  }

  componentDidMount() {
    this.props.actions.fetchAllCourses();
  }

  render() {
    const contentStyle = {
      transition: "margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)"
    };

    if (this.state.drawerOpen) {
      contentStyle.marginLeft = 256;
    }

    return (
      <div style={contentStyle}>
        <Sidenav open={this.state.drawerOpen} />
        <Switch>
          <Route path={`/dashboard/addCourse`} component={AddCourseForm} />
          <Route path={`/dashboard/:courseId/notes`} component={CourseNotes} />
          <Route path={`/dashboard/chat`} component={CourseChat} />
          <Route path={`/dashboard/create-assignment`} component={CreateAssignmentForm} />
          <Route path={`/dashboard/assignments`} component={Assignments} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    courses: state.courses.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
