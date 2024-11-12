import React from "react";
import { createContext, useContext } from "react";

interface BottomSheetContextType {
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

function useBottomSheet() {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
}

function BottomSheetProvider({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return <BottomSheetContext.Provider value={{ isOpen, onClose }}>{children}</BottomSheetContext.Provider>;
}

export { BottomSheetProvider, useBottomSheet };
