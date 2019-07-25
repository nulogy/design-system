import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { transparentize } from "polished";
import { SectionTitle } from "../Type";
import { Button, PrimaryButton, DangerButton, CloseButton } from "../Button";
import { ButtonSet } from "../ButtonSet";
import theme from "../theme";
import { LockBodyScroll } from "../utils";

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
  if (!Array.isArray(buttons)) {
    return null;
  }

  return buttons.map(button => (
    <Button {...button} key={button.label}>
      {button.label}
    </Button>
  ));
};

const getModalButtons = (primaryButton, secondaryButtons, buttonAlignment, type) =>
  buttonAlignment === "spaced" ? (
    <React.Fragment>
      {getSecondaryButtons(secondaryButtons)}
      {getPrimaryButton(primaryButton, type)}
    </React.Fragment>
  ) : (
    <React.Fragment>
      {getPrimaryButton(primaryButton, type)}
      {getSecondaryButtons(secondaryButtons)}
    </React.Fragment>
  );

const modalHasHeader = (onRequestClose, title) => onRequestClose || title;

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

const StyledReactModal = styled(ReactModal)(
  ({ maxWidth }) => ({
    maxWidth
  }),
  {
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
    width: "100%",
    maxHeight: "70vh",
    margin: `0px ${theme.space.x2}`,
    padding: 0,
    [`@media only screen and (max-width: ${theme.breakpoints.small})`]: {
      width: "100%",
      maxWidth: "100%"
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
  }
);

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: transparentize(0.5, theme.colors.blackBlue),
  zIndex: theme.zIndex.overlay
};

const Modal = ({
  isOpen,
  shouldCloseOnOverlayClick,
  children,
  title,
  primaryButton,
  secondaryButtons,
  type,
  onRequestClose,
  onAfterOpen,
  buttonAlignment,
  ariaLabel,
  shouldFocusAfterRender,
  shouldReturnFocusAfterClose,
  ariaLabelledBy,
  ariaDescribedBy,
  portalClassName,
  overlayClassName,
  className,
  ...props
}) => (
  <StyledReactModal
    contentLabel={ariaLabel}
    onRequestClose={onRequestClose}
    onAfterOpen={onAfterOpen}
    shouldFocusAfterRender={shouldFocusAfterRender}
    shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
    isOpen={isOpen}
    portalClassName={portalClassName}
    overlayClassName={overlayClassName}
    className={className}
    aria={{
      labelledby: ariaLabelledBy,
      describedby: ariaDescribedBy
    }}
    {...props}
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    style={{
      overlay: overlayStyle
    }}
  >
    {isOpen && <LockBodyScroll />}
    {modalHasHeader(onRequestClose, title) && (
      <ModalHeader hasCloseButton={onRequestClose}>
        {title ? <SectionTitle mb="none">{title}</SectionTitle> : <div style={{ height: theme.space.x4 }} />}
        {onRequestClose && <ModalCloseButton onClick={onRequestClose} />}
      </ModalHeader>
    )}
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
  ariaLabel: PropTypes.string,
  buttonAlignment: PropTypes.oneOf(["left", "spaced"]),
  primaryButton: PropTypes.shape({}),
  secondaryButtons: PropTypes.arrayOf(PropTypes.shape({})),
  type: PropTypes.oneOf(["danger", "informative"]),
  children: PropTypes.node,
  onRequestClose: PropTypes.func,
  onAfterOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  shouldFocusAfterRender: PropTypes.bool,
  shouldReturnFocusAfterClose: PropTypes.bool,
  ariaLabelledBy: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  maxWidth: PropTypes.string,
  portalClassName: PropTypes.string,
  overlayClassName: PropTypes.string,
  className: PropTypes.string
};

Modal.defaultProps = {
  title: null,
  ariaLabel: null,
  buttonAlignment: "left",
  primaryButton: null,
  secondaryButtons: null,
  type: "informative",
  children: null,
  onRequestClose: null,
  onAfterOpen: null,
  isOpen: true,
  shouldFocusAfterRender: true,
  shouldReturnFocusAfterClose: true,
  ariaLabelledBy: null,
  ariaDescribedBy: null,
  maxWidth: "624px",
  portalClassName: "",
  overlayClassName: "",
  className: ""
};

Modal.setAppElement = ReactModal.setAppElement;

export default Modal;
