import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from 'material-ui/Dialog';

class DeleteConfirm extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this);
    this.handleOpenConfirmation = this.handleOpenConfirmation.bind(this);
  }

  handleDeleteCancel(){
    this.setState({
      open: false
    });
  }

  handleDeleteSuccess(){
    this.setState({
      open: false
    });
    this.props.deleteFunction();
  }

  handleOpenConfirmation(){
    this.setState({
      open: true
    });
  }


  render() {
    return (
      <Dialog
        title={this.props.message}
        actions={[
          <RaisedButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleDeleteCancel()}
          />,
          <RaisedButton
            label="Delete"
            primary={true}
            style={{ color: "#E6463B" }}
            onTouchTap={this.handleDeleteSuccess()}
          />
        ]}
        modal={true}
        open={this.state.open}
      >
      </Dialog>
    );
  }
}
export default DeleteConfirm;