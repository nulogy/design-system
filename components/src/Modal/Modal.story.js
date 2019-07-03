import React from "react";
import { storiesOf } from "@storybook/react";
import { Modal } from "../index";

const primaryButtons = [{ label: "Primary Action", onClick: () => {} }];

const secondaryButtons = [{ label: "Secondary Action", onClick: () => {} }];

storiesOf("Modal", module)
  .add("Modal", () => (
    <Modal title="Modal Title" primaryButtons={primaryButtons} secondaryButtons={secondaryButtons}>
      Content Content Content
    </Modal>
  ))
  .add("with scrolling content", () => (
    <Modal title="Modal Title" primaryButtons={primaryButtons} secondaryButtons={secondaryButtons}>
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content
    </Modal>
  ))
  .add("with danger type", () => (
    <Modal title="Modal Title" type="danger" primaryButtons={primaryButtons} secondaryButtons={secondaryButtons}>
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content
    </Modal>
  ))
  .add("with no buttons", () => (
    <Modal title="Modal Title">
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content
    </Modal>
  ))
  .add("with no title", () => (
    <Modal>
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content
    </Modal>
  ));
