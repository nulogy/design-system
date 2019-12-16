import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { space } from "styled-system";
import { Field } from "../Form";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Box } from "../Box";
import { MaybeFieldLabel } from "../FieldLabel";
import Prefix from "./Prefix";
import Suffix from "./Suffix";
import { InlineValidation } from "../Validation";
import theme from "../theme";
import { subPx } from "../utils";

const inputStyles = {
  disabled: {
    color: transparentize(0.6667, theme.colors.black),
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.whiteGrey
  },
  error: {
    color: theme.colors.red,
    borderColor: theme.colors.red
  },
  default: {
    color: theme.colors.black,
    borderColor: theme.colors.grey
  }
};

const getInputStyle = props => {
  if (props.disabled) {
    return inputStyles.disabled;
  }
  if (props.error) {
    return inputStyles.error;
  }
  return inputStyles.default;
};

const StyledInput = styled.input(
  {
    display: "block",
    flexGrow: "1",
    border: "1px solid",
    borderRadius: theme.radii.medium,
    padding: subPx(theme.space.x1),
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.base,
    lineHeight: theme.lineHeights.base,
    margin: theme.space.none,
    minHeight: theme.space.x5,
    "&:focus": {
      outline: "none",
      color: theme.colors.black,
      borderColor: theme.colors.blue,
      boxShadow: theme.shadows.focus,
      " ~ svg": {
        fill: theme.colors.darkBlue
      }
    },
    "::placeholder": {
      color: transparentize(0.4, theme.colors.black)
    }
  },
  space,
  props => getInputStyle(props)
);

const StyledInputIcon = styled(Icon)({
  position: "absolute",
  right: theme.space.x1,
  color: theme.colors.darkGrey,
  bottom: "50%",
  transform: "translateY(50%)",
  pointerEvents: "none"
});

const InputField = ({ icon, ...props }) => (
  <Box position="relative">
    <StyledInput {...props} />
    {icon && <StyledInputIcon icon={icon} size={theme.space.x2} />}
  </Box>
);

InputField.propTypes = {
  icon: PropTypes.string
};
InputField.defaultProps = {
  icon: undefined
};

const Input = forwardRef(
  (
    {
      errorMessage,
      errorList,
      error = !!(errorMessage || errorList),
      required,
      labelText,
      requirementText,
      helpText,
      suffix,
      prefix,
      suffixWidth,
      prefixWidth,
      suffixAlignment,
      prefixAlignment,
      className,
      ...props
    },
    ref
  ) => (
    <Field className={className} ref={ref}>
      <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
        <Flex alignItems="flex-start">
          <Prefix prefix={prefix} prefixWidth={prefixWidth} textAlign={prefixAlignment} />
          <InputField
            aria-invalid={error}
            aria-required={required}
            required={required}
            errorMessage={errorMessage}
            errorList={errorList}
            error={error}
            {...props}
          />
          <Suffix suffix={suffix} suffixWidth={suffixWidth} textAlign={suffixAlignment} />
        </Flex>
      </MaybeFieldLabel>
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </Field>
  )
);

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
  labelText: PropTypes.string,
  helpText: PropTypes.node,
  requirementText: PropTypes.string,
  suffix: PropTypes.string,
  suffixWidth: PropTypes.string,
  suffixAlignment: PropTypes.oneOf(["left", "center", "right"]),
  prefix: PropTypes.string,
  prefixWidth: PropTypes.string,
  prefixAlignment: PropTypes.oneOf(["left", "center", "right"]),
  icon: PropTypes.string,
  ...space.PropTypes
};

Input.defaultProps = {
  className: undefined,
  disabled: false,
  errorMessage: null,
  errorList: null,
  required: false,
  labelText: null,
  helpText: null,
  requirementText: null,
  suffix: null,
  suffixWidth: null,
  suffixAlignment: "left",
  prefix: null,
  prefixWidth: null,
  prefixAlignment: "left",
  icon: undefined
};

export default Input;
