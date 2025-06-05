import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type { IconName } from "@nulogy/icons";
import type { ButtonSize } from "../../Button/Button";
import { addStyledProps } from "../../StyledProps";
import { Icon } from "../../Icon";
import type { IconProps } from "../../Icon/Icon";

export interface ActionListButtonProps extends DropdownMenu.DropdownMenuTriggerProps {
  renderAsFragment?: boolean;
  size?: ButtonSize;
  icon?: IconName;
}

const ActionListButton = React.forwardRef<HTMLButtonElement, ActionListButtonProps>(
  ({ renderAsFragment = false, ...props }, ref) => {
    const { t } = useTranslation();

    if (renderAsFragment) {
      return <DropdownMenu.Trigger asChild ref={ref} {...props} />;
    }

    return (
      <DropdownMenuTrigger
        $iconOnly={!props.children}
        $size={props.size}
        aria-label={t("open action list")}
        {...props}
        ref={ref}
      >
        {props.children}
        {props.children ? (
          <CaretDown aria-hidden size="x2" />
        ) : (
          <Icon icon={props.icon || "more"} size={props.size === "small" ? "x2" : "x3"} />
        )}
      </DropdownMenuTrigger>
    );
  }
);

ActionListButton.displayName = "ActionListButton";

export default ActionListButton;

// Styled Components

const DropdownMenuTrigger = styled(DropdownMenu.Trigger)<{ $size?: ButtonSize; $iconOnly?: boolean }>(
  ({ theme, $size = "medium", $iconOnly = false }) => ({
    background: "none",
    border: "none",
    paddingLeft: $size === "small" ? theme.space.x1 : theme.space.x1_5,
    paddingRight: $size === "small" ? theme.space.x1 : theme.space.x1_5,
    paddingTop: $size === "small" ? theme.space.half : theme.space.x1,
    paddingBottom: $size === "small" ? theme.space.half : theme.space.x1,
    outline: "none",
    userSelect: "none",
    fontWeight: theme.fontWeights.medium,
    fontSize: $size === "small" ? theme.fontSizes.small : theme.fontSizes.medium,
    lineHeight: $size === "small" ? theme.lineHeights.smallTextCompressed : theme.lineHeights.base,
    borderRadius: $size === "small" ? theme.radii.medium : theme.radii.large,
    color: theme.colors.darkGrey,
    transition: "background-color 250ms ease",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space.half,

    ...($iconOnly && {
      padding: $size === "small" ? theme.space.half : theme.space.x1,
      borderRadius: theme.radii.circle,
    }),
    "&:focus-visible": { boxShadow: theme.shadows.focus },
    "&:hover, &[data-state=open]": { backgroundColor: theme.colors.lightBlue, color: theme.colors.darkBlue },
    "&:disabled": {
      cursor: "default",
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.colors.darkGrey,
      },
    },
  }),
  addStyledProps
);

const CaretDown = styled(Icon).attrs({
  icon: "downArrow",
})<Partial<IconProps>>({
  position: "relative",
  color: "currentColor",
  transition: "transform 250ms ease",
  "[data-state=open] &": { transform: "rotate(-180deg)" },
});
