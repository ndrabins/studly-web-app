import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { history } from "../store/configureStore";
import { connect } from "react-redux";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Favorites from "./Favorites";
import Dashboard from "./Dashboard";
import Navbar from './Navbar';
import Error_404 from '../components/error_404';

const PrivateRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        authenticated === true
          ? <Component {...props} />
          : <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />}
    />
  );
};

const PublicRoute = ({ component: Component, authenticated, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        authenticated === false
          ? <Component {...props} />
          : <Redirect to="/dashboard" />}
    />
  );
};

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <ConnectedRouter history={history}>
          <div>
            <Navbar />
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute
                  authenticated={this.props.authenticated}
                  path="/signup"
                  component={Signup}
                />
                <PublicRoute
                  authenticated={this.props.authenticated}
                  path="/login"
                  component={Login}
                />
                <PrivateRoute
                  authenticated={this.props.authenticated}
                  path="/favorites"
                  component={Favorites}
                />
                <PrivateRoute
                  authenticated={this.props.authenticated}
                  path="/dashboard"
                  component={Dashboard}
                />
                <Route path="/" component={Error_404} />
              </Switch>
            </div>
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(App);
