import React from "react";
import styled from "styled-components";
import { space, color, typography, SpaceProps, ColorProps, TypographyProps } from "styled-system";

type Props = React.ComponentPropsWithRef<"li"> & SpaceProps & ColorProps & TypographyProps;

const ListItem = styled.li<Props>(
  ({ theme }) => ({
    color: "currentcolor",
    marginBottom: theme.space.x1,
    "&:last-child": {
      marginBottom: 0,
    },
  }),
  space,
  color,
  typography
);

export default ListItem;
