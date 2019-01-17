import * as actionTypes from './actionTypes';
import * as action from './authAction';

describe('auth actions', () => {
  it('should return action type AUTH_START on authStart()', () => {
    const returnValue = action.authStart();
    expect(returnValue).toEqual({ type: actionTypes.AUTH_START });
  });

  it('should return action type AUTH_SUCCESS, token and authRole on authSuccess()', () => {
    const returnValue = action.authSuccess('test-token', 'test-authRole');
    expect(returnValue).toEqual({
      type: actionTypes.AUTH_SUCCESS,
      token: 'test-token',
      authRole: 'test-authRole'
    });
  });

  it('should return action type AUTH_FAIL and error on authFail()', () => {
    const returnValue = action.authFail('test-error');
    expect(returnValue).toEqual({
      type: actionTypes.AUTH_FAIL,
      error: 'test-error'
    });
  });

  it('should store authToken to localStorage on auth()', () => {
    // const returnValue = action.auth();
    // Check if localStorage is created
  });
  it('should call authFail on req error on auth()', () => {
    // const returnValue = action.auth();
    // Check if AuthFail(error) is called on req error
  });
  it('should get the token and role and call authSuccess when there is an localStorage item on authCheckState()', () => {
    // const returnValue = action.authCheckState();
    // Check if authSuccess() gets called
  });
  it('should call authLogout when there is an localStorage item on authCheckState() but decoding fails', () => {
    // const returnValue = action.authCheckState();
    // Check if authLogout() gets called
  });
  it('should call authLogout when no localStorage item is there on authCheckState()', () => {
    // const returnValue = action.authCheckState();
    // Check if authLogout() gets called
  });
});
