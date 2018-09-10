import {
  Button,
  ApprovalButton,
  DangerButton,
  QuietButton,
  LinkButton
} from './';

describe('Button', () => {
  it('matches snapshot', () => {
    expect(Button).toBeDefined();
    expect(Button).toMatchSnapshot();
  });
});

describe('ApprovalButton', () => {
  it('matches snapshot', () => {
    expect(ApprovalButton).toBeDefined();
    expect(ApprovalButton).toMatchSnapshot();
  });
});

describe('DangerButton', () => {
  it('matches snapshot', () => {
    expect(DangerButton).toBeDefined();
    expect(DangerButton).toMatchSnapshot();
  });
});

describe('QuietButton', () => {
  it('matches snapshot', () => {
    expect(QuietButton).toBeDefined();
    expect(QuietButton).toMatchSnapshot();
  });
});
  
describe('LinkButton', () => {
  it('matches snapshot', () => {
    expect(LinkButton).toBeDefined();
    expect(LinkButton).toMatchSnapshot();
  });
});
  