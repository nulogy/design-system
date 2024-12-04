import React, { ComponentPropsWithoutRef } from "react";
import { StyledPageTitle } from "../TopBar.styled";

export function PageTitle({ children }: ComponentPropsWithoutRef<"li">) {
  return <StyledPageTitle>{children}</StyledPageTitle>;
}
