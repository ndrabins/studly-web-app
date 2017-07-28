import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Actions from "../actions";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";

import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

import Avatar from "material-ui/Avatar";

import studlyLogo from "../static/studlyLogo.svg";

class Navbar extends React.Component {
  handleSignout() {
    this.props.actions.signOutUser();
  }

  loggedInLinks() {
    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
        <Avatar src={this.props.user.photoURL} />
        {/*src="images/uxceo-128.jpg"  */}
        <FlatButton
          style={{ color: "#FFFFFF" }}
          containerElement={<Link to={`/dashboard/profile`} />}
          label="Profile"
        />
        <IconMenu
          style={{color:"#FFFFFF" }}
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem primaryText="Sign out" onClick={this.handleSignout.bind(this)} />
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

  handleTouchMenu(){
    this.props.actions.toggleNav(this.props.sideNavOpen)
  }

  render() {
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap = { this.handleTouchMenu.bind(this) }
          style={{ position: "fixed", backgroundColor: "#303030" }}
          title={
            <span style={styles.title}>
              <Link style={{ color: "#ffffff", hover: "none" }} to="/dashboard">
                <img style={{ height: "90px", width: "90px", paddingBottom:"20px"}} src={studlyLogo} />
              </Link>
            </span>
          }
          onTitleTouchTap={this.handleTouchTap}
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
    user: state.auth.user,
    sideNavOpen: state.utility.sideNavOpen
    // photoUrl : state.auth.user.photoUrl
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
