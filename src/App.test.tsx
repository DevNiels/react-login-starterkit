import * as Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Route } from 'react-router-dom';
import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const propsLoggtOut = {
    isAuthenticated: false,
    authRole: null,
    onTryAutoSignup: jest.fn()
  };
  const propsLoggtIn = {
    isAuthenticated: true,
    authRole: 'Member',
    onTryAutoSignup: jest.fn()
  };

  const wrappedLoggtOut = shallow(<App {...propsLoggtOut} />);
  const wrappedLoggtIn = shallow(<App {...propsLoggtIn} />);

  return {
    wrappedLoggtOut,
    wrappedLoggtIn
  };
};

describe('<App />', () => {
  it('has only one Route when user is loggt out', () => {
    const { wrappedLoggtOut } = setup();
    expect(wrappedLoggtOut.find(Route).length).toEqual(1);
  });

  it('has more then one Route whenuser is loggt in', () => {
    const { wrappedLoggtIn } = setup();
    expect(wrappedLoggtIn.find(Route).length).toBeGreaterThan(2);
  });
});
