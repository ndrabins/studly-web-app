import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Route, Switch } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

import Sidenav from "./Sidenav";
import NewCourse from "./NewCourse";
import Loader from "../utils/Preloader";
import CreateAssignmentForm from "./forms/CreateAssignmentForm";

import Announcements from "./Announcements";
import CourseNotes from "./CourseNotes";
import CourseChat from "./CourseChat";
import Assignments from "./Assignments";
import Profile from "./Profile";
import DashboardContent from "./DashboardContent";

import "../styles/app.css";

class Dashboard extends React.Component {
  componentDidMount() {
    // this.props.actions.fetchStudlyData();
    this.props.actions.fetchAllCourses();
    this.props.actions.fetchProfile();
    this.props.actions.fetchUserAssignments();
  }

  render() {
    const contentStyle = {
      transition: "margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)",
      paddingTop: "64px",
      height: "100%"
    };

    if (this.props.sideNavOpen) {
      contentStyle.marginLeft = 256;
    } else {
      contentStyle.marginLeft = 0;
    }

    if(this.props.loadingCourses){
      return (
        <Loader />
      );
    }

    return (
      <div style={contentStyle}>
        <Sidenav />
        <Scrollbars renderThumbVertical={props => < div {...props} className="thumb-vertical-dashboard"/>}>
          <Switch>
            <Route path={`/dashboard/`} exact component={DashboardContent} />
            <Route path={`/dashboard/newCourse`} component={NewCourse} />
            <Route path={`/dashboard/:courseId/notes`} component={CourseNotes} />
            <Route path={`/dashboard/chat`} component={CourseChat} />
            <Route path={`/dashboard/create-assignment`} component={CreateAssignmentForm} />
            <Route path={`/dashboard/assignments`} component={Assignments} />
            <Route path={`/dashboard/Profile`} component={Profile} />
            <Route path={`/dashboard/Announcements`} component={Announcements} />
          </Switch>
        </Scrollbars>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    courses: state.courses.data,
    sideNavOpen: state.utility.sideNavOpen,
    loadingCourses: state.courses.fetchingAllCourses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
