import styled from "styled-components";
import { addStyledProps, StyledProps } from "../StyledProps";

const Ul = styled.ul<StyledProps>(addStyledProps);
const Li = styled.li<StyledProps>(addStyledProps);

export { Ul, Li };
