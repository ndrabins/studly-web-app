import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';

//https://github.com/react-component/collapse
import 'rc-collapse/assets/index.css';
import Collapse from "rc-collapse";
var Panel = Collapse.Panel;

class Assignments extends Component {
  componentDidMount(){
    this.props.actions.fetchAllAssignments(this.props.selectedCourse)
  }

  // componentDidUpdate(){
  //   this.props.actions.fetchAllAssignments(this.props.selectedCourse)
  // }



  //  renderAssignmentList(){
  //    {Object.keys(this.props.assignments.data).map(key => {
  //      return (
  //       <Panel header={this.props.assignments.data[key].assignmentTitle} headerClass="my-header-class">
  //           {this.props.assignments.data[key].description}
  //       </Panel>
  //     });
  //    );
  //    }
  // }
  render() {
    return (
      <div>
        <h2>Assignments</h2>
        <RaisedButton label="Create Assignment" containerElement={<Link to={`/dashboard/create-assignment`} />} />
        <Collapse accordion={true}>
        </Collapse>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    assignments: state.assignments.data,
    selectedCourse: state.courses.selectedCourse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);

