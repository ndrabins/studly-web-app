import React, { Component } from "react";
import Map from "lodash/map";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import ContentAdd from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import CopyToClipboard from 'react-copy-to-clipboard';

const styles = {
  inviteStyle: {
    color: "#FFFFFF",
    marginTop: "50px",
    marginBottom: "50px",
    display: "flex",
    alignSelf: "center",
  },
  courseInviteStyle: {
    padding: "10px",
    display: "flex",
    margin:"10px",
    justifyContent: "space-between",
    alignItems:"center"
  },
  courseHeaderStyle: {
    display: "flex",
    margin:"10px",
    justifyContent: "space-between",
    alignItems:"center"
  }
};


class invitePeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    };
  }

  handleOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  inviteList() {
    if (!this.props.courses) {
      return <div> You are in no courses, join some to start inviting! </div>;
    }
    const inviteList = Map(this.props.courses, (course, key) => {
      return (
        <Paper style={styles.courseInviteStyle} rounded={false} zDepth={0} key={key}>
          <h4>{course.courseName}</h4>
          <h4 style={{color:"#767778"}}>{key}</h4>

          <CopyToClipboard text={key}>
            <RaisedButton className="copyButton" backgroundColor="#F57C00" labelColor="#FFFFFF" label="Copy"/>
          </CopyToClipboard>
        </Paper>
      );
    });

    return inviteList;
  }

  render() {
    const dialogActions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ]

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FlatButton
          style={styles.inviteStyle}
          label="invite people"
          labelPosition="before"
          icon={<ContentAdd />}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Invite your friends to your class!"
          actions={dialogActions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
        >
          <div style={styles.courseHeaderStyle}>
            <h4>Course Name</h4>
            <h4>Course Key</h4>
            <h4>Copy to Clipboard</h4>
          </div>
          <Divider />
          {this.inviteList()}
        </Dialog>
      </div>
    );
  }
}

export default invitePeople;
