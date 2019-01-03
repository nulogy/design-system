import styled from 'styled-components';
import {Sketch} from 'styled-icons/fa-brands/Sketch'

const CheckList = styled.li`
    list-style: none;
    &:before {
        content: url();
        margin-right: 16px;
    }
`  

export default CheckList;

    