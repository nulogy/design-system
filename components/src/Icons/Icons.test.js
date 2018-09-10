import * as Icons from './';

describe('Icons', () => {
  it('matches snapshot', () => {
    expect(Icons).toBeDefined();
    expect(Icons).toMatchSnapshot();
  });
});

Object.keys(Icons).forEach(name => (
  describe(name, () => {
    it('matches snapshot', () => {
      expect(Icons[name]).toBeDefined();
      expect(Icons[name]).toMatchSnapshot();
    });
  })
));