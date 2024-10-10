import styled from "styled-components";
import { addStyledProps, StyledProps } from "../StyledProps";
import ListItem from "./ListItem";

interface Props extends React.ComponentPropsWithRef<"ul">, StyledProps {
  className?: string;
  compact?: boolean;
  leftAlign?: boolean;
  listStyle?: string;
}

const List = styled.ul<Props>(
  ({ compact = false, leftAlign = false, color = "currentColor", theme, listStyle }) => ({
    margin: 0,
    color: color,
    paddingLeft: leftAlign ? "18px" : undefined,
    listStyle,
    [`${ListItem}`]: {
      marginBottom: compact ? 0 : theme.space.x1,
    },
  }),
  addStyledProps
);

export default List;
