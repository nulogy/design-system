import React from "react";
import Navigation from "../Navigation";
import { Page } from "../../Layout/Page";
import { ApplicationFrame } from "../../Layout";
import { Input } from "../../Input";
import { FormSection } from "../../Form";
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
    />
  );
};

export const WithAnApplicationFrame = () => (
  <ApplicationFrame
    navBar={
      <Navigation
        appSwitcher={appSwitcher}
        primaryNavigation={primaryMenu}
        secondaryNavigation={secondaryMenu}
        userMenu={userMenu}
        secondaryLogo={<Logo style={{ width: "auto", height: 32 }} />}
      />
    }
  >
    <Page fullHeight>
      <FormSection title="Personal Information">
        <Input id="name" labelText="Name" />
        <Input
          id="birthdate"
          placeholder="DD-MM-YYYY"
          labelText="Date of birth"
          requirementText="(Optional)"
          helpText="Enter a date below"
        />
        <Input id="birthplace" labelText="Place of birth" requirementText="(Optional)" />
      </FormSection>
      <FormSection title="General Information">
        <Input id="gender" labelText="Gender" />
        <Input id="occupation" labelText="Occupation" />
      </FormSection>
      <FormSection title="Personal Information">
        <Input id="name" labelText="Name" />
        <Input
          id="birthdate"
          placeholder="DD-MM-YYYY"
          labelText="Date of birth"
          requirementText="(Optional)"
          helpText="Enter a date below"
        />
        <Input id="birthplace" labelText="Place of birth" requirementText="(Optional)" />
      </FormSection>
      <FormSection title="General Information">
        <Input id="gender" labelText="Gender" />
        <Input id="occupation" labelText="Occupation" />
      </FormSection>
      <FormSection title="Personal Information">
        <Input id="name" labelText="Name" />
        <Input
          id="birthdate"
          placeholder="DD-MM-YYYY"
          labelText="Date of birth"
          requirementText="(Optional)"
          helpText="Enter a date below"
        />
        <Input id="birthplace" labelText="Place of birth" requirementText="(Optional)" />
      </FormSection>
      <FormSection title="General Information">
        <Input id="gender" labelText="Gender" />
        <Input id="occupation" labelText="Occupation" />
      </FormSection>
    </Page>
  </ApplicationFrame>
);
