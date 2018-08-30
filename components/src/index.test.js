import * as AllComponents from './';

describe('All Components', () => {
  it('matches snapshot', () => {
    expect(AllComponents).toBeDefined();
    expect(AllComponents).toMatchSnapshot();
  });
});
