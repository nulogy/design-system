import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import { SectionTitle } from "../Type";
import Field from "./Field";
import { Alert } from "../Alert";
import Fieldset from "./Fieldset";
import FormSection from "./FormSection";
import theme from "../theme";

const BaseForm = ({ title, children, ...props }) => (
  <form {...props}>
    {title && <SectionTitle>{title}</SectionTitle>}
    {children}
  </form>
);

const Form = styled(BaseForm)(space, ({ title }) => ({
  width: "100%",
  [`${SectionTitle}`]: {
    marginBottom: title ? theme.space.x6 : 0
  },
  [`${Alert}`]: {
    marginBottom: theme.space.x6
  },
  [`${Field},${Fieldset}`]: {
    marginBottom: theme.space.x3,
    "&:last-child": {
      marginBottom: 0
    }
  },
  [`${FormSection}`]: {
    marginBottom: theme.space.x6,
    "&:last-child": {
      marginBottom: 0
    }
  }
}));

BaseForm.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  ...space.PropTypes
};

BaseForm.defaultProps = {
  children: [],
  title: null
};

export default Form;
