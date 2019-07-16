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
    <ButtonComponent {...button} key={button.label}>
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

const ModalHeader = styled.div(({ closeFunction }) => ({
  position: "relative",
  padding: `${theme.space.x2} ${getHeaderPaddingRight(closeFunction)} ${theme.space.x2} ${theme.space.x3}`,
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
  "button:not(:last-child)": {
    marginRight: theme.space.x1
  }
});

const ModalCloseButton = styled(CloseButton)({
  position: "absolute",
  top: "12px",
  right: theme.space.x2,
  zIndex: 3
});

const ReactModal2 = styled(ReactModal)({
  ":focus": {
    outline: "none"
  },
  display: "flex",
  flexDirection: "column",
  position: "relative",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.medium,
  border: null,
  maxHeight: "70vh",
  width: "60%",
  maxWidth: theme.breakpoints.small,
  margin: `0px ${theme.space.x2}`,
  padding: 0,
  [`@media only screen and (max-width: ${theme.breakpoints.small})`]: {
    width: "100%"
  },
  button: {
    fontFamily: theme.fonts.base
  },
  "*": {
    boxSizing: "border-box"
  },
  color: theme.colors.black,
  fontFamily: theme.fonts.base,
  fontSize: theme.fontSizes.medium,
  lineHeight: theme.lineHeights.base,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale"
});

const Modal = ({
  isOpen,
  shouldCloseOnOverlayClick,
  children,
  title,
  primaryButtons,
  secondaryButtons,
  type,
  closeFunction,
  ...props
}) => (
  <ReactModal2
    isOpen={isOpen}
    {...props}
    shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    style={{
      overlay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: transparentize(0.1, theme.colors.whiteGrey)
      }
    }}
  >
    <ModalHeader closeFunction={!!closeFunction}>
      {title ? <SectionTitle mb="none">{title}</SectionTitle> : <div style={{ height: theme.space.x4 }} />}
      {closeFunction && <ModalCloseButton onClick={closeFunction} />}
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
  </ReactModal2>
);

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
  closeFunction: PropTypes.func,
  isOpen: PropTypes.bool,
  shouldCloseOnOverlayClick: PropTypes.bool
};

Modal.defaultProps = {
  title: null,
  primaryButtons: null,
  secondaryButtons: null,
  type: "informative",
  children: null,
  closeFunction: null,
  isOpen: true,
  shouldCloseOnOverlayClick: true
};

Modal.setAppElement = ReactModal.setAppElement;

export default Modal;
