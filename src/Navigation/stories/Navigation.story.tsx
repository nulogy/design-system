import React from "react";
import Navigation from "../Navigation";
import { appSwitcher, primaryMenu, secondaryMenu, userMenu } from "./fixtures/configs";
import Logo from "./fixtures/logos/Logo";

export default {
  title: "Components/Navigation",
  parameters: {
    layout: "fullscreen",
  },
};

export const BasicUsage = () => {
  return (
    <Navigation
      appSwitcher={appSwitcher}
      primaryNavigation={primaryMenu}
      secondaryNavigation={secondaryMenu}
      userMenu={userMenu}
      secondaryLogo={<Logo style={{ width: "auto", height: 32 }} />}
      breakpoint="1024px"
    />
  );
};
