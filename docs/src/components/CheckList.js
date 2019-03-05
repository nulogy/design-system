import styled from "styled-components";
import theme from "../../../components/src/theme";

const CheckList = styled.li`
    list-style: none;
    margin-left: ${theme.space.x2};
    vertical-align: middle;
    &:not(:last-child) {margin-bottom: ${theme.space.none};}
    &:before {
        content: '✔️';
        margin-right: ${theme.space.half};
        float: left;
        clear: both;
        position: relative;
        top: -0px;
    }
`;

export default CheckList;
