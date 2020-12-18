import React, { useState } from "react";
import { motion, useCycle } from "framer-motion";
import styled from "styled-components";
import { Button } from "../Button";
import { Box } from "../index";
import { AnimatedBox } from "./Box";

export default {
  title: "Components/Box",
};

export const _Box = () => <Box p="x3">Hello World</Box>;

export const WithATextColour = () => (
  <Box p="x3" color="blue">
    Hello World
  </Box>
);

WithATextColour.story = {
  name: "With a text colour",
};

export const WithABackgroundColour = () => (
  <Box p="x3" color="white" bg="blue">
    Hello World
  </Box>
);

WithABackgroundColour.story = {
  name: "With a background colour",
};

export const WithASetWidth = () => (
  <Box p="x3" width={1 / 2} bg="whiteGrey">
    Half Width
  </Box>
);

WithASetWidth.story = {
  name: "With a set width",
};

export const WithAResponsiveWidth = () => (
  <Box
    p="x3"
    width={{ extraSmall: 1, small: 1 / 2, medium: 1 / 4 }}
    bg="whiteGrey"
  >
    Full width on extra small screens, 1/2 width on small and 1/4 width on
    medium
  </Box>
);

WithAResponsiveWidth.story = {
  name: "With a responsive width",
};

export const WithPadding = () => (
  <Box p="x2">
    <Box m="x1" p="x3" bg="whiteGrey">
      Padding
    </Box>
    <Box m="x1" p="x3" bg="whiteGrey">
      Padding top
    </Box>
    <Box m="x1" pr="x3" bg="whiteGrey">
      Padding right
    </Box>
    <Box m="x1" pb="x3" bg="whiteGrey">
      Padding bottom
    </Box>
    <Box m="x1" pl="x3" bg="whiteGrey">
      Padding left
    </Box>
    <Box m="x1" px="x3" bg="whiteGrey">
      Padding x
    </Box>
    <Box m="x1" py="x3" bg="whiteGrey">
      Padding y
    </Box>
  </Box>
);

WithPadding.story = {
  name: "With padding",
};

export const WithMargin = () => (
  <Box p="x3">
    <Box m="x3" bg="whiteGrey">
      Margin
    </Box>
    <Box mt="x3" bg="whiteGrey">
      Margin top
    </Box>
    <Box mr="x3" bg="whiteGrey">
      Margin right
    </Box>
    <Box mb="x3" bg="whiteGrey">
      Margin bottom
    </Box>
    <Box ml="x3" bg="whiteGrey">
      Margin left
    </Box>
    <Box mx="x3" bg="whiteGrey">
      Margin x
    </Box>
    <Box my="x3" bg="whiteGrey">
      Margin y
    </Box>
  </Box>
);

WithMargin.story = {
  name: "With margin",
};

export const WithAShadow = () => (
  <>
    <Box p="x1" mb="x2" boxShadow="small">
      Small shadow
    </Box>
    <Box p="x3" mb="x2" boxShadow="medium">
      Medium shadow
    </Box>
    <Box p="x6" mb="x2" boxShadow="large">
      Large shadow
    </Box>
  </>
);

WithAShadow.story = {
  name: "With a shadow",
};

export const WithABackgroundImage = () => (
  <Box p="x1" mb="x2" backgroundImage="linear-gradient(0deg, #E1EBFA, #216BEB)">
    Gradient
  </Box>
);

WithABackgroundImage.story = {
  name: "With a background image",
};
const HoverableBox = styled(Box)({
  ":hover": {
    backgroundColor: "blue",
  },
});

export const WithHoverTransition = () => (
  <HoverableBox
    p="x1"
    mb="x2"
    bg="red"
    marginLeft="50px"
    mt="50px"
    color="white"
    height="40px"
    width="200px"
    transition="background-color 0.5s linear"
  >
    Transition
  </HoverableBox>
);

WithHoverTransition.story = {
  name: "With hover transition",
};
export const WithTransform = () => (
  <Box
    p="x1"
    mb="x2"
    bg="red"
    marginLeft="50px"
    mt="50px"
    color="white"
    height="40px"
    width="200px"
    transform="rotate(90deg)"
  >
    Rotated
  </Box>
);

WithTransform.story = {
  name: "with transform",
};

export const WithAnimation = () => {
  const [isOpen, setIsOpen] = useState(true);
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const handleClick = () => setIsOpen(!isOpen);
  return (
    <>
      <Button onClick={handleClick}>Animate!</Button>
      <AnimatedBox
        p="x1"
        mb="x2"
        bg="red"
        marginLeft="50px"
        mt="50px"
        color="white"
        height="40px"
        width="200px"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 2 }}
      >
        Animated
      </AnimatedBox>
    </>
  );
};

WithAnimation.story = {
  name: "with animation",
};
