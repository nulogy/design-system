import styled from 'styled-components'
import Button from './Button'
import theme from '../theme'
import { darken } from 'polished'

const DangerButton = styled(Button)`
    color: ${theme.colors.white};
    border-color: ${theme.colors.red};
    background-color: ${theme.colors.red};

  &:hover {
    background-color: ${props => props.disabled ? null : darken(0.1, theme.colors.red)};
    border-color: ${props => props.disabled ? null : darken(0.1, theme.colors.red)};
  }
`

DangerButton.defaultProps = {
  theme: theme
}

export default DangerButton