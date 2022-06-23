import React from "react";
import styled from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";

type ModalContentProps = React.ComponentPropsWithRef<"div"> & {
  hasFooter?: any;
  theme?: DefaultNDSThemeType;
};

const ModalContent: React.FC<ModalContentProps> = styled.div(({ hasFooter, theme }: ModalContentProps) => ({
  marginTop: "-64px",
  marginBottom: hasFooter ? "-72px" : 0,
  overflow: "auto",
  paddingTop: "88px",
  paddingBottom: hasFooter ? "96px" : theme.space.x2,
  paddingLeft: theme.space.x3,
  paddingRight: theme.space.x3,
}));

export default ModalContent;
