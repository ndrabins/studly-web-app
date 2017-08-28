import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Route, Switch } from "react-router-dom";

import PrivateNote from "../components/Notes/PrivateNote";
import CollaborativeNote from "../components/Notes/CollaborativeNote";
import NoteList from "../components/Notes/NoteList";


const styles = {
  CourseNotes: {
    display: "flex",
    flex:1,
    flexDirection: "row",
    height: "100%",
  },
}

class CourseNotes extends Component {
  componentDidMount(){
    this.props.actions.fetchPrivateNotes(this.props.selectedCourse);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.selectedCourse !== this.props.selectedCourse){
      this.props.actions.fetchPrivateNotes(nextProps.selectedCourse);
    }
  }

  componentWillUnmount(){
    this.props.actions.selectNote(null);
  }

  render() {
    return (
      <div style={styles.CourseNotes} >
        <NoteList />
        <Switch>
          {/* <Route path={`/notes/collaborative`} component={CollaborativeNote} /> */}
          <Route path={`/notes/private`} component={PrivateNote} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    selectedCourse: state.courses.selectedCourse,
    selectedNote: state.notes.selectedNote,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseNotes);
