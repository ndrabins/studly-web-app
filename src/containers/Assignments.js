import React, { Component } from "react";
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';

//https://github.com/react-component/collapse
import 'rc-collapse/assets/index.css';
import Collapse from "rc-collapse";
var Panel = Collapse.Panel;

class Assigments extends Component {
  render() {
    return (
      <div>
        <h2>Assignments</h2>
        <RaisedButton label="Create Assignment" containerElement={<Link to={`/dashboard/create-assignment`} />} />
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
