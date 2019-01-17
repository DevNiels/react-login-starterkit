import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

interface ILogout {
  onLogout: any;
}

export class Logout extends React.Component<ILogout, any> {
  public componentDidMount() {
    this.props.onLogout();
  }

  public render() {
    return <Redirect to='/' />;
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
