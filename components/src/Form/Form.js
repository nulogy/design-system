import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { SectionTitle } from "../Type/Headings";
import FormSection from "./FormSection";
import Field from "../Field/Field";
import HeaderValidation from "../Validation/HeaderValidation";

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

const Form = styled(BaseForm)`
  ${SectionTitle} {
    margin-bottom: ${props => (props.title ? theme.space[6] : "0")};
  }
  ${HeaderValidation} {
    margin-bottom: ${theme.space[6]};
  }
  ${Field} {
    margin-bottom: ${theme.space[4]};
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${FormSection} {
    margin-bottom: ${theme.space[6]};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

BaseForm.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

BaseForm.defaultProps = {
  children: [],
  title: null,
};

export default Form;
