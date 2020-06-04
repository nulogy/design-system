import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { SubsectionTitle } from "../Type";
import Field from "./Field";
import Fieldset from "./Fieldset";

const FormSectionTitle = styled(SubsectionTitle).attrs({
  as: "legend"
})({});

const BaseFormSection = ({ title, children, ...props }) => (
  <fieldset {...props}>
    {title != null && <FormSectionTitle>{title}</FormSectionTitle>}
    {children}
  </fieldset>
);

const FormSection = styled(BaseFormSection)(({ title, theme }) => ({
  width: "100%",
  padding: 0,
  margin: 0,
  border: "none",
  [`${FormSectionTitle}`]: {
    padding: 0,
    marginBottom: title ? theme.space.x3 : 0
  },
  [`${Field},${Fieldset}`]: {
    marginBottom: theme.space.x3,
    "&:last-child": {
      marginBottom: 0
    }
  }
}));

BaseFormSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

BaseFormSection.defaultProps = {
  children: [],
  title: null
};

export default FormSection;
