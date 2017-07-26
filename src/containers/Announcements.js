import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import moment from "moment";
import { Link } from "react-router-dom";

import Map from "lodash/map";

import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import CreateAnnouncementForm from "./forms/CreateAnnouncementForm";



const styles = {
  announcementStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  announcementDetailStyle: {
    width: "80%",
    margin: "15px 30px 15px 30px",
    padding: "10px"
  },
  buttonStyle: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  },
  menuStyle: {
  }
};

class Announcements extends Component {
  componentDidMount() {
    this.props.actions.fetchAnnouncements(this.props.selectedCourse);
  }

  announcementList() {
    console.log("stuff");
    const announcementList = Map(this.props.announcements, (announcement, key) => {
      console.log({announcement});
      let dateCreated = moment(announcement.dateCreated).format("llll");

      return (
        <Paper style={styles.announcementDetailStyle} zDepth={2} key={key}>
          <div style={{marginLeft:"40px", marginRight:"40px" }}>
            <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between" }}>
              <h4 style={{marginBottom:"0px" }}>{announcement.title}</h4>
              <IconMenu
                style={styles.menuStyle}
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                <MenuItem primaryText="Delete" />
              </IconMenu>
            </div>
            <h6 style={{marginTop:"0px" }}>{dateCreated}</h6>
            <p>{announcement.description}</p>

          </div>
        </Paper>
      );
    });
    return announcementList;
  }

  render() {
    return (
      <div style={styles.announcementStyle}>
        <h2>Announcements</h2>
        <CreateAnnouncementForm />

        {this.announcementList()}

        <FloatingActionButton
          style={styles.buttonStyle}
          label="addCourse"
          backgroundColor={"#1FA186"}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCourse: state.courses.selectedCourse,
    announcements: state.announcements.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
