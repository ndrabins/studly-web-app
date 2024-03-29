import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { history } from "../store/configureStore";
import { connect } from "react-redux";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { StudlyTheme } from '../styles/studlyTheme';

import Signup from "./Signup";
import Login from "./Login";
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
          : <Redirect to="/" />}
    />
  );
};

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ StudlyTheme }>
        <ConnectedRouter history={history}>
          <div>
            <Navbar history={history} />
            <div style={{ height: "100vh"}}>
              <Switch>
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
                  path="/"
                  component={Dashboard}
                />
                {/* <Route path="/" component={Error_404} /> */}
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
