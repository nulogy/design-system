import styled from "styled-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";

type Side = "left" | "right";

const TabScrollIndicatorButton = styled.button<{ side: Side; width: string | number }>(({ side, width, theme }) => ({
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
  zIndex: theme.zIndices.tabsScollIndicator,
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

type TabScrollIndicatorProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  side?: Side;
  width?: string | number;
  ariaLabelLeft?: string;
  ariaLabelRight?: string;
};

const TabScrollIndicator: React.FC<React.PropsWithChildren<TabScrollIndicatorProps>> = ({
  side = "left",
  width = 40,
  ariaLabelLeft,
  ariaLabelRight,
  onClick,
  ...props
}) => {
  const { t } = useTranslation();

  const rightArrowLabel = ariaLabelRight || t("next");
  const leftArrowLabel = ariaLabelLeft || t("previous");

  function preventFocusMovement(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <TabScrollIndicatorButton
      {...props}
      width={width}
      tabIndex={-1}
      onClick={onClick}
      onMouseDown={preventFocusMovement}
      side={side}
      aria-label={side === "right" ? rightArrowLabel : leftArrowLabel}
    >
      <Icon icon={side === "right" ? "rightArrow" : "leftArrow"} />
    </TabScrollIndicatorButton>
  );
};

export default TabScrollIndicator;
