import styled from "styled-components";
import { space, color, typography, SpaceProps, ColorProps, TypographyProps } from "styled-system";

type Props = React.ComponentPropsWithRef<"li"> & SpaceProps & ColorProps & TypographyProps;

const ListItem = styled.li<Props>(space, color, typography, {
  "&:last-child": {
    marginBottom: 0,
  },
});

export default ListItem;
