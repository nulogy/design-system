import React, { createContext, useContext } from 'react';

const DEFAULT_SIZE = 'medium';

type ComponentSize = 'medium' | 'large';

type ComponentSizeContextValue = {
  size?: ComponentSize;
};

const ComponentSizeContext = createContext<ComponentSizeContextValue>({ size: DEFAULT_SIZE });

function useComponentSize(selectedSize?: ComponentSize) {
  const context = useContext(ComponentSizeContext);
  if (!context) {
    throw new Error(`useComponentSize must be used within the NDSProvider`);
  }

  return selectedSize ?? context.size;
}

interface ComponentSizeContextProviderProps extends ComponentSizeContextValue {
  children?: React.ReactNode;
}

const ComponentSizeContextProvider = ({ size, children }: ComponentSizeContextProviderProps) => {
  return <ComponentSizeContext.Provider value={{ size }}>{children}</ComponentSizeContext.Provider>;
};

export { ComponentSizeContextProvider, useComponentSize, type ComponentSize };
