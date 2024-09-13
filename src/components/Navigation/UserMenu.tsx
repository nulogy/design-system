import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import styled from 'styled-components';
import { NAVBAR } from './constants';

export const HorizontalDivider = styled('span')({
  display: 'inline-block',
  height: 1,
  width: '100%',
  backgroundColor: '#E4E7EB',
  marginTop: 24,
  marginBottom: 24,
});

type UserMenuProps = {
  children?: React.ReactNode;
};

type UserMenuOptions = UserMenuOption[];

type UserMenuOption = {
  label: string;
  key?: string;
} & (UserMenuButton | UserMenuLink);

type UserMenuButton = {
  type: 'button';
  props?: React.ComponentPropsWithoutRef<typeof NavigationMenu.Trigger>;
};

type UserMenuLink = {
  type: 'link';
  props?: React.ComponentPropsWithoutRef<typeof NavigationMenu.Link>;
};

export const Options = ({ options }: { options: UserMenuOptions }) => {
  return (
    <NavigationMenu.Sub orientation="vertical">
      <NavigationMenu.List style={{ listStyle: 'none', padding: '0' }}>
        {options.map((options) =>
          options.type === 'button' ? (
            <NavigationMenu.Item value={options.label} key={options.key ?? options.label}>
              <NavigationMenu.Trigger
                {...options.props}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  userSelect: 'none',
                  display: 'block',
                  color: 'var(--ui-dark-grey, #434D59)',
                  fontFamily: 'IBM Plex Sans',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '16px /* 114.286% */',
                  padding: 0,
                  paddingTop: 8 + 4,
                  paddingBottom: 8 + 4,
                  textAlign: 'left',
                }}
              >
                {options.label}
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item value={options.label} key={options.key ?? options.label}>
              <NavigationMenu.Link
                {...options.props}
                style={{
                  display: 'block',
                  color: 'var(--ui-dark-grey, #434D59)',
                  fontFamily: 'IBM Plex Sans',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '16px /* 114.286% */',
                  paddingTop: 8 + 4,
                  paddingBottom: 8 + 4,
                  textDecoration: 'none',
                }}
              >
                {options.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>
    </NavigationMenu.Sub>
  );
};

export const Header = ({ headerName, headerEmail, ...props }: { headerName: string; headerEmail: string }) => {
  return (
    <div
      style={{
        padding: '0 24px',
        display: 'flex',
        height: '104px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: '#F0F2F5',
      }}
      {...props}
    >
      <p
        style={{
          color: '#434D59',
          textAlign: 'center',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '24px',
          margin: 0,
        }}
      >
        {headerName}
      </p>
      <p
        style={{
          color: '#434D59',
          textAlign: 'center',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '24px',
          margin: 0,
        }}
      >
        {headerEmail}
      </p>
    </div>
  );
};

export const Content = styled('div')({
  padding: 16,
});

const UserMenuWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // @todo choose a theme shadow
  boxShadow: '0px 6px 12px 2px rgba(1, 30, 56, 0.15)',
  width: 'calc(100vw - (16px * 2))',
  borderRadius: theme.space.x1,
  background: theme.colors.white,
  maxWidth: NAVBAR.maxWidth,
  paddingTop: theme.space.x2,
  paddingBottom: theme.space.x2,
  paddingLeft: theme.space.none,
  paddingRight: theme.space.none,
  overflow: 'hidden',
}));

export const UserMenu = Object.assign(
  React.forwardRef<HTMLDivElement, UserMenuProps>(({ children }, forwardedRef) => (
    <UserMenuWrapper ref={forwardedRef}>{children}</UserMenuWrapper>
  )),
  {
    Content,
    Header,
    items: [
      {
        label: 'This is another submenu',
        type: 'link',
        menuItemProps: {
          href: '/go-to-something-else',
        },
      },
    ],
    Options,
  },
);

export default UserMenu;
