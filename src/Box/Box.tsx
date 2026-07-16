import isPropValid from "@emotion/is-prop-valid";
import { isValidMotionProp, type MotionProps, motion } from "framer-motion";
import type { ComponentPropsWithRef } from "react";
import { styled } from "styled-components";
import { addStyledProps, type StyledProps } from "../StyledProps";

export interface BoxProps extends StyledProps, ComponentPropsWithRef<"div"> {
  as?: React.ElementType;
}

const Box = styled.div<BoxProps>(addStyledProps);

export interface AnimatedBoxProps
  extends MotionProps,
    Omit<BoxProps, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "style" | "transition" | "children"> {}

// `styled(motion.div)` has a component (non-string) target, so NDSProvider's
// global `shouldForwardProp` — which only filters string/DOM targets — forwards
// every prop and leaks styled-system props (mt, borderRadius, boxShadow, …) onto
// the DOM. Filter here instead: keep framer-motion props and valid DOM
// attributes, drop the rest (matching plain `Box`'s behaviour).
export const AnimatedBox = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => isValidMotionProp(prop) || isPropValid(prop),
})<AnimatedBoxProps>(addStyledProps);

export default Box;
