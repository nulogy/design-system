import React, { useLayoutEffect, useState } from "react";
import styled, { useTheme, CSSObject } from "styled-components";
import { useResizeDetector } from "react-resize-detector";
import { useTranslation } from "react-i18next";
import {
  color,
  space,
  typography,
  SpaceProps,
  TypographyProps,
  ColorProps,
  OverflowProps,
  overflow,
  LayoutProps,
  layout,
  compose,
} from "styled-system";
import { Box, DesktopMenu, EnvironmentBanner, Flex, Icon, NavBarBackground, SmallNavBar } from "../index";
import { MenuIcon } from "../NavBar/NavBar";
import NewMenuTriggerButton, { NewMenuTriggerButtonProps } from "./NewMenuTriggerButton";

export type StyleProps = SpaceProps & OverflowProps & LayoutProps & TypographyProps & ColorProps;

export const stylePropsToCss: (props: StyleProps) => CSSObject = compose(space, overflow, layout, typography, color);

export type NavBarWithResizablePrimaryMenuProps = {
  menuData?: {
    primaryMenu: MenuParentItem[];
    secondaryMenu: MenuParentItem[];
  };
  subtext?: string;
  environment?: string;
  brandingLinkHref?: string;
  className?: string;
  breakpointUpper?: number | string;
  defaultOpen?: boolean;
  logo?: (props: { brandingLinkHref: string; width: number }) => React.ReactElement;
};
// TODO: Should we have some default Nulogy logo, in case if logo props was not provided?
// TODO: Use for logo ./BrandLogoContainer.tsx
const NavBarWithResizablePrimaryMenu: React.FC<NavBarWithResizablePrimaryMenuProps> = ({
  menuData,
  breakpointUpper = "medium",
  brandingLinkHref = "/",
  logo,
  ...props
}) => {
  const primaryMenu = filterDisabledMenuItems(menuData.primaryMenu);
  const secondaryMenu = filterDisabledMenuItems(menuData.secondaryMenu);
  const { width: rawWidth, ref } = useResizeDetector({ handleHeight: false });
  const width = rawWidth || (typeof window !== "undefined" && window.innerWidth) || 0;

  return (
    <div ref={ref}>
      <SelectNavBarBasedOnWidth
        breakpointUpper={breakpointUpper}
        width={width}
        menuData={{ primaryMenu, secondaryMenu }}
        logo={logo && logo({ brandingLinkHref, width })}
        {...props}
      />
    </div>
  );
};

export default NavBarWithResizablePrimaryMenu;

const themeColorObject = {
  color: "darkBlue",
  hoverColor: "blackBlue",
  background: "white",
  hoverBackground: "whiteGrey",
  textColor: "blackBlue",
  logoColor: "blue",
};

type MediumNavBarProps = {
  menuData?: any;
  environment?: "development" | "training";
  logo: React.ReactNode;
  showNulogyLogo?: boolean;
  subtext?: string;
  width: number;
};

