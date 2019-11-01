import React from "react";
import { storiesOf } from "@storybook/react";
import { Modal as NDSModal, Button, Form, Input, Select, Text } from "../index";
import { PrimaryButton } from "../Button";

const env = process.env.NODE_ENV;

if (env !== "test") NDSModal.setAppElement("#root");

const envProps = {
  ariaHideApp: env === "test" ? false : undefined
};

const Modal = props => <NDSModal {...envProps} {...props} />;

const primaryButton = { label: "Primary Action", onClick: () => {} };

const secondaryButtons = [{ label: "Secondary Action", onClick: () => {} }];

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" }
];

// Modal.setAppElement("#root")

class ModalExample extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
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
          maxWidth="456px"
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
      <Text>
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content
      </Text>
      <Text>
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content
      </Text>
    </Modal>
  ))
  .add("with scrolling content and no footer", () => (
    <Modal title="Modal Title">
      <Text>
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content ContentContent Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content ContentContent Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content ContentContent Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content ContentContent
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content ContentContent Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content ContentContent Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content ContentContent Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content Content Content Content Content Content Content Content Content Content Content Content Content Content
        Content
      </Text>
      <PrimaryButton>Some text</PrimaryButton>
    </Modal>
  ))
  .add("with danger type", () => (
    <Modal title="Modal Title" type="danger" primaryButton={primaryButton} secondaryButtons={secondaryButtons}>
      Content Content Content
    </Modal>
  ))
  .add("with no buttons", () => (
    <Modal title="Modal Title" onRequestClose={() => {}}>
      Content Content Content
    </Modal>
  ))
  .add("with no title", () => (
    <Modal primaryButton={primaryButton} secondaryButtons={secondaryButtons}>
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
  .add("with custom maxWidth", () => (
    <Modal title="Modal Title" maxWidth="1000px" primaryButton={primaryButton} secondaryButtons={secondaryButtons}>
      Content Content Content
    </Modal>
  ))
  .add("with many buttons", () => (
    <Modal
      title="Modal Title"
      primaryButton={{ label: "Primary Action", onClick: () => {} }}
      secondaryButtons={[{ label: "Secondary 1", onClick: () => {} }, { label: "Secondary 2", onClick: () => {} }]}
    >
      Content Content Content
    </Modal>
  ))
  .add("styled as a form", () => (
    <Modal
      title="Edit Profile"
      onRequestClose={() => {}}
      primaryButton={{ label: "Submit", type: "submit", form: "myForm" }}
      secondaryButtons={[{ label: "Cancel", onClick: () => {} }]}
      maxWidth="456px"
    >
      <Form id="myForm" mb="x2">
        <Input name="name" id="name" labelText="Name" />
        <Input type="number" name="age" id="age" labelText="Age" />
      </Form>
    </Modal>
  ))
  .add("with select", () => (
    <Modal
      title="Edit Profile"
      onRequestClose={() => {}}
      primaryButton={{ label: "Submit", type: "submit", form: "myForm" }}
      secondaryButtons={[{ label: "Cancel", onClick: () => {} }]}
      maxWidth="456px"
    >
      <Form id="myForm" mb="x2">
        <Select placeholder="Please select inventory status" options={options} labelText="Inventory status" />
      </Form>
    </Modal>
  ))
  .add("with select and content after", () => (
    <Modal
      title="Edit Profile"
      onRequestClose={() => {}}
      primaryButton={{ label: "Submit", type: "submit", form: "myForm" }}
      secondaryButtons={[{ label: "Cancel", onClick: () => {} }]}
      maxWidth="456px"
    >
      <Form id="myForm" mb="x2">
        <Select placeholder="Please select inventory status" options={options} labelText="Inventory status" />
        <Input name="name" id="name" labelText="Name" />
        <Input type="number" name="age" id="age" labelText="Age" />
      </Form>
    </Modal>
  ))
  .add("with select and content before", () => (
    <Modal
      title="Edit Profile"
      onRequestClose={() => {}}
      primaryButton={{ label: "Submit", type: "submit", form: "myForm" }}
      secondaryButtons={[{ label: "Cancel", onClick: () => {} }]}
      maxWidth="456px"
    >
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
    </Modal>
  ))
  .add("example controlled modal", () => <ModalExample />);
