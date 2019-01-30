import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { SubsectionTitle } from "../Type/Headings";
import Box from "../Box/Box";
import Field from "../Field/Field";

const BaseFormSection = ({
  title,
  children,
  ...props
}) => (
  <Box { ...props }>
    <SubsectionTitle>{ title }</SubsectionTitle>
    { children }
  </Box>
);

const FormSection = styled(BaseFormSection)`
  ${SubsectionTitle} {
    margin-bottom: ${props => (props.title ? theme.space[4] : '0')};
  }
  ${Field} {
    margin-bottom: ${theme.space[4]};
    &:last-child {
      margin-bottom: 0;
    }
  }
`

FormSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

FormSection.defaultProps = {
  children: [],
};

export default FormSection;
