import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { SubsectionTitle } from "../Type/Headings";
import Field from "../Field/Field";

const FormSectionTitle = SubsectionTitle.withComponent("legend");

const BaseFormSection = ({
  title,
  children,
  ...props
}) => (
  <fieldset { ...props }>
    { (title != null)
        && (
          <FormSectionTitle>{ title }</FormSectionTitle>
        )
      }
    { children }
  </fieldset>
);

const FormSection = styled(BaseFormSection)`
  padding: 0;
  margin: 0;
  border: none;
  ${FormSectionTitle} {
    padding:0;
    margin-bottom: ${props => (props.title ? theme.space[4] : "0")};
  }
  ${Field} {
    margin-bottom: ${theme.space[4]};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

FormSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

FormSection.defaultProps = {
  children: [],
};

export default FormSection;
