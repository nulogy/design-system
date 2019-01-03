import styled from 'styled-components'
import Button from './Button'
import theme from '../theme'

const PrimaryButton = styled(Button)`
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.blue};
    background-color: ${props => props.theme.colors.blue};

  &:hover {
    background-color: ${props =>
      props.disabled ? null : props.theme.colors.darkBlue};
  }
`

PrimaryButton.defaultProps = {
  theme: theme
}

export default PrimaryButton