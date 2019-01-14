import * as React from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import Layout from 'src/hoc/Layout/Layout';

export interface IDashboardProps {
  authRole: string;
}

class Dashboard extends React.Component<IDashboardProps, any> {
  public render() {
    return <Layout>Du bist als {this.props.authRole} eingeloggt.</Layout>;
  }
}

const mapStateToProps = (state: any) => {
  return {
    authRole: state.auth.authRole
  };
};

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(Dashboard);
