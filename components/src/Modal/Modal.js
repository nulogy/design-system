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
  overflow: "hidden",
  backgroundColor: theme.colors.white,
  borderRadius: theme.radii.medium,
  padding: theme.space.x2,
  minWidth: "300px",
  maxWidth: "800px"
});

const ModalContent = styled.div({
  paddingTop: theme.space.x8,
  paddingBottom: "80px",
  overflow: "scroll",
  maxHeight: "70vh"
});

const ModalHeader = styled.div({
  position: "absolute",
  height: "64px",
  top: 0,
  left: theme.space.x1,
  right: theme.space.x1,
  backgroundColor: transparentize(0.1, theme.colors.white),
  borderBottom: `solid 1px ${theme.colors.lightGrey}`
});

const ModalFooter = styled.div({
  position: "absolute",
  height: "72px",
  bottom: 0,
  left: theme.space.x1,
  right: theme.space.x1,
  backgroundColor: transparentize(0.1, theme.colors.white),
  borderTop: `solid 1px ${theme.colors.lightGrey}`
});

const ButtonSet = styled.div({
  margin: `${theme.space.x2} 0px`,
  button: {
    marginLeft: theme.space.x1
  }
});

const Modal = ({ children, ...props }) => (
  <DimPage>
    <ModalCard>
      <ModalHeader>
        <SectionTitle ml="x1" mt="x2">
          Modal Title
        </SectionTitle>
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
