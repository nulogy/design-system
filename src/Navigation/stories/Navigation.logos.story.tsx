import React, { Fragment, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { NulogyLogo } from "../components/NulogyLogo/NulogyLogo";
import Navigation from "../Navigation";
import { Page } from "../../Layout/Page";
import { ApplicationFrame, Sidebar } from "../../Layout";
import { Alert } from "../../Alert";
import { Code } from "../../utils/story/code";
import { Radio } from "../../Radio";
import { RadioGroup } from "../../Radio";
import type { NulogyAppName } from "../..";
import { NavigationLogoLink } from "../components/shared/NavigationLogoLink";
import CustomLogo from "./fixtures/logos/Customlogo1";
import CustomLogo2 from "./fixtures/logos/CustomLogo2";
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
  const [application, setApplication] = useState<NulogyAppName>("supplier-collaboration");

  const handleApplicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplication(e.target.value as NulogyAppName);
  };

  return (
    <ApplicationFrame
      navBar={
        <BrowserRouter>
          <Navigation
            primaryLogo={
              <NavigationLogoLink renderAsFragment>
                <Link to="/" aria-label="Nulogy Logo">
                  <NulogyLogo app={application} />
                </Link>
              </NavigationLogoLink>
            }
          />
        </BrowserRouter>
      }
    >
      <Page fullHeight>
        <Sidebar
          height="100%"
          width="350px"
          hideCloseButton
          isOpen
          title="Story configuration"
          overlay="hide"
          top="64px"
          bottom="0px"
        >
          <RadioGroup
            labelText="Application name"
            name="application"
            onChange={handleApplicationChange}
            defaultValue={application}
          >
            <Radio value="supplier-collaboration" labelText="Supplier Collaboration" />
            <Radio value="smart-factory" labelText="Smart Factory" />
            <Radio value="digital-quality-inspection" labelText="Digital Quality Inspection" />
            <Radio value="production-scheduling" labelText="Production Scheduling" />
            <Radio value="shop-floor" labelText="Shop Floor Control" />
            <Radio value="data" labelText="Data" />
          </RadioGroup>
        </Sidebar>
      </Page>
    </ApplicationFrame>
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
          If the primary logo is not passed, the Nulogy logo without an application name will be used with a standard
          anchor tag with an <Code>href=&quot;/&quot;</Code> attribute.
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
    <ApplicationFrame navBar={<Navigation primaryLogo={<CustomLogo2 style={{ width: "auto", height: 24 }} />} />}>
      <Page fullHeight>
        <Alert type="danger">This is not a recommended usage of the Navigation component.</Alert>
      </Page>
    </ApplicationFrame>
  );
};
