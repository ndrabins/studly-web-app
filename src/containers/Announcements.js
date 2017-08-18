import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import moment from "moment";

import Map from "lodash/map";

import Paper from "material-ui/Paper";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import NoAnnouncementVector from "../static/megaphone.svg"

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
  constructor(props){
    super(props);

    this.state = {
      renderAnnoucementForm: false
    }
    this.handleChildUnmount = this.handleChildUnmount.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchAnnouncements(this.props.selectedCourse);
  }

    componentDidUpdate(prevProps) {
    if (prevProps.selectedCourse !== this.props.selectedCourse){
      this.props.actions.fetchAnnouncements(this.props.selectedCourse);
    }
  }

  handleChildUnmount(){
    this.setState({renderAnnoucementForm: false});
  }

  announcementList() {
    if(!this.props.announcements){
      return (
        <div style={styles.announcementStyle}>
          <h3 style={{fontWeight:400 }} >You don't have any announcements yet! </h3>
          <img alt="" src={NoAnnouncementVector} style={{height:"50%", width:"50%", marginTop:"100px" }}></img>
        </div>
      );
    }


    const announcementList = Map(this.props.announcements, (announcement, key) => {
      let dateCreated = moment(announcement.dateCreated).format("llll");

      return (
        <Paper style={styles.announcementDetailStyle} zDepth={2} key={key}>
          <div style={{marginLeft:"40px" }}>
            <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between" }}>
              <h4 style={{marginBottom:"0px" }}>{announcement.title}</h4>
              <IconMenu
                style={styles.menuStyle}
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                <MenuItem primaryText="Delete" onClick={() => this.props.actions.deleteAnnouncement(this.props.selectedCourse, key)} />
              </IconMenu>
            </div>
            <h6 style={{marginTop:"0px", fontWeight:400 }}>{dateCreated}</h6>
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
        <h1>Announcements</h1>
        {this.state.renderAnnoucementForm ? <CreateAnnouncementForm unmountMe={this.handleChildUnmount} /> : null}

        {this.announcementList()}

        <FloatingActionButton
          style={styles.buttonStyle}
          label="addCourse"
          backgroundColor={"#1FA186"}
          onClick={() => this.setState({renderAnnoucementForm:!this.state.renderAnnoucementForm})}
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
