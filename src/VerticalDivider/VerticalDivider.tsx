import styled from "styled-components";
import { addStyledProps, StyledProps } from "../StyledProps";

export interface DividerProps extends StyledProps, React.HTMLAttributes<HTMLDivElement> {
  secondary?: boolean;
}

const VerticalDivider = styled.div<DividerProps>(
  ({ theme, color, secondary }) => ({
    display: "inline",
    borderLeftColor: color || (secondary ? theme.colors.whiteGrey : theme.colors.lightGrey),
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderTop: "none",
    borderBottom: "none",
    borderRight: "none",
    height: theme.sizes.x2,
    marginLeft: theme.space.x2,
    marginRight: theme.space.x2,
  }),
  addStyledProps
);
VerticalDivider.displayName = "VerticalDivider";

export default VerticalDivider;
