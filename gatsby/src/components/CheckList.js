import styled from 'styled-components';

const CheckList = styled.li`
    list-style: none;
    margin-left: ${props => props.theme.space[2]};
    &:not(:last-child) {margin-bottom: ${props => props.theme.space[2]};}
    vertical-align: middle;
    &:before {
        content: '✔️';
        margin-right: ${props => props.theme.space[0]};
        float: left;
        clear: both;
        position: relative; 
        top: -2px;
    }
` 

export default CheckList;

    