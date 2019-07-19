import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { transparentize } from "polished";
import { SectionTitle } from "../Type";
import { Button, PrimaryButton, DangerButton, CloseButton } from "../Button";
import { ButtonSet } from "../ButtonSet";
import theme from "../theme";

const getPrimaryButtonComponent = type => {
  if (type === "informative") {
    return PrimaryButton;
  } else if (type === "danger") {
    return DangerButton;
  } else {
    return Button;
  }
};

const getPrimaryButton = (button, type) => {
  const PrimaryButtonComponent = getPrimaryButtonComponent(type);

  return <PrimaryButtonComponent {...button}>{button.label}</PrimaryButtonComponent>;
};

const getSecondaryButtons = buttons => {
  const buttonArray = Array.isArray(buttons) ? buttons : [buttons];

  return buttonArray.map(button => (
    <Button {...button} key={button.label}>
      {button.label}
    </Button>
  ));
};

const getModalButtons = (primaryButton, secondaryButtons, buttonAlignment, type) => (
  <React.Fragment>
    {buttonAlignment !== "left" && getSecondaryButtons(secondaryButtons)}
    {getPrimaryButton(primaryButton, type)}
    {buttonAlignment === "left" && getSecondaryButtons(secondaryButtons)}
  </React.Fragment>
);

const modalHasFooter = (primaryButton, secondaryButtons) => primaryButton || secondaryButtons;

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

const ModalHeader = styled.div(({ hasCloseButton }) => ({
  position: "relative",
  padding: `${theme.space.x2} ${getHeaderPaddingRight(hasCloseButton)} ${theme.space.x2} ${theme.space.x3}`,
  backgroundColor: transparentize(0.1, theme.colors.white),
  zIndex: 2,
  ":after": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: theme.space.x1,
    right: theme.space.x1,
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
    left: theme.space.x1,
    right: theme.space.x1,
    display: "block",
    margin: "0 auto",
    borderBottom: `solid 1px ${theme.colors.lightGrey}`
  }
});

const ModalCloseButton = styled(CloseButton)({
  position: "absolute",
  top: "12px",
  right: theme.space.x2,
  zIndex: 3
});

const StyledReactModal = styled(ReactModal)({
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
  primaryButton,
  secondaryButtons,
  type,
  onRequestClose,
  buttonAlignment,
  ...props
}) => (
  <StyledReactModal
    onRequestClose={onRequestClose}
    isOpen={isOpen}
    {...props}
    shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    style={{
      overlay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: transparentize(0.5, theme.colors.blackBlue)
      }
    }}
  >
    <ModalHeader hasCloseButton={!!onRequestClose}>
      {title ? <SectionTitle mb="none">{title}</SectionTitle> : <div style={{ height: theme.space.x4 }} />}
      {onRequestClose && <ModalCloseButton onClick={onRequestClose} />}
    </ModalHeader>
    <ModalContent>
      <InnerModalContent>{children}</InnerModalContent>
    </ModalContent>
    {modalHasFooter(primaryButton, secondaryButtons) && (
      <ModalFooter>
        <ButtonSet alignment={buttonAlignment}>
          {getModalButtons(primaryButton, secondaryButtons, buttonAlignment, type)}
        </ButtonSet>
      </ModalFooter>
    )}
  </StyledReactModal>
);

Modal.propTypes = {
  title: PropTypes.string,
  buttonAlignment: PropTypes.oneOf(["left", "spaced", "right"]),
  primaryButton: PropTypes.shape({}),
  secondaryButtons: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.shape({})]),
  type: PropTypes.oneOf(["danger", "informative"]),
  children: PropTypes.node,
  onRequestClose: PropTypes.func,
  isOpen: PropTypes.bool,
  shouldCloseOnOverlayClick: PropTypes.bool
};

Modal.defaultProps = {
  title: null,
  buttonAlignment: "right",
  primaryButton: null,
  secondaryButtons: null,
  type: "informative",
  children: null,
  onRequestClose: null,
  isOpen: true,
  shouldCloseOnOverlayClick: true
};

Modal.setAppElement = ReactModal.setAppElement;

export default Modal;
