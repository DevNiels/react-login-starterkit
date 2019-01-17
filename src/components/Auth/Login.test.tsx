import * as Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Login } from './Login';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    classes: '',
    history: '',
    loading: false,
    error: 'Error',
    isAuthenticated: false,
    authRole: 'Member',
    onAuth: jest.fn()
  };
  const popsLoading = {
    ...props,
    loading: true,
    error: null
  };

  const wrapped = shallow(<Login {...props} />);
  const wrappedLoading = shallow(<Login {...popsLoading} />);
  return {
    wrapped,
    wrappedLoading
  };
};

describe('<Login />', () => {
  it('contains the Button but no CircularProgress on loading: false', () => {
    const { wrapped } = setup();
    expect(wrapped.find(Button).length).toEqual(1);
    expect(wrapped.find(CircularProgress).length).toEqual(0);
  });
  it('contains the CircularProgress but no Button on loading: true', () => {
    const { wrappedLoading } = setup();
    expect(wrappedLoading.find(Button).length).toEqual(0);
    expect(wrappedLoading.find(CircularProgress).length).toEqual(1);
  });
  it('contains no errorMessage on loading: false', () => {
    const { wrappedLoading } = setup();
    expect(wrappedLoading.find('p').length).toEqual(0);
  });
  it('contains an errorMessage on loading: true', () => {
    const { wrapped } = setup();
    expect(wrapped.find('p').text()).toEqual('Error');
  });
});