const MediumNavBar: React.FC<MediumNavBarProps> = ({ menuData, environment, logo, width, ...props }) => {
  const { t } = useTranslation();
  const originalPrimaryMenu = menuData.primaryMenu;

  const { width: leftMenuWidth, ref: leftMenuRef } = useResizeDetector({ handleHeight: false });
  const { width: rightMenuWidth, ref: rightMenuRef } = useResizeDetector({ handleHeight: false });

  const moreMenuSize = useMoreMenuSize({
    maxMoreMenuSize: originalPrimaryMenu.length,
    distance: width - ((leftMenuWidth || 0) + (rightMenuWidth || 0) + BACKGROUND_PADDING),
    growThreshold: LARGEST_MENU_ELEM_WIDTH + MIN_MENU_SPACING,
    shrinkThreshold: MIN_MENU_SPACING,
  });
  const primaryMenu = originalPrimaryMenu.slice(0, originalPrimaryMenu.length - moreMenuSize);
  const moreMenu = originalPrimaryMenu.slice(originalPrimaryMenu.length - moreMenuSize, originalPrimaryMenu.length);
  if (moreMenuSize > 0) {
    primaryMenu.push({
      trigger: () => <NewMenuButtonWithChevron icon="downArrow">{t("More")}</NewMenuButtonWithChevron>,
      key: "more",
      items: moreMenu,
    });
  }

  return (
    <>
      {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
      <header {...props}>
        <NavBarBackground backgroundColor="white" height={NAVBAR_HEIGHT}>
          <Flex justifyContent="space-between" flexGrow={1} alignItems="center">
            <Flex ref={leftMenuRef} alignItems="center">
              <Box mr="x3">{logo}</Box>
              {primaryMenu && (
                <DesktopMenu
                  themeColorObject={themeColorObject}
                  aria-label={t("primary navigation")}
                  menuData={primaryMenu}
                  menuType="primary"
                />
              )}
            </Flex>
            <Flex ref={rightMenuRef} alignItems="center">
              {menuData.secondaryMenu && (
                <DesktopMenu
                  themeColorObject={themeColorObject}
                  aria-label={t("secondary navigation")}
                  menuData={menuData.secondaryMenu}
                  menuType="secondary"
                />
              )}
            </Flex>
          </Flex>
        </NavBarBackground>
      </header>
    </>
  );
};

const pixelDigitsFrom = (pixelString) => parseInt(pixelString, 10);

const SelectNavBarBasedOnWidth = ({ width, defaultOpen, breakpointUpper, ...props }: any) => {
  const { breakpoints } = useTheme();
  const breakpoint = breakpoints[breakpointUpper] || breakpointUpper;

  if (width >= pixelDigitsFrom(breakpoint)) {
    return <MediumNavBar width={width} {...props} />;
  }
  return (
    <SmallNavBar
      {...props}
      width={width}
      defaultOpen={defaultOpen}
      themeColorObject={themeColorObject}
      navBarHeight={NAVBAR_HEIGHT}
      renderMenuButton={({ onClick, isOpen, ariaExpanded }) => (
        <NewMenuTriggerButton height="x5" onClick={onClick} aria-expanded={ariaExpanded}>
          <MenuIcon isOpen={isOpen} />
        </NewMenuTriggerButton>
      )}
    />
  );
};

const filterItems = (menuItems) => {
  return menuItems.filter(({ isEnabled }) => isEnabled !== false);
};

function filterDisabledMenuItems(menuItems) {
  console.log({ menuItems });
  return menuItems
    .map((item) => {
      if (item.items) {
        console.log({ items: item.items });
        const itemsWithSubMenuFiltered = item.items.map((subMenuItem) => {
          if (subMenuItem.items && subMenuItem.items.length > 0) {
            return { ...subMenuItem, items: filterItems(subMenuItem.items) };
          }
          return subMenuItem;
        });

        const filteredItems = filterItems(itemsWithSubMenuFiltered);
        return filteredItems.length === 0 ? null : { ...item, items: filteredItems };
      }
      return item;
    })
    .filter((item) => {
      if (!item) {
        return false;
      }
      const isEnabled = item.isEnabled !== false;
      return isEnabled && !(item.items && item.items.length === 0);
    });
}

export const HAMBURGER_BREAKPOINT = 1024;
const MIN_MENU_SPACING = 64;
export const NAVBAR_HEIGHT = "56px";
const LARGEST_MENU_ELEM_WIDTH = 201; // width of the largest primary menu element in French
const BACKGROUND_PADDING = 48; // width of the padding at the edges of the NavBarBackground

type NewMenuButtonWithChevronProps = NewMenuTriggerButtonProps & {
  icon: string;
};

const NewMenuButtonWithChevron: React.FC<NewMenuButtonWithChevronProps> = React.forwardRef(
  ({ children, icon, ...otherProps }, ref) => {
    return (
      <StyledNewMenuButton {...otherProps} ref={ref}>
        <Flex justifyContent="space-between" alignItems="center">
          {children}
          <Icon icon={icon} size="20px" p="2px" />
        </Flex>
      </StyledNewMenuButton>
    );
  }
);

const StyledNewMenuButton = styled(NewMenuTriggerButton)(({ theme }) => ({
  "> div > svg": {
    fill: theme.colors.darkGrey,
  },
  "&:hover > div > svg, &:focus > div > svg": {
    fill: theme.colors.darkBlue,
  },
}));

interface UseMoreMenuSizeProps {
  maxMoreMenuSize: number;
  distance: number;
  growThreshold: number;
  shrinkThreshold: number;
}

function useMoreMenuSize({ maxMoreMenuSize, distance, growThreshold, shrinkThreshold }: UseMoreMenuSizeProps) {
  const [moreMenuSize, setMoreMenuSize] = useState<number>(0);

  useLayoutEffect(() => {
    if (distance === undefined) return;
    if (distance > growThreshold) {
      showLeftMenuElem();
    } else if (distance < shrinkThreshold) {
      hideLeftMenuElem();
    }

    function hideLeftMenuElem() {
      setMoreMenuSize((prev) => (prev < maxMoreMenuSize ? prev + 1 : prev));
    }
    function showLeftMenuElem() {
      setMoreMenuSize((prev) => (prev > 0 ? prev - 1 : prev));
    }
  }, [distance, growThreshold, maxMoreMenuSize, shrinkThreshold]);

  return moreMenuSize;
}

interface MenuParentItem {
  name?: string | React.ReactNode | React.ReactElement;
  key?: string;
  items?: MenuItem[];
  trigger?: (props: any) => React.ReactElement;
  render?: (config: { size: string | number; layer: string }) => React.ReactElement;
}

interface MenuItem {
  name?: string;
  to?: string;
  href?: string;
  as?: React.ReactElement;
  isEnabled?: boolean;
  items?: MenuItem[];
}

export interface NewNavBarProps {
  primaryMenu: MenuParentItem[];
  secondaryMenu: MenuParentItem[];
  defaultOpen?: boolean;
  environment?: string;
}

type ProgressiveMenuButtonProps = {
  size: string;
  layer: number;
  defaultRender: () => React.ReactElement;
  children: React.ReactNode;
};
