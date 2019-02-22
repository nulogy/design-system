import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import {
  SectionTitle,
  FormSection,
  Field,
  HeaderValidation,
} from "ComponentsRoot";
import theme from "../theme";

const BaseForm = ({
  title,
  children,
  ...props
}) => (
  <form { ...props }>
    <SectionTitle>{ title }</SectionTitle>
    { children }
  </form>
);

const Form = styled(BaseForm)(
  space,
  ({ title }) => ({
    [`${SectionTitle}`]: {
      marginBottom: title ? theme.space[6] : 0,
    },
    [`${HeaderValidation}`]: {
      marginBottom: theme.space[6],
    },
    [`${Field}`]: {
      marginBottom: theme.space[4],
      "&:last-child": {
        marginBottom: 0,
      },
    },
    [`${FormSection}`]: {
      marginBottom: theme.space[6],
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
