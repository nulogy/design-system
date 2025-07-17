import React from "react";
import { CollaborationCard2Provider } from "./CollaborationCard2Context";
import { CollaborationCard2Container } from "./CollaborationCard2.parts";
import { CollaborationCard2Props } from "./lib/types";

export default function CollaborationCard2({ type, children }: CollaborationCard2Props) {
  return (
    <CollaborationCard2Provider type={type}>
      <CollaborationCard2Container type={type}>
        {children}
      </CollaborationCard2Container>
    </CollaborationCard2Provider>
  );
} 