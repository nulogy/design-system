import React from "react";
import styled, { CSSObject } from "styled-components";
import { transparentize } from "polished";
import { DefaultNDSThemeType } from "../theme.type";

const getHeaderPaddingRight = (closeButtonIncluded?: boolean, theme?: DefaultNDSThemeType) =>
  closeButtonIncluded ? theme.space.x8 : theme.space.x3;

type ModalHeaderProps = React.ComponentPropsWithRef<"div"> & {
  hasCloseButton?: boolean;
  theme?: DefaultNDSThemeType;
};

const ModalHeader = styled.div(
  ({ hasCloseButton, theme }: ModalHeaderProps): CSSObject => ({
    position: "relative",
    padding: `${theme.space.x2} ${getHeaderPaddingRight(hasCloseButton, theme)} ${theme.space.x2} ${theme.space.x3}`,
    backgroundColor: transparentize(0.1, theme.colors.white),
    zIndex: theme.zIndices.modalHeaderAndFooter,
    borderRadius: `${theme.radii.medium} ${theme.radii.medium} 0 0`,
    ":after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: theme.space.x1,
      right: theme.space.x1,
      display: "block",
      margin: "0 auto",
      borderBottom: `solid 1px ${theme.colors.lightGrey}`,
    },
  })
);

export default ModalHeader;
