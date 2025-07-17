import React from "react";
import { CollaborationCard2Body as StyledBody } from "./CollaborationCard2.parts";
import { CollaborationCard2BodyProps } from "./lib/types";

export function CollaborationCard2Body({ children }: CollaborationCard2BodyProps) {
  return <StyledBody>{children}</StyledBody>;
} 