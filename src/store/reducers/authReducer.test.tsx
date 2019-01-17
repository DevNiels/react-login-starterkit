import * as actionTypes from '../actions/actionTypes';
import reducer from './authReducer';

describe('auth reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      authRole: null,
      error: null,
      loading: false
    });
  });

  it('should store the token and authRole upon authSuccess', () => {
    expect(
      reducer(
        {
          token: null,
          authRole: null,
          error: null,
          loading: false
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: 'some-token',
          authRole: 'some-user-role'
        }
      )
    ).toEqual({
      token: 'some-token',
      authRole: 'some-user-role',
      error: null,
      loading: false
    });
  });

  it('should store token and authRole as null upon authLogout', () => {
    expect(
      reducer(
        {
          token: 'some-token',
          authRole: 'some-user-role',
          error: null,
          loading: false
        },
        {
          type: actionTypes.AUTH_LOGOUT
        }
      )
    ).toEqual({
      token: null,
      authRole: null,
      error: null,
      loading: false
    });
  });

  it('should store loding to true and error to null upon authStart', () => {
    expect(
      reducer(
        {
          token: null,
          authRole: null,
          error: 'error',
          loading: false
        },
        {
          type: actionTypes.AUTH_START
        }
      )
    ).toEqual({
      token: null,
      authRole: null,
      error: null,
      loading: true
    });
  });

  it('should store error upon authFail', () => {
    expect(
      reducer(
        {
          token: null,
          authRole: null,
          error: null,
          loading: false
        },
        {
          type: actionTypes.AUTH_FAIL,
          error: 'error'
        }
      )
    ).toEqual({
      token: null,
      authRole: null,
      error: 'error',
      loading: false
    });
  });
});
