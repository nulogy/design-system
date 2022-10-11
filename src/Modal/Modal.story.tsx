import React from "react";
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

const env = process.env.NODE_ENV;

if (env !== "test") NDSModal.setAppElement("#root");

const envProps = {
  ariaHideApp: env === "test" ? false : undefined,
};

const Modal = (props) => <NDSModal {...envProps} {...props} />;

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" },
];

// Modal.setAppElement("#root")

type ModalExampleProps = {
  isOpen: boolean;
};

class ModalExample extends React.Component<{}, ModalExampleProps> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
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
      <>
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
            <DatePicker
              selected={new Date("Fri, 01 Jan 2019")}
              dateFormat="MMMM d, yyyy"
              onChange={(val) => val}
              onInputChange={(val) => val}
            />
          </Form>
        </Modal>
      </>
    );
  }
}

const modalButtons = (
  <ButtonGroup>
    <PrimaryButton>Add job to line</PrimaryButton>
    <QuietButton>Cancel</QuietButton>
  </ButtonGroup>
);

export default {
  title: "Components/Modal",
};

export const _Modal = () => (
  <Modal footerContent={modalButtons} title="Modal Title">
    Content Content Content
  </Modal>
);

export const WithCloseButton = () => (
  <Modal title="Modal Title" footerContent={modalButtons} onRequestClose={() => {}}>
    Content Content Content
  </Modal>
);

WithCloseButton.story = {
  name: "with close button",
};

export const WithScrollingContent = () => (
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
);

WithScrollingContent.story = {
  name: "with scrolling content",
};

export const WithScrollingContentWithoutFooterContent = () => (
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
);

WithScrollingContentWithoutFooterContent.story = {
  name: "with scrolling content without footer content",
};

export const WithNoTitle = () => <Modal footerContent={modalButtons}>Content Content Content</Modal>;

WithNoTitle.story = {
  name: "with no title",
};

export const WithNoFooterContent = () => (
  <Modal title="Without footerContent" onRequestClose={() => {}}>
    Content Content Content
  </Modal>
);

WithNoFooterContent.story = {
  name: "with no footerContent",
};

export const WithCustomMaxWidth = () => (
  <Modal title="Modal Title" footerContent={modalButtons} maxWidth="1000px">
    Content Content Content
  </Modal>
);

WithCustomMaxWidth.story = {
  name: "with custom maxWidth",
};

export const WithSelect = () => (
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
);

WithSelect.story = {
  name: "with select",
};

export const WithSelectAndScrollingContent = () => (
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
);

WithSelectAndScrollingContent.story = {
  name: "with select and scrolling content",
};

export const WithParentSelector = () => {
  const id = "wrapper";

  return (
    <div id={id}>
      <Modal
        title="Modal Title"
        footerContent={modalButtons}
        parentSelector={() => document.getElementById(id)}
      >
        Content
      </Modal>
    </div>
  );
};

WithParentSelector.story = {
  name: "with a parent selector",
};

export const ExampleControlledModal = () => <ModalExample />;

ExampleControlledModal.story = {
  name: "example controlled modal",
};
