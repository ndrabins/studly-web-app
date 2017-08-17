import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import { createChannel } from "../../actions";


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from "redux-form-material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";

const styles = {
   addChannelSvg:{
    display: "flex",
    alignSelf: "center",
    cursor: "pointer",
    height: "100%",
    color:"#767778"
  },
  dialogStyle:{
    backgroundColor:"#FFFFFF",
  },
  contentStyle:{
    width:"30%",
  },
  buttonDiv:{
    display:"flex",
    alignItems:"flex-end",
    justifyContent:"flex-end",
    marginTop: "20px",
  }
};

const validate = values => {
  const errors = {};
  const requiredFields = ["title", "description"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
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

  handleFormSubmit = values => {
    values["courseId"] = this.props.selectedCourse;
    this.setState({open:false});
    this.props.createChannel(values);
  };


  render() {
    const actions = [

    ];

    return (
      <div>
        <ContentAdd style={styles.addChannelSvg} hoverColor={"#1FA186"} onTouchTap={this.handleOpen}/>
        <Dialog
          contentStyle={styles.contentStyle}
          bodyStyle={styles.dialogStyle}
          titleStyle={styles.dialogStyle}
          actionsContainerStyle={styles.dialogStyle}
          title="Create Chat Channel"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form
            style={styles.formStyle}
            onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
          >
            <Field
              name="name"
              fullWidth={true}
              component={TextField}
              floatingLabelText="Channel Name"
              floatingLabelFixed={true}
              style={{width:"100%"}}
              autoFocus
              errorText={this.props.error}
            />
            <div style={styles.buttonDiv}>
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
              />
              <RaisedButton
                type="submit"
                label="Create Channel"
                primary={true}
              />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCourse: state.courses.selectedCourse
  };
}

export default connect(mapStateToProps, { createChannel })(
  reduxForm({
    form: "createChannel",
    validate
  })(CreateChannel)
);

