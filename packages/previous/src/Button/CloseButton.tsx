import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Icon } from "../Icon";
import theme from "../theme";

const WrapperButton = styled.button(({ disabled }) => ({
  background: "transparent",
  border: "none",
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  padding: 0,
  color: theme.colors.black,
  cursor: disabled ? "arrow" : "pointer",
  [`${Icon}`]: {
    borderRadius: theme.radii.circle,
    transition: ".2s",
  },
  "&:hover": {
    [`${Icon}`]: {
      backgroundColor: theme.colors.lightGrey,
    },
  },
  "&:active": {
    [`${Icon}`]: {
      transform: "scale(0.875)",
      transition: ".2s ease-in",
    },
  },
  "&:disabled": {
    opacity: ".5",
    "&:hover, &:active": {
      [`${Icon}`]: {
        background: "none",
        transform: "none",
      },
    },
  },
  "&:focus": {
    outline: "none",
    [`${Icon}`]: {
      boxShadow: theme.shadows.focus,
    },
  },
}));
const CloseButton = React.forwardRef(({ ...props }: any, ref) => {
  const { t } = useTranslation();
  return (
    <WrapperButton aria-label={t("close")} ref={ref} {...props}>
      <Icon size={theme.space.x4} icon="close" p="half" />
    </WrapperButton>
  );
});

export default CloseButton;
