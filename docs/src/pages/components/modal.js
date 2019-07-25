/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button,
  PrimaryButton,
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Modal,
  Input,
  Form
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";

const propsRows = [
  {
    name: "isOpen",
    type: "",
    defaultValue: "",
    description: ""
  },
  {
    name: "shouldCloseOnOverlayClick",
    type: "",
    defaultValue: "",
    description: ""
  },
  {
    name: "children",
    type: "",
    defaultValue: "",
    description: ""
  },
  {
    name: "title",
    type: "",
    defaultValue: "",
    description: ""
  },
  {
    name: "primaryButton",
    type: "",
    defaultValue: "",
    description: ""
  },
  {
    name: "secondaryButtons",
    type: "",
    defaultValue: "",
    description: ""
  },
  {
    name: "buttonAlignment",
    type: "",
    defaultValue: "",
    description: ""
  },
  {
    name: "type",
    type: "",
    defaultValue: "",
    description: ""
  },
  {
    name: "onRequestClose",
    type: "",
    defaultValue: "",
    description: ""
  },
  {
    name: "maxWidth",
    type: "",
    defaultValue: "",
    description: ""
  }
];

const primaryButton = { label: "Primary Action", onClick: () => {} };
const secondaryButtons = [{ label: "Secondary Action", onClick: () => {} }];

Modal.setAppElement("#___gatsby");

class ModalStateWrapper extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        {children({
          isOpen,
          closeModal: this.closeModal,
          openModal: this.openModal
        })}
      </div>
    );
  }
}

ModalStateWrapper.propTypes = {
  children: PropTypes.func.isRequired
};

