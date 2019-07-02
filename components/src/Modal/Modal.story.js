import React from "react";
import { storiesOf } from "@storybook/react";
import { Modal } from "../index";

storiesOf("Modal", module)
  .add("Modal", () => <Modal>Content Content Content</Modal>)
  .add("with scrolling content", () => (
    <Modal>
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content
    </Modal>
  ));
