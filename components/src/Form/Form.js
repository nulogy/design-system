import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import {
  SectionTitle,
  FormSection,
  Field,
  HeaderValidation,
  Box,
  Flex,
} from "ComponentsRoot";
import theme from "../theme";

const childIsWrappedByField = childType => {
  switch (childType) {
    case FormSection:
    case HeaderValidation:
    case Box:
    case Flex:
      return false;
    default:
      return true;
  }
}

const BaseForm = ({
  title,
  children,
  ...props
}) => (
  <form { ...props }>
    <SectionTitle>{ title }</SectionTitle>
    { children.map( child => {
      if (childIsWrappedByField(child.type)) {
        return(
          <Field style={{border: "solid 2px red"}}>
            {React.cloneElement(child)}
          </Field>
          )
      } else {
        return(
          React.cloneElement(child)
        )
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
