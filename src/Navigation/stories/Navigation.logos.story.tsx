import React, { Fragment } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { NulogyLogo } from "../components/NulogyLogo/NulogyLogo";
import { NavigationLogoLink } from "../components/NulogyLogo/NavigationLogoLink";
import Navigation from "../Navigation";
import { Page } from "../../Layout/Page";
import { ApplicationFrame } from "../../Layout";
import { Alert } from "../../Alert";
import { Code } from "../../utils/story/code";
import CustomLogo from "./fixtures/logos/Customlogo1";
import CustomLogoTwo from "./fixtures/logos/CustomLogo2";
import CustomLogoThree from "./fixtures/logos/CustomLogo3";
export default {
  title: "Components/Navigation/Logos",
  parameters: {
    layout: "fullscreen",
  },
};

export const PrimaryLogo = () => {
  return (
    <Navigation
      primaryLogo={
        <NavigationLogoLink href="/" aria-label="Nulogy Logo">
          <NulogyLogo />
        </NavigationLogoLink>
      }
    />
  );
};

export const UsingClientRouting = () => {
  return (
    <BrowserRouter>
      <Navigation
        primaryLogo={
          <NavigationLogoLink renderAsFragment>
            <Link to="/" aria-label="Nulogy Logo">
              <NulogyLogo />
            </Link>
          </NavigationLogoLink>
        }
      />
    </BrowserRouter>
  );
};

export const WithANulogyApplicationName = () => {
  return (
    <BrowserRouter>
      <Navigation
        primaryLogo={
          <NavigationLogoLink renderAsFragment>
            <Link to="/" aria-label="Nulogy Logo">
              <NulogyLogo app="supplier-collaboration" />
            </Link>
          </NavigationLogoLink>
        }
      />
    </BrowserRouter>
  );
};

export const SecondaryLogo = () => {
  return (
    <BrowserRouter>
      <Navigation secondaryLogo={<CustomLogoThree style={{ width: "auto", height: 32 }} />} />
    </BrowserRouter>
  );
};

export const SecondaryLogoLink = () => {
  return (
    <BrowserRouter>
      <Navigation
        secondaryLogo={
          <NavigationLogoLink renderAsFragment>
            <Link to="/" aria-label="Nulogy Logo">
              <CustomLogo style={{ width: "auto", height: 24 }} />
            </Link>
          </NavigationLogoLink>
        }
      />
    </BrowserRouter>
  );
};

export const WithoutPassingAPrimaryLogo = () => {
  return (
    <ApplicationFrame navBar={<Navigation />}>
      <Page fullHeight>
        <Alert type="warning">
          If the primary logo is not passed, the Nulogy logo without an application name will be with a standard anchor
          tag with an <Code>href=&quot;/&quot;</Code> attribute.
        </Alert>
      </Page>
    </ApplicationFrame>
  );
};

export const WithoutAPrimaryLogo = () => {
  return (
    <ApplicationFrame navBar={<Navigation primaryLogo={<Fragment />} />}>
      <Page fullHeight>
        <Alert type="danger">This is not a recommended usage of the Navigation component.</Alert>
      </Page>
    </ApplicationFrame>
  );
};

export const WithACustomPrimaryLogo = () => {
  return (
    <ApplicationFrame navBar={<Navigation primaryLogo={<CustomLogoTwo style={{ width: "auto", height: 24 }} />} />}>
      <Page fullHeight>
        <Alert type="danger">This is not a recommended usage of the Navigation component.</Alert>
      </Page>
    </ApplicationFrame>
  );
};
