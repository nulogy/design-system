import React, { useRef, useImperativeHandle } from "react";
import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
type SliderProps = React.ComponentPropsWithRef<"span"> & {
  disabled?: boolean;
  theme?: DefaultNDSThemeType;
};
const Slider = styled.span(
  ({ disabled, theme }: SliderProps): CSSObject => ({
    position: "absolute",
    height: theme.space.x3,
    width: theme.space.x6,
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    backgroundColor: disabled ? theme.colors.grey : theme.colors.darkGrey,
    borderRadius: "12px",
    transition: ".2s ease",
    cursor: disabled ? undefined : "pointer",
    "&:before": {
      content: "''",
      position: "absolute",
      height: "22px",
      width: "22px",
      left: "1px",
      top: "1px",
      borderRadius: theme.radii.circle,
      boxSizing: "border-box",
      backgroundColor: disabled ? theme.colors.whiteGrey : theme.colors.white,
      transition: ".2s ease",
    },
  })
);
const Switch = styled.div(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  minWidth: theme.space.x6,
  minHeight: theme.space.x3,
  input: {
    opacity: "0",
    width: "1px",
    height: "1px",
  },
}));

type ToggleInputProps = React.ComponentPropsWithRef<"input"> & {
  disabled?: boolean;
  name?: string;
  theme?: DefaultNDSThemeType;
};
const ToggleInput = styled.input(
  ({ disabled, theme }: ToggleInputProps): CSSObject => ({
    [`&:checked + ${Slider}:before`]: {
      transform: "translateX(24px)",
    },
    [`&:checked + ${Slider}`]: {
      backgroundColor: disabled ? theme.colors.grey : theme.colors.darkBlue,
    },
    [`&:focus + ${Slider}:before`]: {
      boxShadow: disabled ? undefined : theme.shadows.focus,
    },
  })
);
type ToggleButtonProps = ToggleInputProps & {
  defaultToggled?: boolean;
  toggled?: boolean;
  disabled?: boolean;
};
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
      <Switch onClick={handleClick}>
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
