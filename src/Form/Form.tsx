import * as React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import type { SpaceProps } from "styled-system";
import { Heading2 } from "../Type";
import { Alert } from "../Alert";
import type { ThemeType } from "../theme.type";
import Field from "./Field";
import Fieldset from "./Fieldset";
import FormSection from "./FormSection";

interface FormProps extends SpaceProps, React.HTMLProps<HTMLFormElement> {}

interface FormStylesProps {
  title?: FormProps["title"];
  theme: ThemeType;
}

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
