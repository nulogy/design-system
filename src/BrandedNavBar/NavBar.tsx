import React, { useLayoutEffect, useState } from "react";
import styled, { useTheme, CSSObject } from "styled-components";
import ReactResizeDetector, { useResizeDetector } from "react-resize-detector";
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
import {
  Box,
  Branding,
  BrandLogoContainer,
  DesktopMenu,
  EnvironmentBanner,
  Flex,
  Icon,
  Link,
  NavBarBackground,
  SmallNavBar,
  ThemeType,
} from "../index";
import { MenuIcon } from "../NavBar/NavBar";
import { NulogyLogoContainer } from "./NulogyLogoContainer";

export type StyleProps = SpaceProps & OverflowProps & LayoutProps & TypographyProps & ColorProps;

export const stylePropsToCss: (props: StyleProps) => CSSObject = compose(space, overflow, layout, typography, color);

export type NavBarWithResizablePrimaryMenuProps = {
  menuData?: any;
  subtext?: string;
  environment?: string;
  brandingLinkHref?: string;
  className?: string;
  breakpointUpper?: number | string;
  defaultOpen?: boolean;
};

const NavBarWithResizablePrimaryMenu: React.FC<NavBarWithResizablePrimaryMenuProps> = ({
  menuData,
  breakpointUpper = "medium",
  brandingLinkHref = "/",
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
        logo={<ProgressiveNulogyLogo width={width} brandingLinkHref={brandingLinkHref} />}
        {...props}
      />
    </div>
  );
};

export default NavBarWithResizablePrimaryMenu;

// export const NAVBAR_HEIGHT = "56px";

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

function MediumNavBar({ menuData, environment, logo, width, ...props }: MediumNavBarProps) {
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
}

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
        <NewMenuButton height="x5" onClick={onClick} aria-expanded={ariaExpanded}>
          <MenuIcon isOpen={isOpen} />
        </NewMenuButton>
      )}
    />
  );
};

const filterItems = (menuItems) => {
  return menuItems.filter(({ isEnabled }) => isEnabled !== false);
};

