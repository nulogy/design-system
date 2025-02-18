import React, { PropsWithChildren } from "react";
import { DescriptionListPartsProps } from "./DescriptionList.parts";

const DescriptionListContext = React.createContext<DescriptionListPartsProps>({});

export const useDescriptionListContext = () => React.useContext(DescriptionListContext);

export function DescriptionListProvider({ children, ...config }: PropsWithChildren<DescriptionListPartsProps>) {
  return <DescriptionListContext.Provider value={{ ...config }}>{children}</DescriptionListContext.Provider>;
}
