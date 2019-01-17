import { updateObject } from './utility';

describe('utility', () => {
  it('updateObject function', () => {
    const object = { a: 1 };
    const values = { b: 2 };

    const newObjects = updateObject(object, values);

    expect(newObjects).toEqual({ ...object, ...values });
  });
});
