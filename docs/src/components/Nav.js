import styled from "styled-components";
import theme from "../../../components/src/theme";

const Nav = styled.ul`
  padding-left: ${theme.space.x3}
`;

const NavItem = styled.li`
    margin: 16px;
    list-style: none;  
`;

export { NavItem, Nav };
