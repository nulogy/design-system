import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { space } from "styled-system";
import { Field } from "../Form";
import { Flex } from "../Flex";
import { MaybeFieldLabel } from "../FieldLabel";
import { Prefix, Suffix } from "../Input";
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
      boxShadow: theme.shadows.focus
    },
    "::placeholder": {
      color: transparentize(0.4, theme.colors.black)
    }
  },
  space,
  props => getInputStyle(props)
);

const Input = ({
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
}) => (
  <Field className={className}>
    <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
      <Flex alignItems="flex-start">
        <Prefix prefix={prefix} prefixWidth={prefixWidth} textAlign={prefixAlignment} />
        <StyledInput
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
  prefixAlignment: "left"
};

export default Input;
