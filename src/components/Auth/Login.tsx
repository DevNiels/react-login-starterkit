import * as React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { compose } from 'recompose';
import * as actions from '../../store/actions/index';

export interface ILoginProps {
  classes: any;
  history: any;
  authRedirectPath: any;
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
  authRole: string;
  onAuth: any;
}

class Login extends React.Component<ILoginProps, any> {
  public state = {
    password: '',
    username: ''
  };

  public submitLoginForm = (): void => {
    this.props.onAuth(
      this.state.username,
      this.state.password,
      this.props.history
    );
  };

  public handleChange = (name: string) => (event: any): void => {
    this.setState({
      [name]: event.target.value
    });
  };

  public render() {
    const { classes } = this.props;

    let btn = (
      <Button
        variant='contained'
        color='primary'
        onClick={this.submitLoginForm}
      >
        Anmelden
      </Button>
    );

    if (this.props.loading) {
      btn = <CircularProgress className={classes.progress} />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textPrimary'
            variant='h4'
            gutterBottom={true}
          >
            Anmelden
          </Typography>
          <div className={classes.container}>
            <TextField
              id='login-username'
              label='Username'
              className={classes.textField}
              value={this.state.username}
              fullWidth={true}
              onChange={this.handleChange('username')}
              margin='normal'
            />
          </div>
          <div className={classes.container}>
            <TextField
              id='login-password'
              label='Passwort'
              className={classes.textField}
              value={this.state.password}
              type='password'
              fullWidth={true}
              onChange={this.handleChange('password')}
              margin='normal'
            />
          </div>
        </CardContent>
        <CardActions>{btn}</CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRole: state.auth.authRole
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (username: string, password: string, history: any) =>
      dispatch(actions.auth(username, password, history))
  };
};

export default compose(
  withStyles(theme => ({
    card: {
      width: 300,
      minWidth: 275,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: 20
    },
    container: {
      display: 'flex'
    },

    input: {
      margin: theme.spacing.unit
    },
    progress: {
      margin: 10
    }
  })),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
