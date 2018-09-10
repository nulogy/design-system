import * as Buttons from './';

describe('Buttons', () => {
  it('matches snapshot', () => {
    expect(Buttons).toBeDefined();
    expect(Buttons).toMatchSnapshot();
  });
});

Object.keys(Buttons).forEach(name => (
  describe(name, () => {
    it('matches snapshot', () => {
      expect(Buttons[name]).toBeDefined();
      expect(Buttons[name]).toMatchSnapshot();
    });
  })
));
