import * as React from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import MainLayout from '../../layouts/MainLayout';

export interface IDashboardProps {
  authRole: string;
  children?: any;
}

export const Dashboard = (props: IDashboardProps) => {
  return <MainLayout>Du bist als {props.authRole} eingeloggt.</MainLayout>;
};

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
