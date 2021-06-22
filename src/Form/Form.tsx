import React from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { Heading2 } from "../Type";
import { Alert } from "../Alert";
import { ThemeType } from "../theme.type";
import Field from "./Field";
import Fieldset from "./Fieldset";
import FormSection from "./FormSection";

type FormProps = SpaceProps & {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

type FormStylesProps = {
  title?: string;
  theme: ThemeType;
};

const FormStyles = ({ title, theme }: FormStylesProps) => ({
  width: "100%",
  [`${Heading2}`]: {
    marginBottom: title ? theme.space.x6 : 0,
  },
  [`${Alert}`]: {
    marginBottom: theme.space.x6,
  },
  [`${Field},${Fieldset}`]: {
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
});

const Form = styled(({ title, children, ...props }: FormProps) => (
  <form {...props}>
    {title && <Heading2>{title}</Heading2>}
    {children}
  </form>
))(space, FormStyles);

export default Form;
