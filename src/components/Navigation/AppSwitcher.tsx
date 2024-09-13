import React, { type ReactNode } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import styled from 'styled-components';
import { NAVBAR } from './constants';

const Menu = styled.ul(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  listStyle: 'none',
  // @todo choose a theme shadow
  boxShadow: '0px 6px 12px 2px rgba(1, 30, 56, 0.15)',
  width: 'calc(100vw - (16px * 2))',
  borderRadius: theme.space.x1,
  background: theme.colors.white,
  maxWidth: NAVBAR.maxWidth,
  paddingTop: theme.space.x2,
  paddingBottom: theme.space.x2,
  padingLeft: theme.space.none,
  paddingRight: theme.space.none,
}));

const Link = styled.a(({ theme }) => ({
  textDecoration: 'none',
  width: '100%',
  display: 'flex',
  padding: '12px 24px 16px 24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  transition: 'background-color 250ms ease',

  '&:hover, &:focus': {
    backgroundColor: theme.colors.lightBlue,
  },
}));

const Title = styled.p(({ theme }) => ({
  margin: 0,
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.medium,
  fontWeight: theme.fontWeights.medium,
  lineHeight: theme.lineHeights.base,
}));

const Description = styled.p(({ theme }) => ({
  color: theme.colors.darkGrey,
  margin: 0,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.normal,
  lineHeight: theme.lineHeights.base,
}));

const Item = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'a'>>(
  ({ children, ...props }, forwardedRef) => (
    // @todo: extract styles
    <li style={{ width: '100%' }}>
      <NavigationMenu.Link asChild>
        <Link {...props} ref={forwardedRef}>
          {children}
        </Link>
      </NavigationMenu.Link>
    </li>
  ),
);

const AppSwitcher = Object.assign(
  {},
  {},
  {
    Menu,
    Item,
    Title,
    Description,
  },
);

export default AppSwitcher;
