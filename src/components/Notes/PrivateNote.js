import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import ReactQuill from "react-quill";

import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

// eslint-disable-next-line
import theme from "react-quill/dist/quill.snow.css";

const fontColors = ["#1abc9c","#16a085","#2ecc71", "#27ae60","#3498db","#2980b9",
                "#9b59b6","#8e44ad","#f1c40f", "#f39c12", "#e67e22", "#e74c3c", "#c0392b", "#FFFFFF", "#000000", "#7f8c8d", "#ecf0f1", ];

const styles = {
   privateNoteContainer: {
    width:"75%",
    padding:30,
    paddingTop: 0,
    // flexDirection:"column",
    // wordWrap: "break-word",
    // flexWrap: "wrap"
  },
  titleBar:{
    display:"flex",
    justifyContent:"space-between"
  },
  button: {
    display:"flex",
    // justifyContent:"flex-end",
    alignItems:"flex-end",
    paddingBottom: "10px",
  }
}

class PrivateNote extends Component {
  constructor(props) {
    super(props);
    let noteContent = this.props.privateNotes[this.props.selectedNote].content;
    let title = this.props.privateNotes[this.props.selectedNote].title;

    this.state =  {
      text: noteContent,
      title: title,
    }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);

    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
  }

  componentDidMount() {
    this.attachQuillRefs()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.selectedNote !== this.props.selectedNote){
      let noteContent = this.props.privateNotes[nextProps.selectedNote].content;
      let title = this.props.privateNotes[nextProps.selectedNote].title;

      this.handleChange(noteContent);
      this.setState({ title: title });
    }
  }

  //this.props.privateNotes[this.props.select]
  handleChange(value) {
    this.setState({ text: value });
  }

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  saveNote(){
    let noteKey = this.props.selectedNote;

    let updatedNote = this.props.privateNotes[noteKey]
    updatedNote["content"] = this.state.text;
    updatedNote["title"] = this.state.title;
    updatedNote["preview"] = this.quillRef.getText().slice(0,200);

    // console.log(this.quillRef.getText());

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
        <div style={styles.titleBar}>
          <TextField
            value={this.state.title}
            name="title"
            floatingLabelText="Title"
            onChange={this.handleChangeTitle}
            onKeyDown={ev => {
              if (ev.key === "s" && ev.ctrlKey) {
                  ev.preventDefault();
                  this.saveNote();
                }
              }}
          />
          <div style={styles.button}>
            <RaisedButton primary={true} label="Save"
              onClick={this.saveNote}
            />
          </div>
        </div>
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el }}
          placeholder="Take some notes"
          theme="snow"
          value={this.state.text}
          onChange={this.handleChange}
          modules={modules}
          formats={formats}
          onKeyDown={ev => {
            if (ev.key === "s" && ev.ctrlKey) {
              ev.preventDefault();
              this.saveNote();
            }
          }}
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
