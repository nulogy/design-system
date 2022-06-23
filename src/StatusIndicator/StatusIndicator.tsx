import styled, { StyledComponent } from "styled-components";
import { space, typography, flexbox, SpaceProps, TypographyProps, FlexboxProps } from "styled-system";

const StatusIndicatorColours = (theme) => ({
  neutral: {
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.lightGrey,
    color: theme.colors.darkGrey,
  },
  dark: {
    borderColor: theme.colors.blackBlue,
    backgroundColor: theme.colors.blackBlue,
    color: theme.colors.white,
  },
  quiet: {
    borderColor: theme.colors.white,
    backgroundColor: theme.colors.white,
    color: theme.colors.darkGrey,
  },
  danger: {
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.red,
    color: theme.colors.white,
  },
  informative: {
    borderColor: theme.colors.blue,
    backgroundColor: theme.colors.blue,
    color: theme.colors.white,
  },
  success: {
    borderColor: theme.colors.green,
    backgroundColor: theme.colors.green,
    color: theme.colors.white,
  },
  warning: {
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
    type?: "neutral" | "dark" | "danger" | "informative" | "success" | "warning" | "quiet";
  };
const StatusIndicator: React.FC<any> = styled.p(space, typography, flexbox, ({ theme, type }: any) => ({
  display: "inline-block",
  fontWeight: theme.fontWeights.bold,
  textTransform: "uppercase",
  letterSpacing: ".05em",
  borderRadius: theme.space.x1,
  ...getStatusIndicatorColours(type, theme),
}));

StatusIndicator.defaultProps = {
  type: "neutral",
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
