import React, { Component } from 'react';

import { Scrollbars } from "react-custom-scrollbars";

import { Link } from "react-router-dom";

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

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
    fontSize: "20px",
    fontFamily: "Roboto, sans-serif"
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

        // <h3 style={styles.header}> Collaborative Note </h3>
        // <h3 style={styles.header}> Private Notes </h3>
class NoteList extends Component {
  render() {
    return (
      <Paper style={styles.notesDiv}>
        <Scrollbars >
          <List>
            <Subheader style={styles.header}>Collaborative Note</Subheader>
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
            <Subheader style={styles.header}>Private Notes</Subheader>
            <ListItem
              style={styles.noteListItem}
              primaryText="Pythagorans Theorem"
              secondaryText="Math was invented by franklin B Roosevelt"
              secondaryTextLines={2}
              containerElement={<Link to={`/dashboard/notes/private`} />}
            />
          </List>
          </Scrollbars>
      </Paper>
    );
  }
}

export default NoteList;
