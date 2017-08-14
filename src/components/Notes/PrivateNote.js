import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import ReactQuill from "react-quill";

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
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }



  render() {
    const modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'color': fontColors}],
        [{'list': 'ordered'}, {'list': 'bullet'},
        {'indent': '-1'}, {'indent': '+1'}],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['formula', 'clean']
      ]
    };

    //Add images to formats and toolbar when ready
    //'image'


    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'align',
        'link', 'image', 'video', 'color',
        'formula',
    ];


    return (
      <div style={styles.privateNoteContainer}>
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
    selectedCourse: state.courses.selectedCourse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateNote);
