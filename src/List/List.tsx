import styled from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps, StyledProps } from "../StyledProps";
import ListItem from "./ListItem";

type ListProps = React.ComponentPropsWithRef<"ul"> &
  StyledProps & {
    theme?: DefaultNDSThemeType;
    className?: string;
    compact?: boolean;
    leftAlign?: boolean;
    listStyle?: string;
  };
const List: React.FC<React.PropsWithChildren<ListProps>> = styled.ul(
  ({ compact, theme, leftAlign, listStyle }: ListProps) => ({
    margin: 0,
    paddingLeft: leftAlign ? "18px" : undefined,
    listStyle,
    [`${ListItem}`]: {
      marginBottom: compact ? 0 : theme.space.x1,
    },
  }),
  addStyledProps
);
List.defaultProps = {
  className: undefined,
  compact: false,
  leftAlign: false,
  listStyle: undefined,
  color: "currentColor",
};
export default List;
