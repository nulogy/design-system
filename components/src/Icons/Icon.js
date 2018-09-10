import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { 
  Edit as edit,
} from 'rmdi';


const Wrapper = styled.span`
  border: .15em dashed red;
  display: block;
  width: 2em;
  height: 2em;
  border-radius: 2em;
  background-color: pink;
  text-align: center;
  line-height: 2em;
`;

const Icons = {
  edit
}

const iconNames = Object.keys(Icons);

const Icon = ({ name }) => {
  const IconSvg = Icons[name];
  return (
    <Wrapper>
      <IconSvg />
    </Wrapper>
  );
};

Icon.propTypes = {
  name: PropTypes.oneOf(iconNames).isRequired
}

Icon.defaultProps = {}

export default Icon;
