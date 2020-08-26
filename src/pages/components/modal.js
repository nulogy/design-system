/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button,
  ButtonGroup,
  PrimaryButton,
  QuietButton,
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
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "isOpen",
    type: "Boolean",
    defaultValue: "true",
    description: "Controls whether the modal is open or closed."
  },
  {
    name: "title",
    type: "String",
    defaultValue: "null",
    description: "The title appearing at the top of the modal."
  },
  {
    name: "onRequestClose",
    type: "Function",
    defaultValue: "null",
    description:
      "Function that is run when the modal requests to be closed (esc key, clicking outside, clicking close), also renders the close button is passed in."
  },
  {
    name: "footerContent",
    type: "Node",
    defaultValue: "null",
    description:
      "The content (usually buttons) to appear at the bottom of the modal."
  },
  {
    name: "onAfterOpen",
    type: "Function",
    defaultValue: "null",
    description: "Function that is run after the modal has opened."
  },
  {
    name: "maxWidth",
    type: "String",
    defaultValue: "624px",
    description:
      "Maximum width of the modal, modal will always compress responsively when the screen shrinks."
  },
  {
    name: "shouldFocusAfterRender",
    type: "Boolean",
    defaultValue: "true",
    description: "Move focus into the modal when it is rendered."
  },
  {
    name: "shouldReturnFocusAfterClose",
    type: "Boolean",
    defaultValue: "true",
    description: "Move focus back to what triggered the modal after it closes."
  },
  {
    name: "ariaLabel",
    type: "String",
    defaultValue: "null",
    description:
      "String indicating how the modal content should be announced to screenreaders."
  },
  {
    name: "ariaDescribedBy",
    type: "String",
    defaultValue: "null",
    description:
      "String indicating the aria description of the modal (optional for enhanced accessibility if needed)."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the modal component."
  },
  {
    name: "portalClassName",
    type: "String",
    defaultValue: "undefined",
    description:
      "className passed to the portal created for the modal component."
  },
  {
    name: "overlayClassName",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the overlay component."
  },
  {
    name: "closeAriaLabel",
    type: "String",
    defaultValue: "close",
    description: "Aria label on close button"
  }
];

Modal.setAppElement("#___gatsby");

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
        <PrimaryButton type="submit">Save</PrimaryButton>
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
          Are you sure you'd like to save these settings?
        </Modal>
      </div>
    );
  }
}

export default () => (
  <Layout>
    <Helmet>
      <title>Modal</title>
    </Helmet>
    <Intro>
      <Title>Modal</Title>
      <IntroText>
        Modal is a window that appears on top of the main content and allows the
        introduction of secondary flows while maintaining the original context.
      </IntroText>
    </Intro>

    <DocSection>
      <ModalExample />
      <Highlight className="js">
        {`import {
  Modal,
  ButtonGroup,
  PrimaryButton,
  QuietButton
} from "@nulogy/components";

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
    const buttons = (
      <ButtonGroup>
        <PrimaryButton type="submit" onClick={}>Save</PrimaryButton>
        <QuietButton onClick={this.closeModal}>Cancel</QuietButton>
      </ButtonGroup>
    );
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          title="Modal Title"
          isOpen={isOpen}
          onRequestClose={closeModal}
          footerContent={buttons}
        >
        Are you sure you'd like to save these settings?
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
      <SectionTitle>Closing the Modal</SectionTitle>
      <Text mb="x2">
        To close the modal using the built-in methods, the prop{" "}
        <Text inline fontFamily="monospace">
          onRequestClose{" "}
        </Text>
        must be passed in. This prop should be the function that closes the
        modal. By providing this prop all three methods of closing the modal are
        enabled together: the close button, clicking outside the modal, and
        pressing the escape key. If you do not provide the{" "}
        <Text inline fontFamily="monospace">
          onRequestClose{" "}
        </Text>{" "}
        prop, ensure that there is another way to close the modal, for example a
        cancel button.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Accessibility guidelines</SectionTitle>
      <Text mb="x2">
        In order to hide the rest of the application to screen-readers when the
        modal is open, make sure to use{" "}
        <Text inline fontFamily="monospace">
          Modal.setAppElement(el){" "}
        </Text>{" "}
        where el is the root element of the app. This will set{" "}
        <Text inline fontFamily="monospace">
          aria-hidden=true{" "}
        </Text>
        when the modal is open.
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
          <Link href={`${STORYBOOK_COMPONENT_URL}modal--modal`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
