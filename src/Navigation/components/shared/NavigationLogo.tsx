import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div<{ $maxWidth?: string; $maxHeight?: string }>(({ $maxWidth, $maxHeight }) => ({
  display: "flex",
  alignItems: "center",
  maxWidth: $maxWidth ?? "184px",
  maxHeight: $maxHeight ?? "36px",
  "& > *": {
    width: "100%",
    objectFit: "contain",
  },
}));

interface NavigationLogoProps {
  maxWidth?: string;
  maxHeight?: string;
  children: React.ReactNode;
}

export const NavigationLogo = ({ children, maxWidth, maxHeight, ...props }: NavigationLogoProps) => {
  return (
    <LogoContainer $maxWidth={maxWidth} $maxHeight={maxHeight} {...props}>
      {children}
    </LogoContainer>
  );
};
