import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import { Scrollbars } from "react-custom-scrollbars";

import { Link } from "react-router-dom";
import Map from "lodash/map";

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import CreateNote from './CreateNote';

const styles = {
  notesDiv: {
    display: "flex",
    flex: 1,
    height:"100%",
    // width:"256px",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    color: "#EEEEEE",
    overflow:"auto",
  },
  header: {
    fontSize: "16px",
    fontFamily: "Roboto, sans-serif"
  },
  privateNotesHeader: {
    fontSize: "16px",
    fontFamily: "Roboto, sans-serif",
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between"
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  noteListItem: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "400",
  },
}

class NoteList extends Component {
  renderPrivateNotes() {
    let privateNotes = Map(this.props.privateNotes, (note, key) => {
      return (
        <ListItem
          key={key}
          style={styles.noteListItem}
          primaryText={note.title}
          secondaryText={note.content}
          secondaryTextLines={2}
          containerElement={<Link to={`/dashboard/notes/private`} />}
        />
        );
    });

    return privateNotes;
  }

  render() {
    return (
      <Paper style={styles.notesDiv}>
        <Scrollbars >
          <List>
            <Subheader style={styles.header}>Collaborative Note </Subheader>
            <ListItem
              style={styles.noteListItem}
              primaryText="Class Note"
              secondaryText="Crowdsource your notes with your classmates!"
              secondaryTextLines={2}
              containerElement={<Link to={`/dashboard/notes/collaborative`} />}
            />
          </List>
          <Divider />
          <List>
            <Subheader style={styles.privateNotesHeader}>Private Notes <CreateNote /></Subheader>
            {this.renderPrivateNotes()}
          </List>
          </Scrollbars>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    privateNotes : state.notes.privateNotes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
