import styled from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import { StyleProps, stylePropsToCss } from "./NavBar";

// NDS should really export this instead of us having to re-create it here
export type NewMenuTriggerButtonProps = React.ComponentPropsWithRef<"button"> &
  StyleProps & {
    color?: string;
    disabled?: boolean;
    theme?: DefaultNDSThemeType;
    hoverColor?: string;
    bgHoverColor?: string;
  };

export const NewMenuTriggerButton: React.FC<NewMenuTriggerButtonProps> = styled.button(
  ({ theme }) => ({
    color: theme.colors.darkGrey,
    backgroundColor: "transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
    border: "none",
    padding: theme.space.x1,
    fontSize: theme.fontSizes.small,
    fontWeight: theme.fontWeights.medium,
    lineHeight: theme.space.x3,
    borderRadius: theme.sizes.x1,
    transition: ".2s",
    "&:hover": {
      color: theme.colors.darkBlue,
      backgroundColor: theme.colors.lightBlue,
    },
    "&: focus": {
      outline: "none",
      color: theme.colors.darkBlue,
      backgroundColor: theme.colors.white,
      boxShadow: theme.shadows.focus,
      "&:hover": {
        backgroundColor: theme.colors.lightBlue,
      },
    },
    "&: active": {
      color: theme.colors.darkBlue,
      backgroundColor: theme.colors.lightBlue,
      boxShadow: theme.shadows.focus,
    },
  }),
  stylePropsToCss
);

export default NewMenuTriggerButton;
