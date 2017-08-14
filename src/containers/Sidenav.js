import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import Map from "lodash/map";

import Drawer from "material-ui/Drawer";

import Subheader from "material-ui/Subheader";
import { List, ListItem } from "material-ui/List";

import School from "material-ui/svg-icons/social/school";
import QuestionAnswer from "material-ui/svg-icons/action/question-answer";
import Description from "material-ui/svg-icons/action/description";
import VolumeUp from "material-ui/svg-icons/av/volume-up";
import Book from 'mui-icons/fontawesome/book';
import CreateClassButton from "./CreateClassButton";
import InvitePeople from "../components/InvitePeople";
import CoursesVector from "../static/workspace.svg"

const styles = {
  imageDiv: {
    display:"flex",
    justifyContent:"center",
    marginBottom: "100px",
    marginTop:"70px",
    flexDirection:"column",
    alignItems: "center",
  },
  noCourses: {
    display:"flex",
    justifyContent:"center",
    color:"#FFFFFF",
    textAlign: "center"
  },
  courseName: {
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: "700"
  },
  subCategories: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "400",
    color: "#FFFFFF"
  }
}

class Sidenav extends React.Component {
  handleNestedListToggle = item => {
    this.setState({
      open: item.state.open
    });
  };

  toggleList = () => {
    console.log("toggling");
  }

  courseList() {
    if (!this.props.courses) {
      return (
      <div style={styles.imageDiv}>
        <h3 style={styles.noCourses}>You aren't in any courses yet. Join or create one below! </h3>
        <img src={CoursesVector} style={{height:"50%", width:"50%" }}></img>
      </div>
      );
    }

    const courseList = Map(this.props.courses, (course, key) => {
      return (
        <ListItem
          key={key}
          primaryText={course.courseName}
          leftIcon={<Book color={"#FFFFFF"} />}
          initiallyOpen={false}
          style={{ ...styles.courseName, color: this.props.courses[key].courseColor} }
          primaryTogglesNestedList={true}
          onNestedListToggle={this.toggleList}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Chat"
              leftIcon={<QuestionAnswer color={"#FFFFFF"} />}
              containerElement={<Link to={`/dashboard/chat`} />}
              style={styles.subCategories}
              onClick={() => this.props.actions.selectCourse(key)}
            />,
            <ListItem
              key={2}
              primaryText="Notes"
              leftIcon={<Description color={"#FFFFFF"} />}
              style={styles.subCategories}
              onClick={() => this.props.actions.selectCourse(key)}
              containerElement={<Link to={`/dashboard/notes/collaborative`} />}
            />,
            <ListItem
              key={3}
              primaryText="Announcements"
              leftIcon={<VolumeUp color={"#FFFFFF"} />}
              style={styles.subCategories}
              containerElement={<Link to={`/dashboard/announcements`} />}
              onClick={() => this.props.actions.selectCourse(key)}
            />,
            <ListItem
              key={4}
              primaryText="Assignments"
              leftIcon={<School color={"#FFFFFF"} />}
              style={styles.subCategories}
              containerElement={<Link to={`/dashboard/assignments`} />}
              onClick={() => this.props.actions.selectCourse(key)}
            />
          ]}
        />
      );
    });
    return courseList;
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.props.sideNavOpen}
          docked={true}
          containerStyle={{
            height: "calc(100% - 64px)",
            top: 64,
            backgroundColor: "#303030"
          }}
        >
           <Scrollbars
            hideTracksWhenNotNeeded={true}
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            renderThumbVertical={props =>
              <div {...props} className="thumb-vertical" />}
          >
            <div>
              <List>

                {this.courseList()}
              </List>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CreateClassButton />
            </div>
            <InvitePeople courses={this.props.courses}/>
           </Scrollbars>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uid: state.auth.user.uid,
    courses: state.courses.data,
    loadingCourses: state.courses.fetchingAllCourses,
    selectedCourse: state.courses.selectedCourse,
    sideNavOpen: state.utility.sideNavOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);
