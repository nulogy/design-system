import React from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Flex } from "../Flex";
import { Box } from "../Box";
import numberFromDimension from "../utils/numberFromDimension";
import DesktopMenu from "./DesktopMenu";
import { NulogyLogoContainer } from "./NulogyLogoContainer";
import EnvironmentBanner from "./EnvironmentBanner";
import BrandLogoContainer from "./BrandLogoContainer";
import SmallNavBar from "./SmallNavBar";
import NavBarBackground from "./NavBarBackground";

export const NAVBAR_HEIGHT = "56px";

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
};

const MediumNavBar: React.FC<MediumNavBarProps> = ({
  menuData,
  environment,
  logo,
  showNulogyLogo,
  subtext,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <>
      {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
      <header {...props}>
        <NavBarBackground backgroundColor="white" height={NAVBAR_HEIGHT}>
          {logo}
          <Flex justifyContent="space-between" alignContent="flex-end" flexGrow={1} ml="x3" alignItems="center">
            {menuData.primaryMenu && (
              <DesktopMenu
                themeColorObject={themeColorObject}
                aria-label={t("primary navigation")}
                menuType="primary"
                menuData={menuData.primaryMenu}
              />
            )}
            <Flex justifySelf="flex-end" alignItems="center">
              {menuData.secondaryMenu && (
                <DesktopMenu
                  themeColorObject={themeColorObject}
                  aria-label={t("secondary navigation")}
                  menuType="secondary"
                  menuData={menuData.secondaryMenu}
                />
              )}
              {showNulogyLogo && (
                <Box pl="x3">
                  <NulogyLogoContainer height={NAVBAR_HEIGHT} subText={subtext} />
                </Box>
              )}
            </Flex>
          </Flex>
        </NavBarBackground>
      </header>
    </>
  );
};

const SelectNavBarBasedOnWidth = ({
  width,
  defaultOpen,
  breakpointUpper,
  brandingLinkHref = "/",
  brandingLinkTo,
  brandingLinkComponent,
  logoSrc,
  ...props
}: any) => {
  const currentWidth = width || (typeof window !== "undefined" && window.innerWidth);

  const logo = (
    <BrandLogoContainer
      logoSrc={logoSrc}
      brandingLinkHref={brandingLinkHref}
      brandingLinkTo={brandingLinkTo}
      brandingLinkComponent={brandingLinkComponent}
      subtext={props.subtext}
    />
  );

  if (currentWidth >= numberFromDimension(breakpointUpper)) {
    return <MediumNavBar logo={logo} showNulogyLogo={logoSrc} {...props} />;
  } else {
    return (
      <SmallNavBar
        width={currentWidth}
        defaultOpen={defaultOpen}
        themeColorObject={themeColorObject}
        navBarHeight={NAVBAR_HEIGHT}
        logo={logo}
        showNulogyLogo={logoSrc}
        {...props}
      />
    );
  }
};

type BaseNavBarProps = {
  menuData?: any;
  className?: string;
  breakpointUpper?: number | string;
  environment?: "training" | "development" | undefined;
  subtext?: string;
  brandingLinkHref?: string;
  logoSrc?: string;
};

const BaseNavBar = ({ environment, breakpointUpper = "medium", ...props }: BaseNavBarProps) => {
  const { breakpoints } = useTheme();
  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <SelectNavBarBasedOnWidth
          breakpointUpper={breakpoints[breakpointUpper] || breakpointUpper}
          width={width}
          environment={environment}
          {...props}
        />
      )}
    </ReactResizeDetector>
  );
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
