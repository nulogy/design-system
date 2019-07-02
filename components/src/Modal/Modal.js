import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";
import { SectionTitle } from "../Type";
import { Button, PrimaryButton, DangerButton } from "../Button";
import theme from "../theme";

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
  position: "relative",
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.medium,
  padding: theme.space.x2,
  width: "300px",
  height: "300px"
});

const ModalContent = styled.div({
  //margin: `${theme.space.x8} 0`,
  padding: `${theme.space.x8} 0px`,
  overflow: "scroll",
  height: "100%"
});

const ModalHeader = styled.div({
  position: "absolute",
  top: theme.space.x2,
  left: theme.space.x1,
  right: theme.space.x1,
  backgroundColor: transparentize(0.1, theme.colors.white),
  borderBottom: `solid 1px ${theme.colors.lightGrey}`
});

const ModalFooter = styled.div({
  position: "absolute",
  bottom: theme.space.x2,
  left: theme.space.x1,
  right: theme.space.x1,
  backgroundColor: transparentize(0.1, theme.colors.white),
  borderTop: `solid 1px ${theme.colors.lightGrey}`
});

const ButtonSet = styled.div({
  marginTop: theme.space.x2,
  button: {
    marginLeft: theme.space.x1
  }
});

const Modal = ({ children, ...props }) => (
  <DimPage>
    <ModalCard>
      <ModalHeader>
        <SectionTitle ml="x1">Modal Title</SectionTitle>
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
      <ModalFooter>
        <ButtonSet>
          <PrimaryButton>Primary Button</PrimaryButton>
          <Button>Button</Button>
        </ButtonSet>
      </ModalFooter>
    </ModalCard>
  </DimPage>
);

export default Modal;
