import * as Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import Sidenav from '../components/Sidenav/Sidenav';
import { MainLayout } from './MainLayout';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    children: 'test',
    classes: ''
  };
  const wrapped = shallow(<MainLayout {...props} />);
  return {
    wrapped
  };
};

describe('<MainLayout />', () => {
  it('contains the Sidenav components', () => {
    const { wrapped } = setup();
    expect(wrapped.find(Sidenav).length).toEqual(1);
  });
  it('it adds the children inside the <main></main>', () => {
    const { wrapped } = setup();
    expect(wrapped.find('main').text()).toEqual('test');
  });
});
