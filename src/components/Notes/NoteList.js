import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import { Scrollbars } from "react-custom-scrollbars";

import { Link } from "react-router-dom";
import Map from "lodash/map";
import keys from "lodash/keys";
import includes from "lodash/includes";
import moment from "moment";

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
    backgroundColor: "#3F3F3F",
    flexDirection: "column",
    color: "#EEEEEE",
    overflow:"auto",
  },
  header: {
    fontSize: "16px",
    fontFamily: "Roboto, sans-serif",
    color:"#EEEEEE"
  },
  privateNotesHeader: {
    paddingTop:"12px",
    color:"#EEEEEE",
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
    color:"#B9BBBE"
  },
  selectedNote: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "400",
    border: "2px solid",
    borderLeft: "10px solid",
    borderColor: "#2E81BA",
    color:"#FFFFFF"
  },
}

class NoteList extends Component {
  componentWillReceiveProps(nextProps){
    let noteKeys = keys(nextProps.privateNotes);
    let selectedNeedsUpdate = !includes(noteKeys, this.props.selectedNote);

    if(nextProps.privateNotes !== this.props.privateNotes && selectedNeedsUpdate){
      this.props.actions.selectNote(noteKeys[0]);
    }
  }

  renderPrivateNotes() {
    let privateNotes = Map(this.props.privateNotes, (note, key) => {
      let renderedStyle = styles.noteListItem;
      if(key===this.props.selectedNote){
        renderedStyle = styles.selectedNote;
      }

      let diff = moment(note.updatedAt).diff(moment(), 'minutes');
      let timestamp = moment().add(diff, 'minutes').calendar();

      return (
        <ListItem
          key={key}
          style={renderedStyle}
          primaryText={note.title}
          secondaryText={<span style={{color:"#707070"}}>{timestamp}</span>}
          secondaryTextLines={1}
          containerElement={<Link to={`/notes/private`} />}
          onClick={() => this.props.actions.selectNote(key)}
        />
        );
    });

    return privateNotes;
  }

  render() {
    let renderedStyle = styles.noteListItem;
    if(this.props.selectedNote===null){
      renderedStyle = styles.selectedNote;
    }

    return (
      <Paper style={styles.notesDiv}>
        <Scrollbars
          hideTracksWhenNotNeeded={true}
          autoHide={true}
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          {/* <List>
            <Subheader style={styles.header}>Collaborative Note </Subheader>
            <ListItem
              style={renderedStyle}
              primaryText="Class Note"
              secondaryText="Crowdsource your notes with your classmates!"
              secondaryTextLines={2}
              containerElement={<Link to={`/notes/collaborative`} />}
              onClick={() => this.props.actions.selectNote(null)}
            />
          </List>
          <Divider /> */}
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
    privateNotes : state.notes.privateNotes,
    selectedNote: state.notes.selectedNote,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
