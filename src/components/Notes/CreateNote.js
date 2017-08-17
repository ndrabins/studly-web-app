import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import ContentAdd from "material-ui/svg-icons/content/add";


const styles = {
  addButton:{
    display: "flex",
    alignSelf: "center",
    cursor: "pointer",
    height: "24px",
    color:"#767778",
    marginRight: "10px",
  }
}

class CreateNote extends Component {
  handleClick = () => {
    this.props.actions.createNote(this.props.selectedCourse);
  }

  render() {
    return (
        <ContentAdd style={styles.addButton} onTouchTap={this.handleClick} hoverColor={"#2D7EB5"}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCourse: state.courses.selectedCourse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote);
