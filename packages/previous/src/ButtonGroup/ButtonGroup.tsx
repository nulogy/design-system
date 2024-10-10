import styled from "styled-components";
import { Flex } from "../Flex";
import { FlexProps } from "../Flex/Flex";

type ButtonGroupProps = FlexProps & {
  children?: React.ReactNode;
  alignment?: "left" | "spaced" | "right";
  className?: string;
};

const alignments = {
  left: "flex-start",
  spaced: "space-between",
  right: "flex-end",
};

const buttonSpacings = (theme) => ({
  left: {
    "button:not(:last-child)": {
      marginRight: theme.space.x1,
    },
  },
  spaced: {
    "button:not(:last-child)": {
      marginRight: theme.space.x1,
    },
  },
  right: {
    "button:not(:first-child)": {
      marginLeft: theme.space.x1,
    },
  },
});

const getAlignment = (alignment) => alignments[alignment] || alignments.left;
const getButtonSpacing = (alignment, theme) => buttonSpacings(theme)[alignment] || buttonSpacings(theme).left;

const ButtonGroup = styled(Flex)<ButtonGroupProps>(({ alignment = "left", theme }) => ({
  flexWrap: "wrap",
  marginBottom: `-${theme.space.x1}`,
  justifyContent: getAlignment(alignment),
  button: {
    marginBottom: theme.space.x1,
  },
  ...getButtonSpacing(alignment, theme),
}));

export default ButtonGroup;
