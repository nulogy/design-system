import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { SectionTitle } from "../Type/Headings";
import FormSection from "./FormSection";
import Field from "../Field/Field";

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

Form.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

Form.defaultProps = {
  children: [],
};

export default Form;
