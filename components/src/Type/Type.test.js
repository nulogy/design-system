import { Type } from './';

describe('Type', () => {
  it('matches snapshot', () => {
    expect(Type).toBeDefined();
    expect(Type).toMatchSnapshot();
  });
});

Object.keys(Type).forEach(name => (
  describe(`Type.${name}`, () => {
    it('matches snapshot', () => {
      expect(Type[name]).toBeDefined();
      expect(Type[name]).toMatchSnapshot();
    });
  })
));
