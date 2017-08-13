import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';

const styles = {
  notesDiv: {
    display: "flex",
    // flex: 1,
    width:"256px",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    padding: "15px",
    paddingTop: "12px",
    color: "#EEEEEE"
  },
  header: {
    marginLeft: "10px",
    fontSize: "18px",
    marginTop: "10px",
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
          <List>
            <Subheader style={styles.header}>Collaborative Note</Subheader>
            <ListItem
              style={styles.noteListItem}
              primaryText="Class Note"
              secondaryText="Change your Google+ profile photo"
              secondaryTextLines={2}
            />
          </List>
          <Divider />
          <List>
            <Subheader style={styles.header}>Private Notes</Subheader>
            <ListItem
              style={styles.noteListItem}
              primaryText="Profile photo"
              secondaryText="Change your Google+ profile photo"
              secondaryTextLines={2}
            />
            <ListItem
              style={styles.noteListItem}
              primaryText="Profile photo"
              secondaryText="Change your Google+ profile photo"
              secondaryTextLines={2}
            />
          </List>
      </Paper>
    );
  }
}

export default NoteList;
