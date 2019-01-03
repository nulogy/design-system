import styled from 'styled-components'
import Button from './Button'
import theme from '../theme'

const QuietButton = styled(Button)`
    color: ${props => props.theme.colors.blue};
    border-color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.white};
`

QuietButton.defaultProps = {
  theme: theme
}

export default QuietButton