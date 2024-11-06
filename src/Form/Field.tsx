import styled from "styled-components";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";
import { addStyledProps } from "../StyledProps";

export type FieldProps = BoxProps;

const Field = styled(Box)(
  {
    width: "100%",
  },
  addStyledProps
);

export default Field;
