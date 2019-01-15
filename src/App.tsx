import * as React from 'react';

import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { compose } from 'recompose';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Dashboard from './components/core/Dashboard';
import * as actions from './store/actions/index';

// const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));

export interface IDashboardProps {
  isAuthenticated: boolean;
  authRole: string;
  onTryAutoSignup: any;
}

class App extends React.Component<IDashboardProps, any> {
  public componentDidMount() {
    this.props.onTryAutoSignup();
  }

  public renderLazyComponent = (component: any) => {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        {component}
      </React.Suspense>
    );
  };

  public render() {
    let routes = (
      <Switch>
        <Route path='/' component={Login} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/login' exact={true} component={Login} />
          <Route path='/dashboard' exact={true} component={Dashboard} />
          <Route path='/logout' component={Logout} />
          <Redirect exact={true} from='/' to='/dashboard' />
          <Redirect to='/' />
          {/* <Route
              path='/dashboard'
              exact={true}
              render={this.renderLazyComponent.bind(this, <Dashboard />)}
            /> */}
        </Switch>
      );
    }
    return <Router>{routes}</Router>;
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRole: state.auth.authRole
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
