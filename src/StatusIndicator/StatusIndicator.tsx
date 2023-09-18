import React from "react";
import styled from "styled-components";
import { space, typography, flexbox, SpaceProps, TypographyProps, FlexboxProps } from "styled-system";
import { DefaultNDSThemeType } from "../theme.type";

export const StatusIndicatorValues = {
  neutral: "neutral",
  dark: "dark",
  danger: "danger",
  informative: "informative",
  success: "success",
  warning: "warning",
  quiet: "quiet",
} as const;

export type StatusIndicatorType = typeof StatusIndicatorValues[keyof typeof StatusIndicatorValues];

const statusIndicatorStyles = (theme: DefaultNDSThemeType) => ({
  [StatusIndicatorValues.neutral]: {
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.lightGrey,
    color: theme.colors.darkGrey,
  },
  [StatusIndicatorValues.dark]: {
    borderColor: theme.colors.blackBlue,
    backgroundColor: theme.colors.blackBlue,
    color: theme.colors.white,
  },
  [StatusIndicatorValues.quiet]: {
    border: "1px solid",
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.white,
    color: theme.colors.darkGrey,
  },
  [StatusIndicatorValues.danger]: {
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.red,
    color: theme.colors.white,
  },
  [StatusIndicatorValues.informative]: {
    borderColor: theme.colors.blue,
    backgroundColor: theme.colors.blue,
    color: theme.colors.white,
  },
  [StatusIndicatorValues.success]: {
    borderColor: theme.colors.green,
    backgroundColor: theme.colors.green,
    color: theme.colors.white,
  },
  [StatusIndicatorValues.warning]: {
    borderColor: theme.colors.yellow,
    backgroundColor: theme.colors.yellow,
    color: theme.colors.darkGrey,
  },
});

type StatusIndicatorProps = SpaceProps &
  TypographyProps &
  FlexboxProps & {
    type?: StatusIndicatorType;
  };

const StatusIndicator: React.FC<StatusIndicatorProps> = styled.span(
  space,
  typography,
  flexbox,
  ({ theme, type }: { theme: DefaultNDSThemeType; type: StatusIndicatorType }) => ({
    display: "inline-block",
    fontWeight: theme.fontWeights.bold,
    textTransform: "uppercase",
    letterSpacing: ".05em",
    borderRadius: theme.space.x1,
    ...statusIndicatorStyles(theme)[type],
  })
);

StatusIndicator.defaultProps = {
  type: StatusIndicatorValues.neutral,
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
