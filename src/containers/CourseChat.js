import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import TextField from "material-ui/TextField";

//TODO
//Split up each of these into separate components

const styles = {
  chatRoom: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  },
  channel: {
    display: "flex",
    flex: 1,
    backgroundColor: "#34495e"
  },
  messages: {
    display: "flex",
    flex: 3,
    backgroundColor: "#FFFFFF",
    margin: "5px",
    flexDirection: "column"
  },
  messageFeed: {
    display: "flex",
    height: "100%",
    backgroundColor: "#767778"
  },
  messageEntry: {
    alignSelf: "flex-end",
    margin: "3px"
  },
  members: {
    display: "flex",
    flex: 1,
    backgroundColor: "#34495e"
  }
};

class CourseChat extends Component {
  componentDidMount() {
    // Get a Firebase Database ref
    // var chatRef = firebase
    //   .database()
    //   .ref(`course-chat/${this.props.selectedCourse}`);
  }

  render() {
    return (
      <div style={styles.chatRoom}>
        <div style={styles.channel}>CHANNELS</div>
        <div style={styles.messages}>
          <div style={styles.messageFeed} />
          <TextField
            style={styles.messageEntry}
            floatingLabelText="Enter Message"
            floatingLabelFixed={true}
            multiLine={true}
            rows={1}
            rowsMax={4}
            fullWidth={true}
          />
        </div>
        <div style={styles.members}>MEMBERS</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    selectedCourse: state.courses.selectedCourse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseChat);
