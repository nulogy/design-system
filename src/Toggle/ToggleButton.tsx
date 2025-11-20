import React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import styled, { useTheme } from "styled-components";
import { DefaultNDSThemeType } from "../theme";
import { AnimatedBox } from "../Box";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";

interface SwitchProps {
  children?: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
}

interface SliderProps {
  disabled?: boolean;
}

interface ToggleButtonProps extends React.ComponentPropsWithRef<"input"> {
  disabled?: boolean;
  name?: string;
  theme?: DefaultNDSThemeType;
}

interface AnimationConfig {
  transition: Transition;
  scale: string | number;
}

const getSwitchBackground = (checked: boolean) => (checked ? "darkBlue" : "darkGrey");

const animationConfig: AnimationConfig = {
  transition: {
    type: "spring",
    stiffness: 850,
    damping: 37,
    duration: 0.1,
  },
  scale: 1.08,
};

function Switch({ children, disabled, checked }: SwitchProps) {
  const componentVariant = useComponentVariant();

  return (
    <AnimatedBox
      marginTop={componentVariant === "touch" ? "x0_25" : "none"}
      position="relative"
      flexShrink={0}
      height="24px"
      width="48px"
      bg={disabled ? "grey" : getSwitchBackground(checked)}
      borderRadius="20px"
      padding="2px"
      boxShadow="small"
      animate={checked ? "toggled" : "initial"}
      whileHover="active"
      whileFocus="active"
    >
      {children}
    </AnimatedBox>
  );
}

const Slider: React.FC<React.PropsWithChildren<SliderProps>> = ({ disabled, children }) => {
  const theme = useTheme();

  return (
    <motion.div
      className="slider"
      initial={false}
      variants={{
        active: {
          boxShadow: disabled ? undefined : theme.shadows.focus,
          scale: disabled ? undefined : animationConfig.scale,
        },
        toggled: {
          marginLeft: "24px",
        },
        initial: {
          marginLeft: theme.space.none,
        },
      }}
      transition={animationConfig.transition}
      style={{
        height: "20px",
        width: "20px",
        borderRadius: "50%",
        backgroundColor: disabled ? theme.colors.whiteGrey : theme.colors.white,
      }}
    >
      {children}
    </motion.div>
  );
};

const ToggleInput = styled.input<ToggleButtonProps>(({ disabled, theme }) => ({
  width: "1px",
  height: "1px",
  opacity: 0,
  position: "absolute",
  [`&:checked + .slider}`]: {
    backgroundColor: disabled ? theme.colors.grey : theme.colors.darkBlue,
  },
  [`&:focus + .slider`]: {
    transform: disabled ? null : `scale(${animationConfig.scale})`,
    boxShadow: disabled ? undefined : theme.shadows.focus,
  },
}));

const ToggleButton = React.forwardRef<HTMLInputElement, ToggleButtonProps>(({ disabled, checked, ...props }, ref) => {
  return (
    <Switch disabled={disabled} checked={checked}>
      <ToggleInput
        type="checkbox"
        role="switch"
        checked={checked}
        ref={ref}
        value={checked ? "on" : "off"}
        {...props}
      />
      <Slider disabled={disabled} />
    </Switch>
  );
});

export default ToggleButton;
