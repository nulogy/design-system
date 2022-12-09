import React from "react";
import styled from "styled-components";
import { space, typography, flexbox, SpaceProps, TypographyProps, FlexboxProps } from "styled-system";
import { DefaultNDSThemeType } from "../theme.type";

export enum StatusIndicatorType {
  neutral = "neutral",
  dark = "dark",
  danger = "danger",
  informative = "informative",
  success = "success",
  warning = "warning",
  quiet = "quiet",
}

const StatusIndicatorColours = (theme) => ({
  [StatusIndicatorType.neutral]: {
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.lightGrey,
    color: theme.colors.darkGrey,
  },
  [StatusIndicatorType.dark]: {
    borderColor: theme.colors.blackBlue,
    backgroundColor: theme.colors.blackBlue,
    color: theme.colors.white,
  },
  [StatusIndicatorType.quiet]: {
    borderColor: theme.colors.white,
    backgroundColor: theme.colors.white,
    color: theme.colors.darkGrey,
  },
  [StatusIndicatorType.danger]: {
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.red,
    color: theme.colors.white,
  },
  [StatusIndicatorType.informative]: {
    borderColor: theme.colors.blue,
    backgroundColor: theme.colors.blue,
    color: theme.colors.white,
  },
  [StatusIndicatorType.success]: {
    borderColor: theme.colors.green,
    backgroundColor: theme.colors.green,
    color: theme.colors.white,
  },
  [StatusIndicatorType.warning]: {
    borderColor: theme.colors.yellow,
    backgroundColor: theme.colors.yellow,
    color: theme.colors.darkGrey,
  },
});

const getStatusIndicatorColours = (type, theme) => {
  return StatusIndicatorColours(theme)[type];
};

type StatusIndicatorProps = SpaceProps &
  TypographyProps &
  FlexboxProps & {
    type?: keyof typeof StatusIndicatorType;
  };

const StatusIndicator: React.FC<StatusIndicatorProps> = styled.p(
  space,
  typography,
  flexbox,
  ({ theme, type }: { theme: DefaultNDSThemeType; type: keyof typeof StatusIndicatorType }) => ({
    display: "inline-block",
    fontWeight: theme.fontWeights.bold,
    textTransform: "uppercase",
    letterSpacing: ".05em",
    borderRadius: theme.space.x1,
    ...getStatusIndicatorColours(type, theme),
  })
);

StatusIndicator.defaultProps = {
  type: StatusIndicatorType.neutral,
  mt: "0",
  mr: "0",
  mb: "0",
  ml: "0",
  pt: "0",
  pr: "x1",
  pb: "0",
  pl: "x1",
  fontSize: "smaller",
  lineHeight: "smallerText",
  alignSelf: "center",
};
export default StatusIndicator;
