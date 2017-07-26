import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Link } from "react-router-dom";
import Map from "lodash/map";

import Drawer from "material-ui/Drawer";

import Subheader from "material-ui/Subheader";
import { List, ListItem } from "material-ui/List";

import School from "material-ui/svg-icons/social/school";
import QuestionAnswer from "material-ui/svg-icons/action/question-answer";
import Description from "material-ui/svg-icons/action/description";
import Grade from "material-ui/svg-icons/action/grade";
import VolumeUp from "material-ui/svg-icons/av/volume-up";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import ContentAdd from "material-ui/svg-icons/content/add";

import CreateClassButton from "./CreateClassButton";

const listStyle = {
  textColor: `#ffffff !important`
}

class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    };
  }


  handleToggle = () => this.setState({ open: !this.state.open });

  handleNestedListToggle = item => {
    this.setState({
      open: item.state.open
    });
  };

  courseList() {
    if(!this.props.courses){
      return <div> You are in no courses </div>
    }

    //           rightIcon={<ContentAdd color={"#FFFFFF"} />}
    const courseList = Map(this.props.courses, (course, key) => {
      return (
        <ListItem
          key={key}
          primaryText={course}
          leftIcon={<ContentInbox color={"#FFFFFF"} />}
          initiallyOpen={true}
          style = {{color:"#FFFFFF"}}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Chat"
              leftIcon={<QuestionAnswer color={"#FFFFFF"} />}
              containerElement={<Link to={`/dashboard/chat`} />}
              style = {{color:"#FFFFFF"}}
              onClick={() => this.props.actions.selectCourse(key)}
            />,
            <ListItem
              key={2}
              primaryText="Notes"
              leftIcon={<Description color={"#FFFFFF"}/>}
              style = {{color:"#FFFFFF"}}
              onClick={() => this.props.actions.selectCourse(key)}
              containerElement={<Link to={`/dashboard/${key}/notes`} />}
            />,
            <ListItem
              key={3}
              primaryText="Announcements"
              leftIcon={<VolumeUp color={"#FFFFFF"}/>}
              style = {{color:"#FFFFFF"}}
              containerElement={<Link to={`/dashboard/announcements`} />}
              onClick={() => this.props.actions.selectCourse(key)}
            />,
            <ListItem
              key={4}
              primaryText="Assignments"
              leftIcon={<School color={"#FFFFFF"} />}
              style = {{color:"#FFFFFF"}}
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
          containerStyle={{ height: "calc(100% - 64px)", top: 64, backgroundColor:"#303030" }}
        >
          <div>
            <List>
              <Subheader style = {{color:"#FFFFFF"}}>Courses</Subheader>
              {this.courseList()}
            </List>
          </div>
          <div style={{display: "flex", justifyContent:"center" }}>
            <CreateClassButton />
          </div>
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
    sideNavOpen: state.utility.sideNavOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);
