import styled from "styled-components";
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  typography,
  TypographyProps,
  layout,
  LayoutProps,
  boxShadow,
  BoxShadowProps,
  border,
  BorderProps,
} from "styled-system";
import ListItem from "./ListItem";
import { DefaultNDSThemeType } from "../theme.type";

type ListProps = React.ComponentPropsWithRef<"ul"> &
  SpaceProps &
  BorderProps &
  ColorProps &
  LayoutProps &
  TypographyProps &
  BoxShadowProps & {
    theme?: DefaultNDSThemeType;
    className?: string;
    compact?: boolean;
    leftAlign?: boolean;
    listStyle?: string;
  };
const List: React.SFC<ListProps> = styled.ul(
  ({ compact, theme, leftAlign, listStyle }: ListProps) => ({
    margin: 0,
    paddingLeft: leftAlign ? "18px" : undefined,
    listStyle,
    [`${ListItem}`]: {
      marginBottom: compact ? 0 : theme.space.x1,
    },
  }),
  space,
  color,
  typography,
  layout,
  boxShadow,
  border
);
List.defaultProps = {
  className: undefined,
  compact: false,
  leftAlign: false,
  listStyle: undefined,
  color: "currentColor",
};
export default List;
