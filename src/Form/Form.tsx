import React from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { Heading2 } from "../Type";
import { Box } from "../Box";
import { Alert } from "../Alert";
import Field from "./Field";
import Fieldset from "./Fieldset";
import FormSection from "./FormSection";

type BaseFormProps = React.ComponentPropsWithRef<"form"> &
  SpaceProps & {
    title?: string;
  };
const BaseForm: React.SFC<BaseFormProps> = ({ title, children, ...props }) => (
  <Box as="form" {...props}>
    {title && <Heading2>{title}</Heading2>}
    {children}
  </Box>
);
const Form = styled(BaseForm)(space, ({ title, theme }) => ({
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
}));

BaseForm.defaultProps = {
  children: [],
  title: undefined,
};
export default Form;
