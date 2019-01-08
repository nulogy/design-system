
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color, space } from 'styled-system'
import theme from '../theme.js'

const Link = styled.a`
  ${color} ${space}
  text-decoration: ${props => props.underline ? 'underline' : 'none'}}
  &:hover {
    color: ${props => props.theme.colors['darkBlue']}
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
