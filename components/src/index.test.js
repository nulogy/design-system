import {
  Button,
  ApprovalButton,
  DangerButton,
  LinkButton,
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

describe('LinkButton', () => {
  it('matches snapshot', () => {
    expect(LinkButton).toBeDefined();
    expect(LinkButton).toMatchSnapshot();
  });
});
  