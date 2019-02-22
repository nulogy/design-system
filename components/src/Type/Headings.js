import styled from "styled-components";
import { Text } from "ComponentsRoot";
import theme from "../theme";

const Title = Text.withComponent("h1");

Title.defaultProps = {
  m: 0,
  fontSize: theme.fontSizes.largest,
  lineHeight: theme.lineHeights.title,
  fontWeight: theme.fontWeights.light,
  mb: theme.space.x6,
  theme,
};

const SectionTitle = Text.withComponent("h2");

SectionTitle.defaultProps = {
  m: 0,
  fontWeight: theme.fontWeights.medium,
  fontSize: theme.fontSizes.larger,
  lineHeight: theme.lineHeights.sectionTitle,
  mb: theme.space.x2,
  theme,
};

const SubsectionTitleBase = Text.withComponent("h3");

const SubsectionTitle = styled(SubsectionTitleBase)({});

SubsectionTitle.defaultProps = {
  m: 0,
  fontWeight: theme.fontWeights.medium,
  fontSize: theme.fontSizes.large,
  lineHeight: theme.lineHeights.sectionTitle,
  mb: theme.space.x1,
  theme,
};

export { Title, SectionTitle, SubsectionTitle };
