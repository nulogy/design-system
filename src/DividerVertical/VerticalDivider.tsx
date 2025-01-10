import styled from "styled-components";
import { addStyledProps, StyledProps } from "../StyledProps";
import { Divider } from "../Divider";

export interface DividerProps extends StyledProps, React.HTMLAttributes<HTMLHRElement> {
  secondary?: boolean;
}

const VerticalDivider = styled(Divider)(
  ({ theme }) => ({
    borderBottom: "none",
    borderRight: "none",
    borderLeft: `1px solid ${theme.colors.lightGrey}`,
    borderTop: "none",
    height: theme.sizes.x2,
    margin: theme.sizes.x1,
  }),
  addStyledProps,
);
VerticalDivider.displayName = "VerticalDivider";

export default VerticalDivider;
