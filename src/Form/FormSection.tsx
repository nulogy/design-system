import React from "react";
import styled from "styled-components";
import { Heading3 } from "../Type";
import Field from "./Field";
import Fieldset from "./Fieldset";

interface BaseFormSectionProps extends React.ComponentPropsWithRef<"fieldset"> {
  title?: string;
}

const BaseFormSection = ({ title, children, ...props }: BaseFormSectionProps) => (
  <fieldset {...props}>
    {title != null && <FormSectionTitle>{title}</FormSectionTitle>}
    {children}
  </fieldset>
);

const FormSectionTitle = styled(Heading3).attrs({
  as: "legend",
})({});

const FormSection = styled(BaseFormSection)(({ title, theme }) => ({
  width: "100%",
  padding: 0,
  margin: 0,
  border: "none",
  [`${FormSectionTitle}`]: {
    padding: 0,
    marginBottom: title ? theme.space.x3 : 0,
  },
  [`${Field},${Fieldset}`]: {
    marginBottom: theme.space.x3,
    "&:last-child": {
      marginBottom: 0,
    },
  },
}));

export default FormSection;
