import React from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
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

export const Default = {
  render: () => (
    <TopBar.Root>
      <TopBar.BackLink href="/cycle-counts">Cycle counts</TopBar.BackLink>
      <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
      <TopBar.Menu>
        {menuItems.map((props) => (
          <TopBar.MenuItem key={props.title}>
            <TopBar.MenuItemLink {...props} />
          </TopBar.MenuItem>
        ))}
      </TopBar.Menu>
    </TopBar.Root>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opens menu when menu button is clicked", async () => {
      await userEvent.click(canvas.getByTestId("topbar-menu-button"));
      await expect(screen.getByTestId("topbar-menu")).toBeVisible();
    });
    await step("displays correct number of menu items", async () => {
      await expect(screen.getAllByTestId("topbar-menu-item")).toHaveLength(9);
    });
    await step("closes menu when clicking outside", async () => {
      await userEvent.click(screen.getByTestId("topbar-menu-overlay"));
      await waitFor(() => expect(screen.queryByTestId("topbar-menu")).not.toBeInTheDocument());
    });
  },
};

export const WithALongTitle = () => (
  <TopBar.Root>
    <TopBar.BackLink href="/cycle-counts">Previous page title</TopBar.BackLink>
    <TopBar.PageTitle>A long title that can not fit on smaller screens</TopBar.PageTitle>
    <TopBar.Menu>
      {menuItems.map((props) => (
        <TopBar.MenuItem key={props.title}>
          <TopBar.MenuItemLink {...props} />
        </TopBar.MenuItem>
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
            <TopBar.MenuItem key={props.title}>
              <TopBar.MenuItemLink {...props} />
            </TopBar.MenuItem>
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
