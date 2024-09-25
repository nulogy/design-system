import styled from "styled-components";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

export type FieldProps = BoxProps;

const Field = styled(Box)({
  width: "100%",
});

export default Field;
