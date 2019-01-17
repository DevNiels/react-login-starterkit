import * as Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { AppBar } from '@material-ui/core';
import { Sidenav } from './Sidenav';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    authRole: 'Member',
    isAuthenticated: true,
    children: 'test',
    history: '',
    classes: ''
  };
  const wrapped = shallow(<Sidenav {...props} />);
  return {
    wrapped
  };
};

describe('<Sidenav />', () => {
  it('contains the AppBar components', () => {
    const { wrapped } = setup();
    expect(wrapped.find(AppBar).length).toEqual(1);
  });
});
