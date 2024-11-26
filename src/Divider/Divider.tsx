import styled from "styled-components";
import { addStyledProps, StyledProps } from "../StyledProps";

export interface DividerProps extends StyledProps, React.HTMLAttributes<HTMLHRElement> {
  secondary?: boolean;
}

const Divider = styled.hr<DividerProps>(
  ({ theme, color, secondary }) => ({
    border: "none",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    width: "100%",
    marginTop: theme.space.x2,
    marginBottom: theme.space.x2,
    borderColor: color || (secondary ? theme.colors.whiteGrey : theme.colors.lightGrey),
  }),
  addStyledProps
);

export default Divider;
