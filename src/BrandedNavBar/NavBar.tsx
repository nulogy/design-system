import React from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Flex } from "../Flex";
import { Box } from "../Box";
import DesktopMenu from "./DesktopMenu";
import { NulogyLogoContainer } from "./NulogyLogoContainer";
import EnvironmentBanner from "./EnvironmentBanner";
import BrandLogoContainer, { BrandLogoContainerProps } from "./BrandLogoContainer";
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

type MediumNavBarProps = BrandLogoContainerProps & {
  subtext?: string;
  menuData?: any;
  environment?: "development" | "training";
};

const MediumNavBar = ({
  menuData,
  subtext,
  environment,
  logoSrc,
  brandingLinkHref = "/",
  brandingLinkTo,
  brandingLinkComponent,
  ...props
}: MediumNavBarProps) => {
  const { t } = useTranslation();
  return (
    <>
      {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
      <header {...props}>
        <NavBarBackground backgroundColor="white" height={NAVBAR_HEIGHT}>
          <BrandLogoContainer
            logoSrc={logoSrc}
            brandingLinkHref={brandingLinkHref}
            brandingLinkTo={brandingLinkTo}
            brandingLinkComponent={brandingLinkComponent}
            subtext={subtext}
          />
          <Flex justifyContent="space-between" alignContent="flex-end" flexGrow={1} ml="x3" alignItems="center">
            {menuData.primaryMenu && (
              <DesktopMenu
                themeColorObject={themeColorObject}
                aria-label={t("primary navigation")}
                menuData={menuData.primaryMenu}
              />
            )}
            <Flex justifySelf="flex-end" alignItems="center">
              {menuData.secondaryMenu && (
                <DesktopMenu
                  themeColorObject={themeColorObject}
                  aria-label={t("secondary navigation")}
                  menuData={menuData.secondaryMenu}
                />
              )}
              {logoSrc && (
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

const pixelDigitsFrom = (pixelString) => parseInt(pixelString, 10);

const SelectNavBarBasedOnWidth = ({ width, defaultOpen, breakpointUpper, ...props }: any) => {
  const currentWidth = width || (typeof window !== "undefined" && window.innerWidth);

  if (currentWidth >= pixelDigitsFrom(breakpointUpper)) {
    return <MediumNavBar {...props} />;
  } else {
    return (
      <SmallNavBar
        {...props}
        width={currentWidth}
        defaultOpen={defaultOpen}
        themeColorObject={themeColorObject}
        navBarHeight={NAVBAR_HEIGHT}
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
      <SelectNavBarBasedOnWidth
        breakpointUpper={breakpoints[breakpointUpper] || breakpointUpper}
        {...props}
        environment={environment}
      />
    </ReactResizeDetector>
  );
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
