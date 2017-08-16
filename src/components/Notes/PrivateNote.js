import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import ReactQuill from "react-quill";

import RaisedButton from "material-ui/RaisedButton";

// eslint-disable-next-line
import theme from "react-quill/dist/quill.snow.css";

const fontColors = ["#1abc9c","#16a085","#2ecc71", "#27ae60","#3498db","#2980b9",
                "#9b59b6","#8e44ad","#f1c40f", "#f39c12", "#e67e22", "#e74c3c", "#c0392b", "#FFFFFF", "#000000", "#7f8c8d", "#ecf0f1", ];

const styles = {
   privateNoteContainer: {
    width:"75%",
    padding:30,
    // flexDirection:"column",
    // wordWrap: "break-word",
    // flexWrap: "wrap"
  },
}

class PrivateNote extends Component {
  constructor(props) {
    super(props);
    let noteContent = this.props.privateNotes[this.props.selectedNote].content;

    this.state =  {
      text: noteContent,
    }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.selectedNote !== this.props.selectedNote){
      let noteContent = this.props.privateNotes[nextProps.selectedNote].content;

      this.handleChange(noteContent);
    }
  }

  //this.props.privateNotes[this.props.select]
  handleChange(value) {
    this.setState({ text: value });
  }

  saveNote(){
    let noteKey = this.props.selectedNote;
    console.log("saving");

    let updatedNote = this.props.privateNotes[noteKey]
    updatedNote["content"] = this.state.text;
    this.props.actions.saveNote(updatedNote, noteKey);
  }

  render() {
    const modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{'color': fontColors}, {'background': fontColors}],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{'list': 'ordered'}, {'list': 'bullet'},
        {'indent': '-1'}, {'indent': '+1'}],
        [{ 'align': [] }],
        [ 'image', 'video'],
        ['formula', 'clean']
      ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'align', 'code-block',
         'image', 'video', 'color', 'script', 'background',
        'formula',
    ];

    return (
      <div style={styles.privateNoteContainer}>
        <RaisedButton label="Save" onClick={this.saveNote}/>
        <ReactQuill
          placeholder="Take some notes"
          theme="snow"
          value={this.state.text}
          onChange={this.handleChange}
          modules={modules}
          formats={formats}
        />
      </div>
    );
  }
}
            // scrollingContainer="#scrolling-container"

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    selectedNote: state.notes.selectedNote,
    privateNotes : state.notes.privateNotes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateNote);
