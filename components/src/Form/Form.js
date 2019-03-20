import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import {
  SectionTitle,
  Field,
  HeaderValidation,
  Box,
  Flex,
} from "ComponentsRoot";
import FormSection from "./FormSection";
import theme from "../theme";

const doNotWrapElements = [
  FormSection,
  HeaderValidation,
  Box,
  Flex,
];

const childIsWrappedByField = childType => !doNotWrapElements.includes(childType);

const BaseForm = ({
  title,
  children,
  ...props
}) => (
  <form { ...props }>
    <SectionTitle>{ title }</SectionTitle>
    { children.map((child, index) => {
      if (childIsWrappedByField(child.type)) {
        return (
          <Field key={ index }>
            {React.cloneElement(child)}
          </Field>
        );
      } else {
        return (
          React.cloneElement(child, {
            key: index,
          })
        );
      }
    })}
  </form>
);

const Form = styled(BaseForm)(
  space,
  ({ title }) => ({
    [`${SectionTitle}`]: {
      marginBottom: title ? theme.space.x6 : 0,
    },
    [`${HeaderValidation}`]: {
      marginBottom: theme.space.x6,
    },
    [`${Field}`]: {
      marginBottom: theme.space.x3,
      "&:last-child": {
        marginBottom: 0,
      },
    },
    [`${FormSection}`]: {
      marginBottom: theme.space.x6,
      "&:last-child": {
        marginBottom: 0,
      },
    },
  })
);

BaseForm.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  ...space.PropTypes,
};

BaseForm.defaultProps = {
  children: [],
  title: null,
};

export default Form;
