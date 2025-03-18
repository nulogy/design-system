import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import TooltipContent from "./TooltipContent";

type MaybeTooltipProps = React.ComponentProps<typeof RadixTooltip.Root> & {
  tooltip: React.ReactNode;
  showTooltip?: boolean;
};

const MaybeTooltip = ({ children, tooltip, showTooltip = true, ...rest }: MaybeTooltipProps) => {
  if (!showTooltip) {
    return <>{children}</>;
  }
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root {...rest}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <TooltipContent>{tooltip}</TooltipContent>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default MaybeTooltip;
