import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as Actions from "../actions";
import Loader from "../utils/Preloader";

import FlatButton from "material-ui/FlatButton";
import ActionAndroid from "material-ui/svg-icons/action/android";

const styles = {
  form: {
    width:"400px",
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
    backgroundColor:"#303030"
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
  }
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
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
      <div style={styles.login}>

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
                labelColor="#FFFFFF"
                backgroundColor="#1FA186"
                hoverColor="#66CAB6"
              />

              <FlatButton
                label="Sign in with Facebook"
                onClick={this.handleFacebookSignIn}
                backgroundColor="#3B5998"
                labelColor="#FFFFFF"
                hoverColor="#5772AC"
                icon={<ActionAndroid />}
                style={styles.button}
              />
              <FlatButton
                label="Sign in with Google"
                onClick={this.handleGoogleSignIn}
                backgroundColor="#db3236"
                hoverColor="#F0585C"
                icon={<ActionAndroid />}
                style={styles.button}
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
