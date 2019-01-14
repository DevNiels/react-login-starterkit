import * as React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Base64 } from 'js-base64';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import * as actionTypes from '../../store/actions';

export interface ILoginProps {
  classes: any;
  history: any;
  onLogin: any;
}

class Login extends React.Component<ILoginProps, any> {
  public state = {
    password: '',
    username: ''
  };

  public submitLoginForm = (): void => {
    const data = {
      password: this.state.password,
      username: this.state.username
    };
    axios.post('/account/auth', data).then(res => {
      // Check if req was a success
      if (res.status === 200) {
        // Get the Token from the response
        const { token } = res.data;

        // Set a localeStorage item with the token so the userer stays logged in
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({
            token
          })
        );

        // Get the name of the role from the token
        const { role } = JSON.parse(Base64.decode(token.split('.')[1]));

        // Set redux state authRole
        this.props.onLogin(role);

        // Redirect to the dashboard
        if (role) {
          // Dont't redirect to last url if it is '/login', otherwise an infinite loop is created
          if (this.props.history.location.pathname !== '/login') {
            this.handleLinkClick(this.props.history.location.pathname);
          } else {
            this.handleLinkClick('/dashboard');
          }
        }
      }
    });
  };

  public handleChange = (name: string) => (event: any): void => {
    this.setState({
      [name]: event.target.value
    });
  };

  public handleLinkClick = (url: string): void => {
    this.props.history.push(url);
    // tslint:disable-next-line:no-console
    console.log();
  };

  public render() {
    const { classes } = this.props;
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
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            onClick={this.submitLoginForm}
          >
            Anmelden
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    authRole: state.authRole
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogin: (role: string) =>
      dispatch({ type: actionTypes.LOGIN_USER, payload: { authRole: role } })
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
    }
  })),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
