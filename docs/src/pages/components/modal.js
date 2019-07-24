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
  Modal
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
    name: "",
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
        Modal dialog is a secondary window that allows introduction of a
        sub-flow while maintaining the original context. Modal dialog are used
        to introduce friction when needed.
      </IntroText>
    </Intro>

    <DocSection>
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
        {`import {Button} from "@nulogy/components";

<Button>Create project</Button>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use when</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Variation 1</SubsectionTitle>
        <Highlight className="js" />
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
