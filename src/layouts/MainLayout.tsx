import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import Sidenav from '../components/Sidenav/Sidenav';

export interface IMainLayoutProps {
  children: any;
  classes: any;
}

export const MainLayout = (props: IMainLayoutProps) => {
  const { classes } = props;

  return (
    <>
      <Sidenav>
        <main className={classes.Content}>{props.children}</main>
      </Sidenav>
    </>
  );
};
export default compose(
  withStyles(theme => ({
    Content: {
      marginTop: 72
    }
  })),
  withRouter
)(MainLayout);
