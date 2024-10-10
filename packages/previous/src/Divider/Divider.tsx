import styled from "styled-components";
import { addStyledProps, StyledProps } from "../StyledProps";

type Props = StyledProps;

const Divider = styled.div<Props>(
  ({ theme, color }) => ({
    display: "flex",
    marginTop: theme.space.x2,
    marginBottom: theme.space.x2,
    marginLeft: "0",
    marginRight: "0",
    borderBottom: "1px solid",
    borderColor: color ? color : theme.colors.lightGrey,
  }),
  addStyledProps
);

export default Divider;
