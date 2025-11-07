import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  Modal as NDSModal,
  Button,
  QuietButton,
  PrimaryButton,
  ButtonGroup,
  Form,
  Input,
  Select,
  Text,
  DatePicker,
} from "../index";

if (process.env.NODE_ENV !== "test") NDSModal.setAppElement("#storybook-root");

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" },
];

const ModalButtons = (
  <ButtonGroup>
    <PrimaryButton>Add job to line</PrimaryButton>
    <QuietButton>Cancel</QuietButton>
  </ButtonGroup>
);

export default {
  title: "Components/Modal",
  component: NDSModal,
  args: {
    ariaHideApp: process.env.NODE_ENV === "test" ? false : undefined,
  },
} satisfies Meta<typeof NDSModal>;

type Story = StoryObj<typeof NDSModal>;

export const Default: Story = {
  args: {
    children: "Content Content Content",
    title: "Modal Title",
    footerContent: ModalButtons,
    onRequestClose: () => {},
  },
};

export const WithCloseButton: Story = {
  args: {
    children: "Content Content Content",
    title: "Modal Title",
    footerContent: ModalButtons,
    onRequestClose: () => {},
  },
  name: "with close button",
};

export const WithScrollingContent: Story = {
  args: {
    title: "Modal Title",
    footerContent: ModalButtons,
    children: () => (
      <>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
      </>
    ),
  },
  name: "with scrolling content",
};

export const WithScrollingContentWithoutFooterContent: Story = {
  args: {
    title: "Modal Title",
    children: () => (
      <>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
        <Text>
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
      </>
    ),
  },
  name: "with scrolling content without footer content",
};

export const WithNoTitle: Story = {
  args: {
    children: "Content Content Content",
    footerContent: ModalButtons,
  },
  name: "with no title",
};

export const WithNoFooterContent: Story = {
  args: {
    children: "Content Content Content",
    title: "Without footerContent",
    onRequestClose: () => {},
  },
  name: "with no footerContent",
};

export const WithCustomMaxWidth: Story = {
  args: {
    children: "Content Content Content",
    title: "Modal Title",
    footerContent: ModalButtons,
    maxWidth: "1000px",
  },
  name: "with custom maxWidth",
};

export const WithSelect: Story = {
  args: {
    title: "Edit Profile",
    footerContent: ModalButtons,
    maxWidth: "456px",
    children: () => (
      <Form id="myForm" mb="x2">
        <Select
          maxHeight="96px"
          placeholder="Please select inventory status"
          options={options}
          labelText="Inventory status"
        />
      </Form>
    ),
  },
  name: "with select",
};

export const WithSelectAndScrollingContent: Story = {
  args: {
    title: "Edit Profile",
    footerContent: ModalButtons,
    maxWidth: "456px",
    children: () => (
      <Form id="myForm" mb="x2">
        <Input name="name" id="name" labelText="Name" />
        <Input type="number" name="age" id="age" labelText="Age" />
        <Input name="name" id="name" labelText="Name" />
        <Input type="number" name="age" id="age" labelText="Age" />
        <Input name="name" id="name" labelText="Name" />
        <Input type="number" name="age" id="age" labelText="Age" />
        <Select
          maxHeight="96px"
          placeholder="Please select inventory status"
          options={options}
          labelText="Inventory status"
        />
      </Form>
    ),
  },
  name: "with select and scrolling content",
};

export const WithParentSelector: Story = {
  args: {
    title: "Modal Title",
    footerContent: ModalButtons,
    parentSelector: () => document.getElementById("parent-selector"),
  },
  name: "with a parent selector",
  render: (args) => (
    <div id="parent-selector">
      <NDSModal {...args}>Content</NDSModal>
    </div>
  ),
};

export const ExampleControlledModal: Story = {
  render: () => <ModalExample />,
};

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <NDSModal
        title="Edit Profile"
        footerContent={
          <ButtonGroup>
            <PrimaryButton type="submit" form="myForm">
              Add job to line
            </PrimaryButton>
            <QuietButton onClick={() => setIsOpen(false)}>Cancel</QuietButton>
          </ButtonGroup>
        }
        onRequestClose={() => setIsOpen(false)}
        isOpen={isOpen}
        maxWidth="456px"
      >
        <Form id="myForm" mb="x2">
          <Input name="name" id="name" labelText="Name" />
          <Input type="number" name="age" id="age" labelText="Age" />
          <DatePicker
            selected={new Date("Fri, 01 Jan 2019")}
            dateFormat="MMMM d, yyyy"
            onChange={(val) => val}
            onInputChange={(val) => val}
          />
        </Form>
      </NDSModal>
    </>
  );
};

ExampleControlledModal.story = {
  name: "example controlled modal",
};
