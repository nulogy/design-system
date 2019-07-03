import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { SectionTitle } from "../Type";
import { Button, PrimaryButton, DangerButton } from "../Button";
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

const DimPage = styled.div({
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: transparentize(0.1, theme.colors.whiteGrey),
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

const ModalCard = styled.div({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.medium,
  maxHeight: "70vh",
  minWidth: "400px",
  maxWidth: "800px"
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

const ModalHeader = styled.div({
  height: "64px",
  padding: `${theme.space.x2} ${theme.space.x3}`,
  backgroundColor: transparentize(0.1, theme.colors.white),
  borderBottom: `solid 1px ${theme.colors.lightGrey}`,
  zIndex: 2
});

const ModalFooter = styled.div({
  height: "72px",
  padding: `${theme.space.x2} ${theme.space.x3}`,
  backgroundColor: transparentize(0.1, theme.colors.white),
  borderTop: `solid 1px ${theme.colors.lightGrey}`,
  zIndex: 2
});

const ButtonSet = styled.div({
  "button:not(:first-child)": {
    marginLeft: theme.space.x1
  }
});

const Modal = ({ children, primaryButtons, secondaryButtons, type, ...props }) => (
  <DimPage>
    <ModalCard>
      <ModalHeader>
        <SectionTitle mb="none">Modal Title</SectionTitle>
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
    </ModalCard>
  </DimPage>
);

Modal.propTypes = {
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
  children: PropTypes.node
};

Modal.defaultProps = {
  primaryButtons: null,
  secondaryButtons: null,
  type: "informative",
  children: null
};

export default Modal;
