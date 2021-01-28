import React, { forwardRef } from "react";
import { space } from "styled-system";
import styled, { CSSObject } from "styled-components";
import propTypes from "@styled-system/prop-types";
import { Box } from "../Box";
import { Text } from "../Type";
import { ClickInputLabel } from "../utils";
import { DefaultNDSThemeType } from "../theme.type";
import { getSubset, omitSubset } from "../utils/subset";
const radioStyle = (theme) => ({
  checked: {
    disabled: {
      borderColor: theme.colors.lightGrey,
      backgroundColor: theme.colors.lightGrey,
    },
    error: {
      borderColor: theme.colors.red,
      backgroundColor: theme.colors.red,
    },
    default: {
      borderColor: theme.colors.darkBlue,
      backgroundColor: theme.colors.darkBlue,
    },
  },
  unchecked: {
    disabled: {
      borderColor: theme.colors.lightGrey,
      backgroundColor: theme.colors.whiteGrey,
    },
    error: {
      borderColor: theme.colors.red,
      backgroundColor: theme.colors.white,
    },
    default: {
      borderColor: theme.colors.grey,
      backgroundColor: theme.colors.white,
    },
  },
});
const getRadioStyle = (props, checked) => {
  const radioStyleMap = radioStyle(props.theme);
  if (props.disabled) {
    return radioStyleMap[checked].disabled;
  }
  if (props.error) {
    return radioStyleMap[checked].error;
  }
  return radioStyleMap[checked].default;
};

type VisualRadioProps = {
  disabled?: boolean;
  theme?: DefaultNDSThemeType;
};

const VisualRadio: React.SFC<VisualRadioProps> = styled.div(
  ({ disabled, theme }: VisualRadioProps): CSSObject => ({
    minWidth: theme.space.x2,
    height: theme.space.x2,
    marginRight: theme.space.x1,
    borderRadius: theme.radii.circle,
    border: "solid 1px",
    position: "relative",
    top: theme.space.half,
    "&:before": {
      cursor: disabled ? undefined : "pointer",
      content: "''",
      display: "none",
      position: "relative",
      left: "4px",
      top: "4px",
      width: "2px",
      height: "2px",
      background: theme.colors.white,
      border: `2px solid ${theme.colors.white}`,
      borderRadius: theme.radii.circle,
    },
  })
);
const RadioInput = styled.input((props) => ({
  position: "absolute",
  opacity: "0",
  height: "1px",
  width: "1px",
  [`&:focus + ${VisualRadio}`]: {
    boxShadow: props.theme.shadows.focus,
  },
  [`&:checked + ${VisualRadio}`]: {
    ...getRadioStyle(props, "checked"),
    "&:before": {
      display: "block",
    },
  },
  [`&:not(:checked) + ${VisualRadio}`]: {
    ...getRadioStyle(props, "unchecked"),
  },
}));

type BaseRadioProps = VisualRadioProps &
  React.ComponentPropsWithRef<"input"> & {
    labelText?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    className?: string;
    required?: boolean;
    value?: any;
  };

const BaseRadio: React.SFC<BaseRadioProps> = forwardRef(({
  className,
  labelText,
  disabled,
  checked,
  required,
  error,
  ...props
}, ref) => {
  const spaceProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);
  return (
    <Box className={className} {...spaceProps}>
      <ClickInputLabel disabled={disabled}>
        <RadioInput
          type="radio"
          ref={ref}
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          error={error}
          {...restProps}
          required={required}
          aria-required={required}
          aria-invalid={error}
        />
        <VisualRadio disabled={disabled} />
        <Text inline disabled={disabled}>
          {" "}
          {labelText}{" "}
        </Text>
      </ClickInputLabel>
    </Box>
  );
});
BaseRadio.defaultProps = {
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  error: false,
  id: undefined,
  className: undefined,
  required: false,
};
const Radio = styled(BaseRadio)(
  ({ theme }) => ({
    padding: `${theme.space.half} 0`,
  }),
  space
);
export default Radio;
