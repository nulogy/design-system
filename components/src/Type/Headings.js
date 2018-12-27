import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from './Text';

const Title = Text.withComponent('h1')
Title.defaultProps = {
  fontSize: 4,
  lineHeight: 1.04, 
  fontWeight: 0,
  m: 0
}

const SectionTitle = Text.withComponent('h1')
SectionTitle.defaultProps = {
  fontSize: 3,
  lineHeight: 1.23, 
  m: 0
}

const SubsectionTitle = Text.withComponent('h1')
SubsectionTitle.defaultProps = {
  fontSize: 2,
  lineHeight: 1.33,
  m: 0
}

export { Title, SectionTitle, SubsectionTitle }
