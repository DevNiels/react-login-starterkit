import * as Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Dashboard } from './Dashboard';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    authRole: 'Member'
  };
  const wrapped = shallow(<Dashboard {...props} />);
  return {
    wrapped
  };
};

describe('<Dashboard />', () => {
  it('contains the MainLayout components', () => {
    const { wrapped } = setup();
    expect(wrapped.find(MainLayout).length).toEqual(1);
  });
});
