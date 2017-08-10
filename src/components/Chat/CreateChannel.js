import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ContentAdd from "material-ui/svg-icons/content/add";

const styles = {
   addChannelSvg:{
    display: "flex",
    alignSelf: "center",
    cursor: "pointer"
  },
  dialogStyle:{
    backgroundColor:"#3F3F3F",
  },
  contentStyle:{
    width:"30%",
  }
};

class CreateChannel extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <ContentAdd style={styles.addChannelSvg} hoverColor={"#FFFFFF"} onTouchTap={this.handleOpen}/>
         <Dialog
          contentStyle={styles.contentStyle}
          bodyStyle={styles.dialogStyle}
          titleStyle={styles.dialogStyle}
          actionsContainerStyle={styles.dialogStyle}
          title="Create Channel"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            autoFocus
            floatingLabelText="Channel Name"
            floatingLabelFixed={true}
            style={{width:"100%"}}
          />
        </Dialog>
      </div>
    );
  }
}

export default CreateChannel;
