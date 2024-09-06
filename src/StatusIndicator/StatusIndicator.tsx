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

interface Props extends SpaceProps, TypographyProps, FlexboxProps {
  type?: StatusIndicatorType;
}

const StatusIndicator = styled.span<Props>(
  ({ theme, type = StatusIndicatorValues.neutral }) => ({
    margin: theme.space.none,
    paddingTop: theme.space.none,
    paddingRight: theme.space.x1,
    paddingBottom: theme.space.none,
    paddingLeft: theme.space.x1,
    fontSize: theme.fontSizes.smaller,
    lineHeight: theme.lineHeights.smallerText,
    alignSelf: "center",
    display: "inline-block",
    fontWeight: theme.fontWeights.bold,
    textTransform: "uppercase",
    letterSpacing: ".05em",
    borderRadius: theme.space.x1,
    ...statusIndicatorStyles(theme)[type],
  }),
  space,
  typography,
  flexbox
);

export default StatusIndicator;
