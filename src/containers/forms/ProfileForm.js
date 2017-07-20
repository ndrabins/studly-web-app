import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import { updateProfile } from "../../actions";

const styles = {

};

class ProfileForm extends Component {
  render() {
    return (
      <div>
        profile form
      </div>
    );
  }
}
// Decorate with redux-form
function mapStateToProps(state) {
  return {
    user : state.auth.user
  };
}

export default connect(mapStateToProps, { updateProfile })(
  reduxForm({
    form: "updateProfileForm"
    // validate
  })(ProfileForm)
);

