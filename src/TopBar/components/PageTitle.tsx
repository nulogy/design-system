import React, { ComponentProps } from "react";
import { StyledPageTitle } from "../TopBar.styled";

export function PageTitle({ children, ...props }: ComponentProps<typeof StyledPageTitle>) {
  return (
    <StyledPageTitle data-testid="topbar-page-title" {...props}>
      {children}
    </StyledPageTitle>
  );
}
