import React from "react";
import { Button } from "../..";
import { ActionList, ActionListButton, ActionListMenu, ActionListItem } from "..";
import { Container } from "./fixtures";

export default {
  title: "Components/ActionList/Button",
  component: ActionList,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => {
  return (
    <Container>
      <ActionList>
        <ActionListButton>Options</ActionListButton>
        <ActionListMenu>
          <ActionListItem disabled>View</ActionListItem>
          <ActionListItem>Edit</ActionListItem>
          <ActionListItem>Delete</ActionListItem>
        </ActionListMenu>
      </ActionList>
    </Container>
  );
};

export const WithSmallButton = () => {
  return (
    <Container>
      {/* @ts-expect-error - size is not implemented yet */}
      <ActionList size="small">
        <ActionListButton size="small">Statuses</ActionListButton>
        <ActionListMenu>
          <ActionListItem>Active</ActionListItem>
          <ActionListItem>Inactive</ActionListItem>
          <ActionListItem>Archived</ActionListItem>
        </ActionListMenu>
      </ActionList>
    </Container>
  );
};

export const WithNoTextInTheButton = () => {
  return (
    <Container>
      <ActionList>
        <ActionListButton />
        <ActionListMenu>
          <ActionListItem>Active</ActionListItem>
          <ActionListItem>Inactive</ActionListItem>
          <ActionListItem>Archived</ActionListItem>
        </ActionListMenu>
      </ActionList>
    </Container>
  );
};

export const WithAnIconOnlyButton = () => {
  return (
    <Container>
      <ActionList>
        <ActionListButton icon="settings" />
        <ActionListMenu>
          <ActionListItem>Active</ActionListItem>
          <ActionListItem>Inactive</ActionListItem>
          <ActionListItem>Archived</ActionListItem>
        </ActionListMenu>
      </ActionList>
    </Container>
  );
};

export const WithACustomTrigger = () => {
  return (
    <Container>
      <ActionList>
        <ActionListButton renderAsFragment>
          <Button>This is a custom trigger</Button>
        </ActionListButton>
        <ActionListMenu>
          <ActionListItem>Active</ActionListItem>
          <ActionListItem>Inactive</ActionListItem>
          <ActionListItem>Archived</ActionListItem>
        </ActionListMenu>
      </ActionList>
    </Container>
  );
};
