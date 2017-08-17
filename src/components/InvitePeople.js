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
  inviteLabelStyle:{
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: "500"
  },
  courseInviteStyle: {
    padding: "10px",
    display: "flex",
    margin:"10px",
    justifyContent: "space-between",
    alignItems:"center",
    fontFamily:"Roboto",
    fontSize:"16px",
    fontWeight:"bold",
  },
  courseHeaderStyle: {
    display: "flex",
    margin:"10px",
    justifyContent: "space-between",
    alignItems:"center",
    fontFamily:"Roboto",
    fontSize:"16px",
    fontWeight:"bold",
  },
  titleStyle:{
    fontFamily:"Raleway",
    fontSize:"24px",
    fontWeight:"bold",
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
          <p>{course.courseName}</p>
          <p style={{color:"#767778"}}>{key}</p>

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
          labelStyle = { styles.inviteLabelStyle}
          label="invite people"
          labelPosition="before"
          icon={<ContentAdd />}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Invite your friends to your class!"
          titleStyle={styles.titleStyle}
          actions={dialogActions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div style={styles.courseHeaderStyle}>
            <p>Course Name</p>
            <p>Course Key</p>
            <p>Copy to Clipboard</p>
          </div>
          <Divider />
          {this.inviteList()}
        </Dialog>
      </div>
    );
  }
}

export default invitePeople;
