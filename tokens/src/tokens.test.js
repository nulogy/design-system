import tokens from './tokens';

describe('tokens', () => {
  it('matches snapshot', () => {
    expect(tokens).toMatchSnapshot();
  });
});