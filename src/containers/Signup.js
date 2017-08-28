import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as Actions from "../actions";
import Loader from "../utils/Preloader";

import FlatButton from "material-ui/FlatButton";
import Google from 'mui-icons/fontawesome/google';
import Facebook from 'mui-icons/fontawesome/facebook-official';
import SignUp from 'mui-icons/fontawesome/user-plus';

import GoogleG from "../static/google.svg"

const styles = {
  form: {
    width:"300px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    flexDirection:"column",
  },
  login: {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    height:"100%",
    flexDirection:"column",
    overflow:"auto",
  },
  buttons:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    width:"400px",
  },
  button:{
    margin:"10px",
    width:"300px",
    color: "#FFFFFF"
  },
  googleButton:{
    margin:"10px",
    width:"300px",
    color: "#7D7A80"
  }
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.displayName) {
    errors.displayName = "Please enter a display name.";
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation.";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = "Passwords do not match";
  }

  return errors;
};

class Signup extends React.Component {
  handleFormSubmit = values => {
    this.props.signUpUser(values);
  };

  handleGoogleSignIn = () => {
    this.props.loginWithGoogle();
  };
  handleFacebookSignIn = () => {
    this.props.loginWithFacebook();
  };

  renderField = ({ input, label, type, meta: { touched, error } }) =>
    <fieldset className={`form-group ${touched && error ? "has-error" : ""}`}>
      <label className="control-label">
        {label}
      </label>
      <div>
        <input
          {...input}
          placeholder={label}
          className="form-control"
          type={type}
        />
        {touched &&
          error &&
          <div className="help-block">
            {error}
          </div>}
      </div>
    </fieldset>;

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return (
        <div className="alert alert-danger">
          {this.props.authenticationError}
        </div>
      );
    }
    return <div />;
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    return (
      <div style={styles.login} className="signInUp">

        {this.renderAuthenticationError()}

        <form
          style={styles.form}
          onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
        >
          <Field
            name="email"
            type="text"
            component={this.renderField}
            label="Email"
          />
          <Field
            name="displayName"
            type="text"
            component={this.renderField}
            label="Display Name"
          />
          <Field
            name="password"
            type="password"
            component={this.renderField}
            label="Password"
          />
          <Field
            name="passwordConfirmation"
            type="password"
            component={this.renderField}
            label="Password Confirmation"
          />


          <div style={styles.buttons}>
              <FlatButton
                style={styles.button}
                type="submit"
                label="Sign Up"
                backgroundColor="#e74c3c"
                hoverColor="#c0392b"
                icon={<SignUp />}
              />

              <FlatButton
                label="Sign up with Facebook"
                onClick={this.handleFacebookSignIn}
                backgroundColor="#3B5998"
                hoverColor="#5772AC"
                icon={<Facebook />}
                style={styles.button}
              />
              <FlatButton
                label={<span><img src={GoogleG} style={{width:24, height:24, paddingBottom:5, marginRight:10}} />Sign up with Google</span>}
                onClick={this.handleGoogleSignIn}
                backgroundColor="#FFFFFF"
                hoverColor="#EEEEEE"
                style={styles.googleButton}
                />

            </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error,
    loading: state.auth.loading
  };
}

export default connect(mapStateToProps, Actions)(
  reduxForm({
    form: "signup",
    validate
  })(Signup)
);
