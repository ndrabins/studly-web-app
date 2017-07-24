import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as Actions from "../../actions";

import Dropzone from "react-dropzone";

import Avatar from "material-ui/Avatar";

import { TextField, SelectField } from "redux-form-material-ui";
import MenuItem from "material-ui/MenuItem";

import RaisedButton from "material-ui/RaisedButton";

//fields
//Name, School, Displayname, grade (dropdown), field of study

const styles = {
  formStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  button: {
    margin: 12
  },
  profilePic: {
    margin: "30px"
  }
};

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: true
    };
  }

  handleFormSubmit = values => {
    this.props.actions.updateProfile(values);
  };

  onEditButtonPress = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  };

  renderEditingMode() {
    if (!this.state.isEditing) {
      return (
        <div>
          <RaisedButton
            onClick={this.onEditButtonPress}
            style={styles.button}
            label="Cancel"
          />
          <RaisedButton
            primary={true}
            style={styles.button}
            type="submit"
            label="Submit"
          />
        </div>
      );
    } else {
      return (
        <RaisedButton
          style={styles.button}
          primary={true}
          label="Edit Profile"
          onClick={this.onEditButtonPress}
        />
      );
    }
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.props.actions.updateProfileImage(files[0], this.props.user.uid);
  }

  renderProfilePicture() {
    if (!this.state.isEditing) {
      return (
        <div>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
          >
            <p>
              Drop an image or click to select a new profile picture to upload.
            </p>
          </Dropzone>
        </div>
      );
    } else {
      return (
        <div>
          <Avatar
            size={170}
            src={this.props.user.photoURL}
            style={styles.profilePic}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderProfilePicture()}
        <form
          style={styles.formStyle}
          onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
        >
          <Field
            name="name"
            component={TextField}
            hintText="Your Name"
            disabled={this.state.isEditing}
          />
          <Field
            name="displayName"
            component={TextField}
            hintText="Display Name"
            disabled={this.state.isEditing}
          />
          <Field
            name="schoolName"
            component={TextField}
            hintText="School Name"
            disabled={this.state.isEditing}
          />

          <Field
            name="grade"
            component={SelectField}
            hintText="Grade"
            disabled={this.state.isEditing}
          >
            <MenuItem value={"teacher"} primaryText="Educator" />
            <MenuItem value={"Parent"} primaryText="Parent" />
            <MenuItem value={1} primaryText="k-5th grade" />
            <MenuItem value={1} primaryText="k-5th grade" />
            <MenuItem value={2} primaryText="6th grade" />
            <MenuItem value={3} primaryText="7th grade" />
            <MenuItem value={4} primaryText="8th grade" />
            <MenuItem value={5} primaryText="9th grade" />
            <MenuItem value={6} primaryText="10th grade" />
            <MenuItem value={7} primaryText="11th grade" />
            <MenuItem value={8} primaryText="12th grade" />
            <MenuItem value={9} primaryText="College Freshman" />
            <MenuItem value={10} primaryText="College Sophomore" />
            <MenuItem value={11} primaryText="College Junior" />
            <MenuItem value={12} primaryText="College Senior" />
          </Field>

          <Field
            name="majorFavoriteSubject"
            component={TextField}
            hintText="Major or Favorite Subject"
            disabled={this.state.isEditing}
          />
          <Field
            name="age"
            component={TextField}
            hintText="Age"
            disabled={this.state.isEditing}
          />
          {this.renderEditingMode()}
        </form>
      </div>
    );
  }
}
// Decorate with redux-form
function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "updateProfileForm"
    // validate
  })(ProfileForm)
);
