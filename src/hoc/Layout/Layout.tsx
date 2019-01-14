import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import Sidenav from '../../components/Sidenav/Sidenav';

export interface ILayoutProps {
  children: any;
  classes: any;
}

class Layout extends React.Component<ILayoutProps, any> {
  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Sidenav>
          <main className={classes.Content}>{this.props.children}</main>
        </Sidenav>
      </React.Fragment>
    );
  }
}
export default compose(
  withStyles(theme => ({
    Content: {
      marginTop: 72
    }
  })),
  withRouter
)(Layout);
