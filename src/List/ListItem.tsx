import styled from "styled-components";
import { space, color, typography, SpaceProps, ColorProps, TypographyProps } from "styled-system";
type ListItemProps = React.ComponentPropsWithRef<"li"> &
  SpaceProps &
  ColorProps &
  TypographyProps & {
    className?: string;
  };
const ListItem: React.FC<ListItemProps> = styled.li(space, color, typography, {
  "&:last-child": {
    marginBottom: 0,
  },
});
ListItem.defaultProps = {
  className: undefined,
  color: "currentColor",
  mb: "x1",
};
export default ListItem;
