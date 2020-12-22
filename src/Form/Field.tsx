import styled from "styled-components";
import { Box } from "../Box";
import { BoxProps } from '../Box/Box';

export type FieldProps = BoxProps & {
  fitContent?: boolean;
};

const Field = styled(Box)(({ fitContent }: FieldProps) => ({
  width: !fitContent ? "100%" : "auto",
}));
export default Field;
