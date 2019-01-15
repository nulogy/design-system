import Text from './Text'
import theme from '../theme.js'

const Title = Text.withComponent('h1')
Title.defaultProps = {
  m: 0,
  fontSize: 4,
  lineHeight: theme.lineHeights['title'],
  fontWeight: 0,
  mb: 6,
  theme: theme
}

const SectionTitle = Text.withComponent('h2')
SectionTitle.defaultProps = {
  m: 0,
  fontSize: 3,
  fontWeight: 2,
  lineHeight: theme.lineHeights['sectionTitle'],
  mb: 2,
  theme: theme
}

const SubsectionTitle = Text.withComponent('h3')
SubsectionTitle.defaultProps = {
  m: 0,
  fontSize: 2,
  fontWeight: 2,
  lineHeight: theme.lineHeights['subsectionTitle'],
  mb: 1,
  theme: theme
}

export { Title, SectionTitle, SubsectionTitle }
