import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { motion, MotionProps } from "framer-motion";
import { addStyledProps, StyledProps } from "../StyledProps";

export interface BoxProps extends StyledProps, ComponentPropsWithRef<"div"> {
  as?: React.ElementType;
}

const Box = styled.div<BoxProps>(addStyledProps);

export interface AnimatedBoxProps
  extends MotionProps,
    Omit<BoxProps, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "style" | "transition"> {}

export const AnimatedBox = styled(motion.div)<AnimatedBoxProps>(addStyledProps);

export default Box;
