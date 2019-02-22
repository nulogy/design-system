import styled from "styled-components";

const CheckList = styled.li`
    list-style: none;
    margin-left: ${props => props.theme.space.x2};
    vertical-align: middle;
    &:not(:last-child) {margin-bottom: ${props => props.theme.space[0]};}
    &:before {
        content: '✔️';
        margin-right: ${props => props.theme.space[1]};
        float: left;
        clear: both;
        position: relative;
        top: -0px;
    }
`;

export default CheckList;