export default () => (
  <Layout>
    <Helmet>
      <title>Modal</title>
    </Helmet>
    <Intro>
      <Title>Modal</Title>
      <IntroText>
        Modal is a window that appears on top of the main content and allows
        introduction of secondary flows while maintaining the original context.
      </IntroText>
    </Intro>

    <DocSection>
      <ModalStateWrapper>
        {({ isOpen, closeModal }) => (
          <Modal
            title="Modal Title"
            isOpen={isOpen}
            onRequestClose={closeModal}
            primaryButton={{ label: "Primary Action", onClick: () => {} }}
            secondaryButtons={secondaryButtons}
          >
            Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </Modal>
        )}
      </ModalStateWrapper>
      <Highlight className="js">
        {`import { Modal, Button } from "@nulogy/components";

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

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          title="Modal Title"
          isOpen={isOpen}
          onRequestClose={closeModal}
          primaryButton={primaryButton}
          secondaryButtons={secondaryButtons}
        >
          Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </Modal>
      </div>
    );
  }
}
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use</SectionTitle>
      <List>
        <ListItem>
          When important warnings require immediate attention.
        </ListItem>
        <ListItem>
          To prevent irreversible changes by creating friction.
        </ListItem>
        <ListItem>
          To fragment a complex workflow into simpler steps such as creating,
          editing, etc.
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Text</SubsectionTitle>
        <ModalStateWrapper>
          {({ isOpen, closeModal }) => (
            <Modal
              title="Modal Title"
              isOpen={isOpen}
              onRequestClose={closeModal}
              primaryButton={primaryButton}
              secondaryButtons={secondaryButtons}
            >
              Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </Modal>
          )}
        </ModalStateWrapper>
        <Highlight className="js">
          {`<Modal
  title="Modal Title"
  isOpen={isOpen}
  onRequestClose={closeModal}
  primaryButton={{ label: "Primary Action", onClick: () => {} }}
  secondaryButtons={[{ label: "Secondary Action", onClick: () => {} }]}
>
  Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat.
</Modal>
`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Form</SubsectionTitle>
        <ModalStateWrapper>
          {({ isOpen, closeModal }) => (
            <Modal
              title="Edit Profile"
              onRequestClose={closeModal}
              primaryButton={{
                label: "Submit",
                type: "submit",
                form: "editProfile"
              }}
              secondaryButtons={[{ label: "Cancel", onClick: closeModal }]}
              isOpen={isOpen}
              maxWidth="456px"
            >
              <Form id="editProfile" mb="x2">
                <Input name="name" id="name" labelText="Name" />
                <Input type="number" name="age" id="age" labelText="Age" />
              </Form>
            </Modal>
          )}
        </ModalStateWrapper>
        <Highlight className="js">
          {`<Modal
  title="Edit Profile"
  onRequestClose={closeModal}
  primaryButton={{ label: "Submit", type: "submit", form: "editProfile" }}
  secondaryButtons={[{ label: "Cancel", onClick: closeModal }]}
  isOpen={isOpen}
  maxWidth="456px"
>
  <Form id="editProfile" mb="x2">
    <Input name="name" id="name" labelText="Name" />
    <Input type="number" name="age" id="age" labelText="Age" />
  </Form>
</Modal>
`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Multi-Step Process</SubsectionTitle>
        <ModalStateWrapper>
          {({ isOpen, closeModal }) => (
            <Modal
              title="Enter Address"
              buttonAlignment="spaced"
              onRequestClose={closeModal}
              primaryButton={{ label: "Next", onClick: () => {} }}
              secondaryButtons={[{ label: "Previous", onClick: () => {} }]}
              isOpen={isOpen}
              maxWidth="456px"
            >
              <Form id="myForm" mb="x2">
                <Input name="country" id="country" labelText="Country" />
                <Input name="state" id="state" labelText="State" />
              </Form>
            </Modal>
          )}
        </ModalStateWrapper>
        <Highlight className="js">
          {`<Modal
  title="Enter Address"
  buttonAlignment="spaced"
  onRequestClose={closeModal}
  primaryButton={{ label: "Next", onClick: ()=>{} }}
  secondaryButtons={[{ label: "Previous", onClick: ()=>{} }]}
  isOpen={isOpen}
  maxWidth="456px"
>
  <Form id="myForm" mb="x2">
    <Input name="country" id="country" labelText="Country" />
    <Input name="state" id="state" labelText="State" />
  </Form>
</Modal>
`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Without the Actions</SubsectionTitle>
        <ModalStateWrapper>
          {({ isOpen, closeModal }) => (
            <Modal
              title="Modal Title"
              isOpen={isOpen}
              onRequestClose={closeModal}
            >
              Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </Modal>
          )}
        </ModalStateWrapper>
        <Highlight className="js">
          {`<Modal
  title="Modal Title"
  isOpen={isOpen}
  onRequestClose={closeModal}
>
  Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat.
</Modal>
`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Without the Title</SubsectionTitle>
        <ModalStateWrapper>
          {({ isOpen, closeModal }) => (
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              primaryButton={primaryButton}
              secondaryButtons={secondaryButtons}
            >
              Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </Modal>
          )}
        </ModalStateWrapper>
        <Highlight className="js">
          {`<Modal
  isOpen={isOpen}
  onRequestClose={closeModal}
  primaryButton={{ label: "Primary Action", onClick: () => {} }}
  secondaryButtons={[{ label: "Secondary Action", onClick: () => {} }]}
>
  Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat.
</Modal>
`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Without the Title Bar</SubsectionTitle>
        <ModalStateWrapper>
          {({ isOpen, closeModal }) => (
            <Modal
              isOpen={isOpen}
              primaryButton={primaryButton}
              secondaryButtons={[{ label: "Close", onClick: closeModal }]}
            >
              Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </Modal>
          )}
        </ModalStateWrapper>
        <Highlight className="js">
          {`<Modal
  isOpen={isOpen}
  primaryButton={{ label: "Primary Action", onClick: () => {} }}
  secondaryButtons={[{ label: "Close", onClick: closeModal}]}
>
  Modal Content. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat.
</Modal>
`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Dos and Donts</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Accessibility guidelines</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsive information</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
