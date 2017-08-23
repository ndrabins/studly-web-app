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
          containerElement={<Link to={"/newCourse"} />}
          backgroundColor = {"#e67e22"}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default CreateClassButton;
