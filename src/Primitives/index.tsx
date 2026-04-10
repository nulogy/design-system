import { styled } from "styled-components";
import { addStyledProps, type StyledProps } from "../StyledProps";

const Ul = styled.ul<StyledProps>(addStyledProps);
const Li = styled.li<StyledProps>(addStyledProps);

export { Li, Ul };
