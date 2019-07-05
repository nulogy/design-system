import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { default as ReactModal } from "react-modal";
import { transparentize } from "polished";
import { SectionTitle } from "../Type";
import { Button, PrimaryButton, DangerButton, CloseButton } from "../Button";
import { Icon } from "../Icon";
import theme from "../theme";

const getButtonComponent = type => {
  if (type === "informative") {
    return PrimaryButton;
  } else if (type === "danger") {
    return DangerButton;
  } else {
    return Button;
  }
};

const getButtons = (buttons, type) => {
  if (!Array.isArray(buttons) || !buttons.length) {
    return null;
  }

  const ButtonComponent = getButtonComponent(type);

  return buttons.map(button => (
    <ButtonComponent onClick={button.onClick} key={button.label}>
      {button.label}
    </ButtonComponent>
  ));
};

const modalHasFooter = (primaryButtons, secondaryButtons) => primaryButtons || secondaryButtons;

const ModalCard = styled.div({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.medium,
  maxHeight: "70vh",
  width: "60%",
  maxWidth: "720px",
  margin: `0px ${theme.space.x2}`,
  [`@media only screen and (max-width: ${theme.breakpoints.small})`]: {
    width: "100%"
  }
});

const ModalContent = styled.div({
  marginTop: "-64px",
  marginBottom: "-80px",
  overflow: "scroll"
});

const InnerModalContent = styled.div({
  paddingTop: "80px",
  paddingBottom: "94px",
  paddingLeft: theme.space.x3,
  paddingRight: theme.space.x3
});

const getHeaderPaddingRight = closeButtonIncluded => (closeButtonIncluded ? theme.space.x8 : theme.space.x3);

const ModalHeader = styled.div(({ includeClose }) => ({
  position: "relative",
  padding: `${theme.space.x2} ${getHeaderPaddingRight(includeClose)} ${theme.space.x2} ${theme.space.x3}`,
  backgroundColor: transparentize(0.1, theme.colors.white),
  zIndex: 2,
  ":after": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: theme.space.x2,
    right: theme.space.x2,
    display: "block",
    margin: "0 auto",
    borderBottom: `solid 1px ${theme.colors.lightGrey}`
  }
}));

const ModalFooter = styled.div({
  position: "relative",
  padding: `${theme.space.x2} ${theme.space.x3}`,
  backgroundColor: transparentize(0.1, theme.colors.white),
  zIndex: 2,
  ":after": {
    content: "''",
    position: "absolute",
    top: 0,
    left: theme.space.x2,
    right: theme.space.x2,
    display: "block",
    margin: "0 auto",
    borderBottom: `solid 1px ${theme.colors.lightGrey}`
  }
});

const ButtonSet = styled.div({
  "button:not(:first-child)": {
    marginLeft: theme.space.x1
  }
});

const ModalCloseButton = styled(CloseButton)({
  position: "absolute",
  top: "12px",
  right: theme.space.x2,
  zIndex: 3
});

ReactModal.setAppElement("#root");

class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { children, title, primaryButtons, secondaryButtons, type, includeClose } = this.props;
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
          style={{
            content: {
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              backgroundColor: theme.colors.white,
              borderRadius: theme.radii.medium,
              border: null,
              maxHeight: "70vh",
              width: "60%",
              maxWidth: "720px",
              margin: `0px ${theme.space.x2}`,
              padding: 0,
              [`@media only screen and (max-width: ${theme.breakpoints.small})`]: {
                width: "100%"
              },
              color: theme.colors.black,
              fontFamily: theme.fonts.base,
              fontSize: theme.fontSizes.medium,
              lineHeight: theme.lineHeights.base,
              "-webkit-font-smoothing": "antialiased",
              "-moz-osx-font-smoothing": "grayscale",
              button: {
                fontFamily: theme.fonts.base
              },
              "*": {
                boxSizing: "border-box"
              }
            },
            overlay: {
              backgroundColor: transparentize(0.1, theme.colors.whiteGrey)
            }
          }}
        >
          <ModalHeader includeClose={includeClose}>
            {title ? <SectionTitle mb="none">{title}</SectionTitle> : <div style={{ height: theme.space.x4 }} />}
            {includeClose && <ModalCloseButton onClick={this.closeModal} />}
          </ModalHeader>
          <ModalContent>
            <InnerModalContent>{children}</InnerModalContent>
          </ModalContent>
          {modalHasFooter(primaryButtons, secondaryButtons) && (
            <ModalFooter>
              <ButtonSet>
                {getButtons(primaryButtons, type)}
                {getButtons(secondaryButtons)}
              </ButtonSet>
            </ModalFooter>
          )}
        </ReactModal>
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  primaryButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func
    })
  ).isRequired,
  secondaryButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func
    })
  ).isRequired,
  type: PropTypes.oneOf(["danger", "informative"]),
  children: PropTypes.node,
  includeClose: PropTypes.bool
};

Modal.defaultProps = {
  title: null,
  primaryButtons: null,
  secondaryButtons: null,
  type: "informative",
  children: null,
  includeClose: true
};

export default Modal;
