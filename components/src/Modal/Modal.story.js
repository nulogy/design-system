import React from "react";
import { storiesOf } from "@storybook/react";
import { Modal } from "../index";

const primaryButtons = [{ label: "Primary Action", onClick: () => {} }];

const secondaryButtons = [{ label: "Secondary Action", onClick: () => {} }];

storiesOf("Modal", module)
  .add("Modal", () => (
    <Modal primaryButtons={primaryButtons} secondaryButtons={secondaryButtons}>
      Content Content Content
    </Modal>
  ))
  .add("with scrolling content", () => (
    <Modal primaryButtons={primaryButtons} secondaryButtons={secondaryButtons}>
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content
    </Modal>
  ))
  .add("with danger type", () => (
    <Modal type="danger" primaryButtons={primaryButtons} secondaryButtons={secondaryButtons}>
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content
    </Modal>
  ));
