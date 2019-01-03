
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color } from 'styled-system'
import theme from '../theme.js'

const Link = styled.a`
  ${color}

  ${ ({ underline }) => css`
    text-decoration: ${underline ? 'underline' : 'none' };
  `}

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
