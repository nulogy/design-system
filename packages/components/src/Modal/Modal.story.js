import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Modal as NDSModal,
  Button,
  QuietButton,
  PrimaryButton,
  ButtonGroup,
  Form,
  Input,
  Select,
  Text
} from "../index";

const env = process.env.NODE_ENV;

if (env !== "test") NDSModal.setAppElement("#root");

const envProps = {
  ariaHideApp: env === "test" ? false : undefined
};

const Modal = props => <NDSModal {...envProps} {...props} />;

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
    const controlledModalButtons = (
      <ButtonGroup>
        <PrimaryButton type="submit" form="myForm">
          Add job to line
        </PrimaryButton>
        <QuietButton onClick={this.closeModal}>Cancel</QuietButton>
      </ButtonGroup>
    );

    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          title="Edit Profile"
          footerContent={controlledModalButtons}
          onRequestClose={this.closeModal}
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

const modalButtons = (
  <ButtonGroup>
    <PrimaryButton>Add job to line</PrimaryButton>
    <QuietButton>Cancel</QuietButton>
  </ButtonGroup>
);

storiesOf("Components/Modal", module)
  .add("Modal", () => (
    <Modal footerContent={modalButtons} title="Modal Title">
      Content Content Content
    </Modal>
  ))
  .add("with close button", () => (
    <Modal title="Modal Title" footerContent={modalButtons} onRequestClose={() => {}}>
      Content Content Content
    </Modal>
  ))
  .add("with scrolling content", () => (
    <Modal title="Modal Title" footerContent={modalButtons}>
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
  .add("with scrolling content without footer content", () => (
    <Modal title="Modal Title">
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
  .add("with no title", () => <Modal footerContent={modalButtons}>Content Content Content</Modal>)
  .add("with no footerContent", () => (
    <Modal title="Without footerContent" onRequestClose={() => {}}>
      Content Content Content
    </Modal>
  ))
  .add("with custom maxWidth", () => (
    <Modal title="Modal Title" footerContent={modalButtons} maxWidth="1000px">
      Content Content Content
    </Modal>
  ))
  .add("with select", () => (
    <Modal title="Edit Profile" footerContent={modalButtons} onRequestClose={() => {}} maxWidth="456px">
      <Form id="myForm" mb="x2">
        <Select
          maxHeight="96px"
          placeholder="Please select inventory status"
          options={options}
          labelText="Inventory status"
        />
      </Form>
    </Modal>
  ))
  .add("with select and scrolling content", () => (
    <Modal title="Edit Profile" footerContent={modalButtons} onRequestClose={() => {}} maxWidth="456px">
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
