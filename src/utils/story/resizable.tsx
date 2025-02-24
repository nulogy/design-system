import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Resizable as ReResizable } from "re-resizable";
import styled from "styled-components";
import { Box } from "../../Box";
import { DashedBox } from "../../DescriptionList/stories/fixtures";
import { Text } from "../../Type";

const CONTAINER_BORDER_WIDTH = 2 * 2; // 2px * 2 sides (left and right)

interface ResizableProps {
  children: React.ReactNode;
  containerWidth?: string;
  onResize?: (width: number) => void;
  showContainerOutline?: boolean;
}

export const Resizable = ({
  children,
  containerWidth = "100%",
  onResize,
  showContainerOutline = false,
}: ResizableProps) => {
  const [width, setWidth] = useState(containerWidth);
  const [showWidth, setShowWidth] = useState(false);

  const WidthIndicator = (
    <AnimatePresence>
      {showWidth && (
        <WidthText
          fontSize="sm"
          color="midGrey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {width}
        </WidthText>
      )}
    </AnimatePresence>
  );

  return (
    <ReResizable
      enable={{ right: true }}
      size={{ width: width }}
      handleComponent={{ right: <ResizeHandle /> }}
      onResizeStart={() => setShowWidth(true)}
      onResizeStop={() => setShowWidth(false)}
      onResize={(_, __, ref) => {
        const width = Math.round(ref.getBoundingClientRect().width);
        setWidth(`${width - (showContainerOutline ? CONTAINER_BORDER_WIDTH : 0)}px`);
        onResize?.(width - (showContainerOutline ? CONTAINER_BORDER_WIDTH : 0));
      }}
    >
      {showContainerOutline ? (
        <DashedBox>
          {children}
          {WidthIndicator}
        </DashedBox>
      ) : (
        <Box>
          {children}
          {WidthIndicator}
        </Box>
      )}
    </ReResizable>
  );
};

export const WidthText = styled(motion(Text))`
  position: absolute;
  right: 0;
  transform: translateX(50%);
  bottom: -${(props) => props.theme.space.x3};
`;

export const ResizeHandle = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 4rem;
  width: 4px;
  right: 4px;
  border-radius: ${({ theme }) => theme.radii.rounded};
  background-color: ${({ theme }) => theme.colors.grey};
`;
