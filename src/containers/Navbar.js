import React from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Actions from "../actions";

class Navbar extends React.Component {
  handleSignout() {
    this.props.signOutUser();
  }

  loggedInLinks() {
    return (
      <FlatButton
        onClick={() => this.handleSignout()}
        label="Log out"
      />
    );
  }

  loggedOutLinks() {
    return (
      <div>
        <Link to="/login">
          <FlatButton label="Login" />
        </Link>
        <Link to="/signup">
          <FlatButton label="Sign Up" />
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>

        <AppBar
          title={
            <span style={styles.title}>
              <Link to="/dashboard">Studly</Link>
            </span>
          }
          iconElementLeft={
            this.props.authenticated
              ? <IconButton><NavigationClose /></IconButton>
              : <div></div>
            }
          iconElementRight={
            this.props.authenticated
              ? this.loggedInLinks()
              : this.loggedOutLinks()
          }
        />
      </div>
    );
  }
}

const styles = {
  title: {
    cursor: "pointer"
  }
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, Actions)(Navbar);
