import React, { Component } from "react";
import { Link } from "react-router-dom";

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

class CreateClassButton extends Component {
  render() {
    return (
      <div>
        <Button fab color="primary" containerElement={<Link to={`/dashboard/addCourse`} />}>
          <Icon color="primary">add_circle</Icon>
        </Button>
      </div>
    );
  }
}

export default CreateClassButton;
