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

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name', 'displayName', 'schoolName', 'grade', 'majorFavoriteSubject', 'age' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  return errors
}

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: true,
    };
  }

  handleFormSubmit = values => {
    console.log("submitting");
    this.setState({
      isEditing: !this.state.isEditing
    })
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
            disabled={this.props.pristine || this.props.submitting}
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
            disabled={this.state.isEditing}
            defaultValue={"Default Value"}
            floatingLabelText="Your Name"
          />
          <Field
            name="displayName"
            component={TextField}
            floatingLabelText="Display Name"
            disabled={this.state.isEditing}
          />
          <Field
            name="schoolName"
            component={TextField}
            floatingLabelText="School Name"
            disabled={this.state.isEditing}
          />

          <Field
            name="grade"
            component={SelectField}
            floatingLabelText="Grade"
            disabled={this.state.isEditing}
          >
            <MenuItem value={"teacher"} primaryText="Educator" />
            <MenuItem value={"Parent"} primaryText="Parent" />
            <MenuItem value={"elementary"} primaryText="k-5th grade" />
            <MenuItem value={"6th"} primaryText="6th grade" />
            <MenuItem value={"7th"} primaryText="7th grade" />
            <MenuItem value={"8th"} primaryText="8th grade" />
            <MenuItem value={"9th"} primaryText="9th grade" />
            <MenuItem value={"10th"} primaryText="10th grade" />
            <MenuItem value={"11th"} primaryText="11th grade" />
            <MenuItem value={"12th"} primaryText="12th grade" />
            <MenuItem value={"College Freshman"} primaryText="College Freshman" />
            <MenuItem value={"College Sophomore"} primaryText="College Sophomore" />
            <MenuItem value={"College Junior"} primaryText="College Junior" />
            <MenuItem value={"College Senior"} primaryText="College Senior" />
          </Field>

          <Field
            name="majorFavoriteSubject"
            component={TextField}
            floatingLabelText="Major or Favorite Subject"
            disabled={this.state.isEditing}
          />
          <Field
            name="age"
            component={TextField}
            floatingLabelText="Age"
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
    user: state.auth.user,
    userProfile: state.profile.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "updateProfileForm",
    validate,

    // validate
  })(ProfileForm)
);
