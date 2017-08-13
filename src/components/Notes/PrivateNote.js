import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import ReactQuill from "react-quill";
import theme from "react-quill/dist/quill.snow.css";

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
        [{'color':[]}],
        [{'list': 'ordered'}, {'list': 'bullet'},
        {'indent': '-1'}, {'indent': '+1'}],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'align',
        'link', 'image', 'video', 'color'
    ];

    return (
        <div style={{ width: "75%"}}>
          <ReactQuill
            placeholder="Take some notes"
            theme="snow"
            value={this.state.text}
            onChange={this.handleChange}
            modules={modules}
            formats={formats}
            scrollingContainer="#scrolling-container"
          />
      </div>
    );
  }
}

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
