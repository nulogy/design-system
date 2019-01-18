import styled from 'styled-components'
import Button from './Button'
import theme from '../theme'

const QuietButton = styled(Button)`
    color: ${props => props.theme.colors.blue};
    border-color: transparent;
    background-color: transparent;
`

QuietButton.defaultProps = {
  theme: theme
}

export default QuietButton