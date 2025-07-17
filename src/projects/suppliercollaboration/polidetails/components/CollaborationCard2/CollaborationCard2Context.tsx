import React, { createContext, PropsWithChildren, useContext } from "react";
import { CollaborationCard2ContextProps } from "./lib/types";

const CollaborationCard2Context = createContext<CollaborationCard2ContextProps | undefined>(undefined);

export const CollaborationCard2Provider = ({
  children,
  ...contextProps
}: PropsWithChildren<CollaborationCard2ContextProps>) => (
  <CollaborationCard2Context.Provider value={contextProps}>{children}</CollaborationCard2Context.Provider>
);

export const useCollaborationCard2Context = () => {
  const context = useContext(CollaborationCard2Context);
  if (!context) {
    throw new Error("useCollaborationCard2Context must be used within a CollaborationCard2Provider");
  }
  return context;
}; 