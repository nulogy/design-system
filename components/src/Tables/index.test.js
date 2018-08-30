import * as TableComponents from './';

describe('Table', () => {
  it('works', () => {
    expect(TableComponents).toBeDefined();
    expect(TableComponents).toMatchSnapshot();
  });
});