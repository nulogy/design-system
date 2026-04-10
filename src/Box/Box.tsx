import { type MotionProps, motion } from "framer-motion";
import type { ComponentPropsWithRef } from "react";
import { styled } from "styled-components";
import { addStyledProps, type StyledProps } from "../StyledProps";

export interface BoxProps extends StyledProps, ComponentPropsWithRef<"div"> {
	as?: React.ElementType;
}

const Box = styled.div<BoxProps>(addStyledProps);

export interface AnimatedBoxProps
	extends MotionProps,
		Omit<
			BoxProps,
			| "onAnimationStart"
			| "onDrag"
			| "onDragStart"
			| "onDragEnd"
			| "style"
			| "transition"
			| "children"
		> {}

export const AnimatedBox = styled(motion.div)<AnimatedBoxProps>(addStyledProps);

export default Box;
