import React, { useRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import { AnimatedBox, theme } from "..";
import type { TransformProperties } from "framer-motion/types/motion/types";

type SwitchProps = {
  disabled?: boolean;
  toggled?: boolean;
  onClick?: (event: React.MouseEvent<any>) => void;
};

const getSwitchBackground = (toggled) => (toggled ? "darkBlue" : "darkGrey");

type AnimationConfig = {
  transition: Transition;
  scale: TransformProperties["scale"];
};

const animationConfig: AnimationConfig = {
  transition: {
    type: "spring",
    stiffness: 850,
    damping: 37,
    duration: 0.1,
  },
  scale: 1.08,
};

const Switch: React.FC<SwitchProps> = ({
  children,
  disabled,
  toggled,
  onClick,
}) => (
  <AnimatedBox
    display="flex"
    alignItems="center"
    justifyContent={toggled ? "flex-end" : "flex-start"}
    height="24px"
    width="48px"
    bg={disabled ? "grey" : getSwitchBackground(toggled)}
    borderRadius="20px"
    padding="2px"
    boxShadow="small"
    whileHover="hover"
    onClick={onClick}
  >
    {children}
  </AnimatedBox>
);

type SliderProps = {
  disabled?: boolean;
};

const Slider: React.FC<SliderProps> = ({ disabled, children }) => (
  <motion.div
    className="slider"
    layout
    variants={{
      hover: {
        boxShadow: disabled ? null : theme.shadows.focus,
        scale: disabled ? null : animationConfig.scale,
      },
    }}
    transition={animationConfig.transition}
    whileFocus={{
      boxShadow: disabled ? null : theme.shadows.focus,
      scale: disabled ? null : animationConfig.scale,
    }}
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

type ToggleButtonProps = React.ComponentPropsWithRef<"input"> & {
  defaultToggled?: boolean;
  toggled?: boolean;
  disabled?: boolean;
  name?: string;
  theme?: DefaultNDSThemeType;
};

type ToggleInputProps = React.ComponentPropsWithRef<"input"> & {
  disabled?: boolean;
  name?: string;
  theme?: DefaultNDSThemeType;
};

const ToggleInput = styled.input(
  ({ disabled, theme }: ToggleInputProps): CSSObject => ({
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
  })
);

const ToggleButton: React.FC<ToggleButtonProps> = React.forwardRef(
  (props, ref) => {
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
  }
);

ToggleButton.defaultProps = {
  defaultToggled: undefined,
  disabled: false,
};

export default ToggleButton;
