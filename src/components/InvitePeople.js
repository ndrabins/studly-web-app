import React, { Component } from "react";
import Map from "lodash/map";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import CopyToClipboard from 'react-copy-to-clipboard';

import RocketShip from "../static/rocket-ship.svg"

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
  },
  emptyInvites:{
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",
    alignItems:"center",
    padding:20,
  }
};


class invitePeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  inviteList() {
    if (!this.props.courses) {
      return (
      <div style={styles.emptyInvites}>
        <h3>You are in no courses, join some to start inviting! </h3>
        <img alt="" src={RocketShip} style={{marginTop:10,height:200, width:200 }}></img>
      </div>);
    }
    const inviteList = Map(this.props.courses, (course, key) => {
      return (
        <Paper style={styles.courseInviteStyle} rounded={false} zDepth={0} key={key}>
          <p>{course.courseName}</p>
          <p style={{color:"#767778"}}>{key}</p>

          <CopyToClipboard text={key}>
            <RaisedButton className="copyButton" backgroundColor="#F57C00" labelColor="#FFFFFF" label="Copy" onClick={this.handleCopy}/>
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
        onTouchTap={this.props.closeInviteDialog}
      />,
    ]

    return (
      <div style={{ display: "flex", flexDirection:"column"}}>
        <Dialog
          title="Invite your friends to your class!"
          titleStyle={styles.titleStyle}
          actions={dialogActions}
          modal={false}
          open={this.props.dialogStatus}
          onRequestClose={this.props.closeInviteDialog}
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
