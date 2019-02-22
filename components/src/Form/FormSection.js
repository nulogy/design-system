import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { SubsectionTitle, Field } from "ComponentsRoot";

const FormSectionTitle = styled(SubsectionTitle).attrs({
  as: "legend",
})({});

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

const FormSection = styled(BaseFormSection)(({ title }) => ({
  padding: 0,
  margin: 0,
  border: "none",
  [`${FormSectionTitle}`]: {
    padding: 0,
    marginBottom: title ? theme.space[4] : 0,
  },
  [`${Field}`]: {
    marginBottom: theme.space[4],
    "&:last-child": {
      marginBottom: 0,
    },
  },
}));

BaseFormSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

BaseFormSection.defaultProps = {
  children: [],
  title: null,
};

export default FormSection;
