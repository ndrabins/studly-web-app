import React from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import Avatar from "material-ui/Avatar";
import FileFolder from "material-ui/svg-icons/file/folder";

import studlyLogo from "../static/studly.png";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Actions from "../actions";

class Navbar extends React.Component {
  handleSignout() {
    this.props.signOutUser();
  }

  loggedInLinks() {
    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
        <Avatar icon={<FileFolder />} />
        {/*src="images/uxceo-128.jpg"  */}
        <FlatButton
          style={{ color: "#FFFFFF" }}
          containerElement={<Link to={`/dashboard/profile`} />}
          label="Profile"
        />
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      </div>
    );
  }
  //  <FlatButton onClick={() => this.handleSignout()} label="Log out" />

  loggedOutLinks() {
    return (
      <div style={{ marginTop: "7px" }}>
        <FlatButton
          style={{ color: "#FFFFFF" }}
          containerElement={<Link to={`/login`} />}
          label="Login"
        />
        <FlatButton
          style={{ color: "#FFFFFF" }}
          containerElement={<Link to={`/signup`} />}
          label="Sign Up"
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <AppBar
          style={{ position: "fixed", backgroundColor: "#5BC891" }}
          title={
            <span style={styles.title}>
              <Link style={{ color: "#ffffff", hover: "none" }} to="/dashboard">
                Studly
              </Link>
            </span>
          }
          onTitleTouchTap={this.handleTouchTap}
          iconElementLeft={
            <img style={{ height: "50px", width: "50px" }} src={studlyLogo} />
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
    authenticated: state.auth.authenticated,
    // photoUrl : state.auth.user.photoUrl
  };
}

export default connect(mapStateToProps, Actions)(Navbar);
