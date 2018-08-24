import tokens from './tokens';

describe('tokens', () => {
  it('is valid js', () => {
    expect(tokens).toMatchSnapshot();
  });
});