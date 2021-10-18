import styled from "styled-components";
import { transparentize } from "polished";

const ModalFooter = styled.div(({ theme }) => ({
  position: "relative",
  padding: `${theme.space.x2} ${theme.space.x3}`,
  backgroundColor: transparentize(0.1, theme.colors.white),
  zIndex: theme.zIndices.modalHeaderAndFooter,
  borderRadius: `0 0 ${theme.radii.medium} ${theme.radii.medium}`,
  ":after": {
    content: "''",
    position: "absolute",
    top: 0,
    left: theme.space.x1,
    right: theme.space.x1,
    display: "block",
    margin: "0 auto",
    borderBottom: `solid 1px ${theme.colors.lightGrey}`,
  },
}));

export default ModalFooter;
