import React from "react";
import { FormSection } from "../Form";
import { Input } from "../Input";
import { Page, ApplicationFrame } from "../Layout";
import TopBar from "./TopBar";

export default {
  title: "Components/TopBar",
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => <TopBar previousPageTitle="Cycle counts" currentPageTitle="Cycle count #3992" />;

export const WithALongTitle = () => (
  <TopBar previousPageTitle="Back" currentPageTitle="A long title that can not fit on smaller screens" />
);

export const WithApplicationFrame = () => (
  <ApplicationFrame navBar={<TopBar previousPageTitle="Cycle counts" currentPageTitle="Cycle count #3992" />}>
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
