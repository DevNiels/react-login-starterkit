import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      authRole: null,
      error: null,
      loading: false
    });
  });

  it('should store the token upon login', () => {
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
});
