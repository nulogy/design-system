import React from "react";
import { useTheme } from "styled-components";
import styled from "styled-components";
import { Box, BoxProps } from "../Box";

const RightAngleTriangle = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
`;

export default function BackgroundTriangles(props: BoxProps) {
  const theme = useTheme();

  return (
    <Box
      transition="max-width 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955)"
      position="absolute"
      bottom={0}
      right={0}
      height="100%"
      maxWidth={{ extraSmall: "320px", small: "768px", medium: "1024px", large: "1280px" }}
      width="90%"
      {...props}
    >
      <RightAngleTriangle
        height="44.85%"
        opacity="0.5"
        background="linear-gradient(178.25deg, rgba(192, 200, 209, 0.5) 62.98%, rgba(225, 235, 250, 0.25) 98.52%)"
      />
      <RightAngleTriangle
        height="19.85%"
        opacity="0.25"
        background={`linear-gradient(196.88deg, ${theme.colors.grey} 11.92%, rgba(0, 67, 143, 0) 88.36%)`}
      />
    </Box>
  );
}
