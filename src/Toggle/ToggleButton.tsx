import React, { FunctionComponent, useRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import { AnimatedBox, Box, theme } from "..";

type SwitchProps = {
  disabled?: boolean;
  toggled?: boolean;
  onClick?: (event: React.MouseEvent<any>) => void;
};

const getSwitchBackground = (toggled) => (toggled ? "darkBlue" : "darkGrey");

const Switch: FunctionComponent<SwitchProps> = ({
  children,
  disabled,
  toggled,
  onClick,
}) => (
  <AnimatedBox
    display="flex"
    justifyContent={toggled ? "flex-end" : "flex-start"}
    height="26px"
    width="50px"
    bg={disabled ? "grey" : getSwitchBackground(toggled)}
    borderRadius="12px"
    padding="2px"
    boxShadow="small"
    onClick={onClick}
  >
    {children}
  </AnimatedBox>
);

type SliderProps = {
  disabled?: boolean;
};


const Slider: FunctionComponent<SliderProps> = ({ disabled, children }) => (
  <motion.div
    className="slider"
    layout
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 30,
    }}
    whileHover={{
      boxShadow: disabled ? null : theme.shadows.focus,
      scale: disabled ? null : 1.1,
    }}
    whileTap={{
      boxShadow: disabled ? null : theme.shadows.focus,
      scale: disabled ? null : 1.1,
    }}
    style={{
      height: "22px",
      width: "22px",
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
      transform: disabled ? null : "scale(1.1)",
      boxShadow: disabled ? undefined : theme.shadows.focus,
    },
  })
);

const ToggleButton: React.SFC<ToggleButtonProps> = React.forwardRef(
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
