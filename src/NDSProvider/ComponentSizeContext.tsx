import React, { createContext, useContext } from "react";

export type ComponentSize = "medium" | "large";

type ComponentSizeContextValue = {
  size: ComponentSize;
};

export const ComponentSizeContext = createContext<ComponentSizeContextValue>(undefined);

export function useComponentSize(selectedSize?: ComponentSize) {
  const context = useContext(ComponentSizeContext);
  if (!context) {
    throw new Error(`useComponentSize must be used within the NDSProvider`);
  }

  return selectedSize ?? context.size;
}

const ComponentSizeContextProvider: React.FC<ComponentSizeContextValue> = ({ size, children }) => {
  return <ComponentSizeContext.Provider value={{ size }}>{children}</ComponentSizeContext.Provider>;
};

export default ComponentSizeContextProvider;
