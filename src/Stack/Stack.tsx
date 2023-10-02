import React, { CSSProperties, ReactNode } from "react";
import { Box, Divider } from "../index";
import { Flex } from "../Flex";

type StackRef = HTMLDivElement;

type Alignment = "left" | "center" | "right";

const flexAlignment: Record<Alignment, CSSProperties["alignItems"]> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

type StackProps = {
  children?: React.ReactNode;
  alignment?: Alignment;
  space?: CSSProperties["gap"];
  showDivider?: boolean;
  renderDivider?: () => ReactNode;
};

export const Stack = React.forwardRef<StackRef, StackProps>(
  ({ children, showDivider, renderDivider = () => <Divider width="100%" />, space, alignment }, ref) => (
    <Flex gap={space} flexDirection="column" alignItems={flexAlignment[alignment]} ref={ref}>
      {showDivider
        ? React.Children.map(children, (child, index) => {
            if (index > 0) {
              return (
                <>
                  {renderDivider(index)}
                  {child}
                </>
              );
            }

            return child;
          })
        : children}
    </Flex>
  )
);

export default Stack;
