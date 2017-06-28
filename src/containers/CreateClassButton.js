import React, { Component } from "react";
import { Link } from "react-router-dom";
import FloatingActionButton from "material-ui/FloatingActionButton";

import ContentAdd from "material-ui/svg-icons/content/add";
import AddCourseForm from "./forms/AddCourseForm";

class CreateClassButton extends Component {
  render() {
    return (
      <div>
        <Link to={"/dashboard/addCourse"}>
          <FloatingActionButton label="addCourse" onTouchTap={this.handleOpen}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    );
  }
}

export default CreateClassButton;
