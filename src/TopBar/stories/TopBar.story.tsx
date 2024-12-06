import React from "react";
import { FormSection } from "../../Form";
import { Input } from "../../Input";
import { ApplicationFrame, Page } from "../../Layout";
import { TopBar } from "../TopBar";
import { legacy as theme } from "../../theme/theme";
import numberFromDimension from "../../utils/numberFromDimension";
import { menuItems } from "./fixtures";

export default {
  title: "Components/TopBar",
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        locale: "en",
        desktopScale: "standard",
        theme: "touch",
        viewports: [theme.breakpoints.small, theme.breakpoints.medium, theme.breakpoints.large].map(
          numberFromDimension
        ),
      },
    },
  },
};

export const Default = () => (
  <TopBar.Root>
    <TopBar.BackLink href="/cycle-counts">Cycle counts</TopBar.BackLink>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu>
      {menuItems.map((props, i) => (
        <TopBar.MenuItem key={props.title} order={i} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);

export const WithALongTitle = () => (
  <TopBar.Root>
    <TopBar.BackLink href="/cycle-counts">Previous page title</TopBar.BackLink>
    <TopBar.PageTitle>A long title that can not fit on smaller screens</TopBar.PageTitle>
    <TopBar.Menu>
      {menuItems.map((props, i) => (
        <TopBar.MenuItem key={props.title} order={i} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);

export const WithAnApplicationFrame = () => (
  <ApplicationFrame
    navBar={
      <TopBar.Root>
        <TopBar.BackLink href="/cycle-counts">Cycle counts</TopBar.BackLink>
        <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
        <TopBar.Menu>
          {menuItems.map((props) => (
            <TopBar.MenuItem key={props.title} {...props} />
          ))}
        </TopBar.Menu>
      </TopBar.Root>
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
