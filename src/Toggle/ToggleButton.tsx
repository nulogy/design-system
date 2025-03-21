import React, { useRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import styled, { useTheme } from "styled-components";
import { DefaultNDSThemeType } from "../theme";
import { AnimatedBox } from "../Box";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";

type SwitchProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  toggled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

type SliderProps = {
  disabled?: boolean;
};

type ToggleButtonProps = React.ComponentPropsWithRef<"input"> & {
  defaultToggled?: boolean;
  toggled?: boolean;
  disabled?: boolean;
  name?: string;
  theme?: DefaultNDSThemeType;
};

type AnimationConfig = {
  transition: Transition;
  scale: string | number;
};

const getSwitchBackground = (toggled) => (toggled ? "darkBlue" : "darkGrey");

const animationConfig: AnimationConfig = {
  transition: {
    type: "spring",
    stiffness: 850,
    damping: 37,
    duration: 0.1,
  },
  scale: 1.08,
};

function Switch({ children, disabled, toggled, onClick }: SwitchProps) {
  const componentVariant = useComponentVariant();

  return (
    <AnimatedBox
      marginTop={componentVariant === "touch" ? "x0_25" : "none"}
      position="relative"
      flexShrink={0}
      height="24px"
      width="48px"
      bg={disabled ? "grey" : getSwitchBackground(toggled)}
      borderRadius="20px"
      padding="2px"
      boxShadow="small"
      animate={toggled ? "toggled" : "initial"}
      whileHover="active"
      whileFocus="active"
      onClick={onClick}
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

const ToggleButton = React.forwardRef<HTMLInputElement, ToggleButtonProps>((props, ref) => {
  const { disabled, defaultToggled, toggled } = props;
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => inputRef.current);

  const handleClick = () => {
    if (inputRef.current) {
      // triggers the onChange event on a checkbox input
      inputRef.current.click();
    }
  };

  return (
    <Switch disabled={disabled} toggled={toggled} onClick={handleClick}>
      <ToggleInput
        ref={inputRef}
        type="checkbox"
        defaultChecked={defaultToggled}
        value={toggled ? "on" : "off"}
        {...props}
      />
      <Slider disabled={disabled} />
    </Switch>
  );
});

export default ToggleButton;
