import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import _ from "lodash";

import { Link } from "react-router-dom";

import Drawer from "material-ui/Drawer";

import RaisedButton from "material-ui/RaisedButton";
import Subheader from "material-ui/Subheader";
import { List, ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";

import ActionGrade from "material-ui/svg-icons/action/grade";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import ContentSend from "material-ui/svg-icons/content/send";

import CreateClassButton from "./CreateClassButton";

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

  renderCourseList() {
    if (this.props.courses) {
      console.log(this.props.courses);
      const courseList = this.props.courses.map(course =>
        <li>
          {"course"}
        </li>
      );

      return courseList;
    } else if (this.props.courses === undefined) {
      console.log("undefined");
      return <li> not loading </li>;
    }
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.state.open}
          docked={true}
          containerStyle={{ height: "calc(100% - 64px)", top: 64 }}
        >
          <div>
            <List>
              <Subheader>Courses</Subheader>
              {/*{this.renderCourseList()}*/}
              {Object.keys(this.props.courses).map(key => {
                return (
                  <div>
                    <ListItem
                      primaryText={this.props.courses[key].courseName}
                      leftIcon={<ContentInbox />}
                      initiallyOpen={true}
                      primaryTogglesNestedList={true}
                      nestedItems={[
                        <ListItem
                          key={1}
                          primaryText="Chat"
                          leftIcon={<ActionGrade />}
                        />,
                        <ListItem
                          key={2}
                          primaryText="Notes"
                          leftIcon={<ContentSend />}
                          containerElement={<Link to={`/dashboard/notes`} />}
                        />,
                        <ListItem
                          key={3}
                          primaryText="Announcements"
                          leftIcon={<ContentSend />}
                        />,
                        <ListItem
                          key={4}
                          primaryText="Assignments"
                          leftIcon={<ContentSend />}
                        />,
                        <ListItem
                          key={5}
                          primaryText="Grades"
                          leftIcon={<ContentSend />}
                        />
                      ]}
                    />
                  </div>
                );
              })}
            </List>
          </div>

          <CreateClassButton />

        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uid: state.auth.user.uid,
    courses: state.courses.data,
    loadingCourses: state.courses.fetchingAllCourses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);
