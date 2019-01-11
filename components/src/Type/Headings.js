import Text from './Text'
import theme from '../theme.js'

const Title = Text.withComponent('h1')
Title.defaultProps = {
  fontSize: 4,
  lineHeight: 1.043478,
  fontWeight: 0,
  mb: 6,
  theme: theme
}

const SectionTitle = Text.withComponent('h2')
SectionTitle.defaultProps = {
  fontSize: 3,
  fontWeight: 2,
  lineHeight: 1.230769,
  mb: 2,
  theme: theme
}

const SubsectionTitle = Text.withComponent('h3')
SubsectionTitle.defaultProps = {
  fontSize: 2,
  fontWeight: 2,
  lineHeight: 1.333333,
  mb: 1,
  theme: theme
}

export { Title, SectionTitle, SubsectionTitle }
