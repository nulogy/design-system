
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color, space } from 'styled-system'
import theme from '../theme.js'
import { darken } from 'polished'

const Link = styled.a`
  ${color} ${space}
  text-decoration: ${props => props.underline ? 'underline' : 'none'}}
  &:hover {
    color: ${props => props.hover ? props => props.hover : theme.colors.darkBlue}
  }
`;

Link.propTypes = {
  underline: PropTypes.bool,
  ...color.propTypes,
}

Link.defaultProps = {
  underline: true,
  color: 'blue',
  theme: theme
}

export default Link;