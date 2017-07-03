import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';

//https://github.com/react-component/collapse
import 'rc-collapse/assets/index.css';
import Collapse from "rc-collapse";
var Panel = Collapse.Panel;

class Assigments extends Component {
  render() {
    return (
      <div>
        <h2>Assignments</h2>
        <Button containerElement={<Link to={`/dashboard/create-assignment`} />} > Create Assignment </Button>
        <Collapse accordion={true}>
          <Panel header="hello" headerClass="my-header-class">
            this is panel content
          </Panel>
          <Panel header="title2">this is panel content2 or other</Panel>
        </Collapse>
      </div>
    );
  }
}

export default Assigments;