function filterDisabledMenuItems(menuItems) {
  return menuItems
    .map((item) => {
      if (item.items) {
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

const HAMBURGER_BREAKPOINT = 1024;
const MIN_MENU_SPACING = 64;
const NAVBAR_HEIGHT = "56px";
const LARGEST_MENU_ELEM_WIDTH = 201; // width of the largest primary menu element in French
const BACKGROUND_PADDING = 48; // width of the padding at the edges of the NavBarBackground

const NewMenuButton: React.FC<NewMenuButtonProps> = styled.button(
  ({ theme }) => ({
    color: theme.colors.darkGrey,
    backgroundColor: "transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
    border: "none",
    padding: theme.space.x1,
    fontSize: theme.fontSizes.small,
    fontWeight: theme.fontWeights.medium,
    lineHeight: theme.space.x3,
    borderRadius: theme.sizes.x1,
    transition: ".2s",
    "&:hover": {
      color: theme.colors.darkBlue,
      backgroundColor: theme.colors.lightBlue,
    },
    "&: focus": {
      outline: "none",
      color: theme.colors.darkBlue,
      backgroundColor: theme.colors.white,
      boxShadow: theme.shadows.focus,
      "&:hover": {
        backgroundColor: theme.colors.lightBlue,
      },
    },
    "&: active": {
      color: theme.colors.darkBlue,
      backgroundColor: theme.colors.lightBlue,
      boxShadow: theme.shadows.focus,
    },
  }),
  stylePropsToCss
);
NewMenuButton.displayName = "NewMenuButton";

// NDS should really export this instead of us having to re-create it here
export type NewMenuButtonProps = React.ComponentPropsWithRef<"button"> &
  StyleProps & {
    color?: string;
    disabled?: boolean;
    theme?: ThemeType;
    hoverColor?: string;
    bgHoverColor?: string;
  };

type NewMenuButtonWithChevronProps = NewMenuButtonProps & {
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
NewMenuButtonWithChevron.displayName = "NewMenuButtonWithChevron";

const StyledNewMenuButton = styled(NewMenuButton)(({ theme }) => ({
  "> div > svg": {
    fill: theme.colors.darkGrey,
  },
  "&:hover > div > svg, &:focus > div > svg": {
    fill: theme.colors.darkBlue,
  },
}));

type ProgressiveNulogyLogoProps = {
  brandingLinkHref: string;
  width: number;
};

function ProgressiveNulogyLogo({ brandingLinkHref, width }: ProgressiveNulogyLogoProps) {
  const { t } = useTranslation();
  const logoType = width >= 1920 ? "wordmark" : "lettermark";
  return (
    <Link
      aria-label={t("Home")}
      as={Link}
      to={brandingLinkHref}
      underline={false}
      lineHeight="1"
      style={{ display: "block" }}
    >
      <Branding size="medium" logoType={logoType} logoColor="blue" />
    </Link>
  );
}

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

// type BaseNavBarProps = {
//   menuData?: any;
//   className?: string;
//   breakpointUpper?: number | string;
//   environment?: "training" | "development" | undefined;
//   subtext?: string;
//   brandingLinkHref?: string;
//   logoSrc?: string;
// };

// const BaseNavBar = ({ environment, breakpointUpper = "medium", ...props }: BaseNavBarProps) => {
//   const { breakpoints } = useTheme();
//   return (
//     <ReactResizeDetector handleWidth>
//       <SelectNavBarBasedOnWidth
//         breakpointUpper={breakpoints[breakpointUpper] || breakpointUpper}
//         {...props}
//         environment={environment}
//       />
//     </ReactResizeDetector>
//   );
// };

// const NavBar = styled(BaseNavBar)({});

// export default NavBar;

export interface NewNavBarProps {
  masterDataClient: ApolloClient<object>;
  defaultOpen?: boolean;
  width?: number;
}

export default function NewNavBar({ currentUser, masterDataClient, defaultOpen, width }: NewNavBarProps) {
  const [triggeredErrorToast, setTriggeredErrorToast] = useState(false);
  const { t } = useTranslation();
  const session = new SessionHelper();
  const { organization } = currentUser;

  const { loading: orderManagementSettingsLoading, data: orderManagementSettingsData } = useQuery(
    orderManagementEnabledQuery,
    {
      client: masterDataClient,
    }
  );
  const orderManagementMenuItems = buildOrderManagementMenuItems(
    organization,
    orderManagementSettingsLoading,
    orderManagementSettingsData,
    t
  );
  const primaryMenu = [
    {
      name: t("Order management"),
      trigger: (props) => <ProgressiveMenuButton {...props}>{t("Order management")}</ProgressiveMenuButton>,
      items: orderManagementMenuItems,
    },
    {
      name: t("Analytics"),
      trigger: (props) => <ProgressiveMenuButton {...props}>{t("Analytics")}</ProgressiveMenuButton>,
      items: [
        {
          name: t("Historical orders"),
          to: MENU_ENDPOINTS.HISTORICAL_ORDERS,
          as: RouterLink,
          isEnabled: organization.enableOrderTracking,
        },
        {
          name: t("Scorecards"),
          to: MENU_ENDPOINTS.SCORECARDS,
          as: RouterLink,
          isEnabled: organization.enableScorecards,
        },
      ],
    },
    {
      name: t("Inventory Management"),
      trigger: (props) => <ProgressiveMenuButton {...props}>{t("Inventory management")}</ProgressiveMenuButton>,
      items: [
        {
          name: t("Materials overview"),
          to: MENU_ENDPOINTS.MATERIALS_OVERVIEW,
          as: RouterLink,
          isEnabled: organization.enableMaterialsOverview,
        },
        {
          name: t("Inventory reconciliation"),
          to: MENU_ENDPOINTS.INVENTORY_RECONCILIATION,
          as: RouterLink,
          isEnabled: currentUser.inventoryReconciliationEnabled,
        },
      ],
    },
    {
      render: ({ size, layer }) => {
        return (
          <ProgressiveMenuLink to={MENU_ENDPOINTS.INVOICES} size={size} layer={layer}>
            {t("Invoices")}
          </ProgressiveMenuLink>
        );
      },
      key: "invoices",
      isEnabled: Boolean(organization.enableInvoices && currentUser.invoicesEnabled),
    },
    {
      render: ({ size, layer }) => (
        <ProgressiveMenuLink to={MENU_ENDPOINTS.ITEMS} size={size} layer={layer}>
          {t("Items")}
        </ProgressiveMenuLink>
      ),
      key: "items",
    },
    {
      render: ({ size, layer }) => (
        <ProgressiveMenuLink to={MENU_ENDPOINTS.IMPORTS_EXPORTS} size={size} layer={layer}>
          {t("Imports and exports")}
        </ProgressiveMenuLink>
      ),
      key: "importsAndExports",
    },
  ];
  const handleError = () => setTriggeredErrorToast(true);

  const adminOrgSwitcher = {
    key: "admin org switcher",
    trigger: () => (
      <NewMenuButtonWithChevron icon="downArrow" aria-label={t("admin org switcher")}>
        <Icon icon="building" />
      </NewMenuButtonWithChevron>
    ),
    items: [
      {
        key: "organization-item-1",
        render: () => (
          <ResponsiveForm>
            <AdminOrgSwitcher {...{ currentUser, masterDataClient }} />
          </ResponsiveForm>
        ),
      },
    ],
  };

  let secondaryMenu;
  // users usually have a bigger screen, so avoid jitter when the width gets picked up.
  const showingDesktopNav = width === undefined ? true : width > HAMBURGER_BREAKPOINT;
  if (showingDesktopNav) {
    secondaryMenu = [
      {
        name: "Guided tours",
        render: () => <GuidedTours>{t("Guided tours")}</GuidedTours>,
      },
      {
        name: "Help desk",
        render: () => <Helpdesk errorHandler={handleError}>{t("HelpDesk")}</Helpdesk>,
      },
      {
        name: "Help menu separator",
        render: () => <VerticalDivider />,
      },
      {
        ...adminOrgSwitcher,
        isEnabled: currentUser.isAdmin,
      },
      {
        name: "Admin org switcher separator",
        render: () => <VerticalDivider />,
        isEnabled: currentUser.isAdmin,
      },
    ];
  } else {
    secondaryMenu = [];
  }
  secondaryMenu = [
    ...secondaryMenu,
    {
      name: "User Menu",
      render: ({ size }) => {
        return size === "medium" ? (
          <Flex>
            <UserMenuLogo currentUser={currentUser} masterDataClient={masterDataClient} />
            <UserMenuModalButton {...{ currentUser, masterDataClient }} />
          </Flex>
        ) : (
          <UserMenuMobile {...{ currentUser, masterDataClient }} />
        );
      },
    },
  ];

  return (
    <>
      <NavBarWithResizablePrimaryMenu
        menuData={{ primaryMenu, secondaryMenu }}
        breakpointUpper={HAMBURGER_BREAKPOINT + 1}
        environment={mapURLToBannerName(document.URL)}
        defaultOpen={defaultOpen}
      />
      <NetworkErrorToast triggered={triggeredErrorToast} onHide={() => setTriggeredErrorToast(false)} />
      <Toast type="success" triggered={session.getOrganizationName()} onHidden={() => session.clearOrganizationName()}>
        {t(`Switched to ${session.getOrganizationName()}`)}
      </Toast>
    </>
  );
}

function GuidedTours(props) {
  return <NewMenuButton id="guided-tours" {...props} />;
}

function Helpdesk({ errorHandler, ...props }) {
  return <NewMenuButton id="help-desk" onClick={() => displayZendeskWidget(errorHandler)} {...props} />;
}
Helpdesk.propTypes = {
  errorHandler: PropTypes.func,
};

const ResponsiveForm = styled(Form)(({ theme }) => ({
  padding: `${theme.space.x1} ${theme.space.x2}`,
}));

type ProgressiveMenuButtonProps = {
  size: string;
  layer: number;
  defaultRender: () => React.ReactElement;
  children: React.ReactNode;
};

const ProgressiveMenuButton = React.forwardRef(
  ({ size, layer, defaultRender, ...props }: ProgressiveMenuButtonProps, ref) => {
    if (layer === 0) {
      return size === "small" ? (
        <NewMenuText pl="x3" mb="x1" {...props} />
      ) : (
        <NewMenuButtonWithChevron ref={ref} icon="downArrow" {...props} />
      );
    }
    return React.cloneElement(defaultRender(), { ref, ...props });
  }
);
ProgressiveMenuButton.displayName = "ProgressiveMenuButton";

type ProgressiveMenuLinkProps = {
  size: string;
  layer: number;
  to: string;
  children: React.ReactNode;
};
function ProgressiveMenuLink({ size, layer, ...props }: ProgressiveMenuLinkProps) {
  const marginBottom = size === "small" ? "x1" : "";
  const indent = size === "small" ? "x3" : "";
  const DesktopLink = layer === 0 ? NewMenuLink : DropdownLink;
  const LinkElem = size === "small" ? NewMenuHamburgerLink : DesktopLink;
  return <LinkElem as={RouterLink} mb={marginBottom} pl={indent} {...props} />;
}
