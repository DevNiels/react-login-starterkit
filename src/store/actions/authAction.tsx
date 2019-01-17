import axios from 'axios';
import { Base64 } from 'js-base64';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (token: string, authRole: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    authRole
  };
};

export const authFail = (error: any) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const authLogout = () => {
  localStorage.removeItem('authToken');

  return { type: actionTypes.AUTH_LOGOUT };
};

export const auth = (username: string, password: string, history: any) => {
  return (dispatch: any) => {
    dispatch(authStart());
    const authData = {
      username,
      password
    };

    axios
      .post('/account/auth', authData)
      .then(res => {
        // Get the Token from the response
        const { token } = res.data;

        // Set a localeStorage item with the token so the userer stays logged in
        localStorage.setItem(
          'authToken',
          JSON.stringify({
            token
          })
        );

        // Get the name of the role from the token
        const { role } = JSON.parse(Base64.decode(token.split('.')[1]));

        // Dont't redirect to last url if it is '/login', otherwise an infinite loop is created
        if (history.location.pathname !== '/login') {
          history.push(history.location.pathname);
        } else {
          // Redirect to the dashboard
          history.push('/dashboard');
        }

        dispatch(authSuccess(token, role));
      })
      .catch(err => {
        dispatch(authFail(err.data));
      });
  };
};

export const authCheckState = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      dispatch(authLogout());
    } else {
      try {
        // Get the name of the role from the token
        const { role } = JSON.parse(Base64.decode(token.split('.')[1]));
        dispatch(authSuccess(token, role));
      } catch {
        dispatch(authLogout());
      }
    }
  };
};
