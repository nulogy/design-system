// @ts-nocheck
import styled from "styled-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";
const TabScrollIndicatorButton = styled.button(({ side, width, theme }) => ({
  position: "absolute",
  color: theme.colors.black,
  top: 0,
  bottom: 0,
  left: side === "left" ? 0 : undefined,
  right: side === "right" ? 0 : undefined,
  height: width,
  width,
  background: theme.colors.white,
  opacity: 0.8,
  zIndex: theme.zIndex.tabsScollIndicator,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: theme.fontWeights.medium,
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  backgroundColor: theme.colors.white,
  border: `0px solid`,
  margin: theme.space.none,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.lightBlue,
  },
  "&:focus": {
    outline: "none",
  },
  "&:active": {},
  "&:disabled": {
    opacity: ".5",
  },
}));
function preventFocusMovement(e) {
  e.preventDefault();
}
type TabScrollIndicatorProps = {
  onClick?: (...args: any[]) => any;
  side?: "left" | "right";
  width?: string | number;
  ariaLabelLeft?: string;
  ariaLabelRight?: string;
};
const TabScrollIndicator: React.SFC<TabScrollIndicatorProps> = ({
  onClick,
  side,
  ariaLabelLeft,
  ariaLabelRight,
  ...props
}) => {
  const { t } = useTranslation();
  const handleClick = () => {
    onClick(side);
  };
  const rightArrowLabel = ariaLabelRight || t("next");
  const leftArrowLabel = ariaLabelLeft || t("previous");
  return (
    <TabScrollIndicatorButton
      {...props}
      tabIndex={-1}
      onClick={handleClick}
      onMouseDown={preventFocusMovement}
      side={side}
      aria-label={side === "right" ? rightArrowLabel : leftArrowLabel}
    >
      <Icon icon={side === "right" ? "rightArrow" : "leftArrow"} />
    </TabScrollIndicatorButton>
  );
};
TabScrollIndicator.defaultProps = {
  onClick: () => {},
  side: "left",
  width: 40,
  ariaLabelLeft: undefined,
  ariaLabelRight: undefined,
};
export default TabScrollIndicator;
