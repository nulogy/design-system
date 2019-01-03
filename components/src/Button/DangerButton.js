import styled from 'styled-components'
import Button from './Button'
import theme from '../theme'

const DangerButton = styled(Button)`
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.red};
    background-color: ${props => props.theme.colors.red};

  &:hover {
    background-color: ${props =>
      props.disabled ? null : props.theme.colors.red};
  }
`

DangerButton.defaultProps = {
  theme: theme
}

export default DangerButton