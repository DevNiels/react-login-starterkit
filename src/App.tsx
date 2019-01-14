import * as React from 'react';

import { Base64 } from 'js-base64';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { compose } from 'recompose';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import * as actionTypes from './store/actions';

// const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));

export interface IDashboardProps {
  authRole: string;
  onIsLoggedIn: any;
}

class App extends React.Component<IDashboardProps, any> {
  public componentDidMount() {
    // Set a localeStorage item with the token so the userer stays logged in
    const token = localStorage.getItem('loggedInUser');

    if (token) {
      // Get the name of the role from the token
      const { role } = JSON.parse(Base64.decode(token.split('.')[1]));

      // Set new authRole to the redux state
      this.props.onIsLoggedIn(role);
    }
  }

  public renderLazyComponent = (component: any) => {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        {component}
      </React.Suspense>
    );
  };

  public render() {
    return (
      <Router>
        {this.props.authRole ? (
          <Switch>
            <Route path='/login' exact={true} component={Login} />
            <Route path='/dashboard' exact={true} component={Dashboard} />
            {/* <Route
              path='/dashboard'
              exact={true}
              render={this.renderLazyComponent.bind(this, <Dashboard />)}
            /> */}

            <Redirect from='/' to='/dashboard' />
          </Switch>
        ) : (
          <Route path='/' component={Login} />
        )}
      </Router>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    authRole: state.auth.authRole
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIsLoggedIn: (role: string) =>
      dispatch({ type: actionTypes.LOGIN_USER, payload: { authRole: role } })
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
