import React from "react";
import { storiesOf } from "@storybook/react";
import { Modal, Button, Form, Input } from "../index";

const primaryButton = { label: "Primary Action", onClick: () => {} };

const secondaryButtons = [{ label: "Secondary Action", onClick: () => {} }];

Modal.setAppElement("#root");

class ModalExample extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 27:
        this.closeModal();
        break;
      default:
        break;
    }
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          title="Edit Profile"
          onRequestClose={this.closeModal}
          primaryButton={{ label: "Submit", type: "submit", form: "myForm" }}
          secondaryButtons={[{ label: "Cancel", onClick: this.closeModal }]}
          isOpen={isOpen}
          buttonAlignment="left"
        >
          <Form id="myForm" mb="x2">
            <Input name="name" id="name" labelText="Name" />
            <Input type="number" name="age" id="age" labelText="Age" />
          </Form>
        </Modal>
      </div>
    );
  }
}

storiesOf("Modal", module)
  .add("Modal", () => (
    <Modal title="Modal Title" primaryButton={primaryButton} secondaryButtons={secondaryButtons}>
      Content Content Content
    </Modal>
  ))
  .add("with close button", () => (
    <Modal
      title="Modal Title"
      onRequestClose={() => {}}
      primaryButton={primaryButton}
      secondaryButtons={secondaryButtons}
    >
      Content Content Content
    </Modal>
  ))
  .add("with scrolling content", () => (
    <Modal title="Modal Title" primaryButton={primaryButton} secondaryButtons={secondaryButtons}>
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content Content Content
    </Modal>
  ))
  .add("with danger type", () => (
    <Modal title="Modal Title" type="danger" primaryButton={primaryButton} secondaryButtons={secondaryButtons}>
      Content Content Content
    </Modal>
  ))
  .add("with no buttons", () => <Modal title="Modal Title">Content Content Content</Modal>)
  .add("with no title", () => <Modal>Content Content Content</Modal>)
  .add("with left button alignment", () => (
    <Modal buttonAlignment="left" title="Modal Title" primaryButton={primaryButton} secondaryButtons={secondaryButtons}>
      Content Content Content
    </Modal>
  ))
  .add("with spaced button alignment", () => (
    <Modal
      buttonAlignment="spaced"
      title="Modal Title"
      primaryButton={primaryButton}
      secondaryButtons={secondaryButtons}
    >
      Content Content Content
    </Modal>
  ))
  .add("with many buttons", () => (
    <Modal
      title="Modal Title"
      primaryButton={{ label: "Primary Action", onClick: () => {} }}
      secondaryButtons={[
        { label: "Secondary Action 1", onClick: () => {} },
        { label: "Secondary Action 2", onClick: () => {} }
      ]}
    >
      Content Content Content
    </Modal>
  ))
  .add("example controlled modal", () => <ModalExample />);
