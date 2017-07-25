import React, { Component } from "react";
import { Link } from "react-router-dom";
import FloatingActionButton from "material-ui/FloatingActionButton";

import ContentAdd from "material-ui/svg-icons/content/add";

class CreateClassButton extends Component {
  render() {
    return (
      <div>
        <FloatingActionButton
          label="addCourse"
          onTouchTap={this.handleOpen}
          containerElement={<Link to={"/dashboard/newCourse"} />}
          backgroundColor = {"#1B6B9B"}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default CreateClassButton;
