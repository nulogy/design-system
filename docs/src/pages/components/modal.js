/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button,
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Modal,
  Input,
  Form,
  Text
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
    type: "Boolean",
    defaultValue: "true",
    description: "Controls whether the modal is open or closed"
  },
  {
    name: "title",
    type: "String",
    defaultValue: "null",
    description: "The title appearing at the top of the modal"
  },
  {
    name: "primaryButton",
    type: "Object",
    defaultValue: "null",
    description:
      "The primary action of the modal, accepts label tag for label and all other Button component props"
  },
  {
    name: "secondaryButtons",
    type: "Array",
    defaultValue: "null",
    description:
      "The secondary action(s) of the modal, accepts an array of objects with label tag and other Button props"
  },
  {
    name: "buttonAlignment",
    type: "String",
    defaultValue: "left",
    description:
      "Controls the placement and order of button in the modal, either 'left' or 'spaced'"
  },
  {
    name: "type",
    type: "String",
    defaultValue: "informative",
    description:
      "Controls the style of the modal buttons, either 'informative' or 'danger'"
  },
  {
    name: "onRequestClose",
    type: "Function",
    defaultValue: "null",
    description:
      "Function that is run when the modal requests to be closed (esc key, clicking outside, clicking close), also renders the close button is passed in"
  },
  {
    name: "onAfterOpen",
    type: "Function",
    defaultValue: "null",
    description: "Function that is run after the modal has opened"
  },
  {
    name: "maxWidth",
    type: "String",
    defaultValue: "624px",
    description:
      "Maximum width of the modal, modal will always compress responsively when the screen shrinks"
  },
  {
    name: "shouldFocusAfterRender",
    type: "Boolean",
    defaultValue: "true",
    description: "Move focus into the modal when it is rendered"
  },
  {
    name: "shouldReturnFocusAfterClose",
    type: "Boolean",
    defaultValue: "true",
    description: "Move focus back to what triggered the modal after it closes"
  },
  {
    name: "ariaLabel",
    type: "String",
    defaultValue: "null",
    description:
      "String indicating how the modal content should be announced to screenreaders"
  },
  {
    name: "ariaDescribedBy",
    type: "String",
    defaultValue: "null",
    description:
      "String indicating the aria description of the modal (optional for enhanced accessibility if needed)"
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the modal component"
  },
  {
    name: "portalClassName",
    type: "String",
    defaultValue: "undefined",
    description:
      "className passed to the portal created for the modal component"
  },
  {
    name: "overlayClassName",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the overlay component"
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
        <Text>
          The form variant of the modal should be used whenever a user is inputs
          data into a modal. The important differences in this variant is to set
          a more appropriate maxWidth than the default modal. 456px is
          recommended for most basic forms.
        </Text>
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
      <SectionTitle>Closing the Modal</SectionTitle>
      <Text mb="x2">
        To close the modal using the built-in methods, the prop onRequestClose
        must be passed in. This prop should be the function that closes the
        modal. By providing this prop all three methods of closing the modal are
        enabled together: the close button, clicking outside the modal, and
        pressing the escape key. If you do not provide the onRequestClose prop,
        ensure that the there is another way to close the modal, for example a
        cancel button.{" "}
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Accessibility guidelines</SectionTitle>
      <Text mb="x2">
        In order to hide the rest of the application to screen-readers when the
        modal is open, make sure to use `Modal.setAppElement(el)` where el is
        the root element of the app. This will set the aria-hidden attribute to
        true when the moda is open.
      </Text>
      <Text>
        When there is no visible label on the Modal (ie. title prop), you should
        use the ariaLabel prop to provide a modal label. The aria-labelledby
        attribute is automatically applied if the title prop is specified. If
        the modal requires additional description for screen-readers, use the
        ariaDescribedBy prop.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsive information</SectionTitle>
      <Text>
        The Modal component has a width of "100%" and a customizable set
        maxWidth value. The Modal will force maxWidth to 100% when the screen is
        smaller than the small breakpoint (768px).
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/form">Form</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/buttons">Buttons</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/modal--modal">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
