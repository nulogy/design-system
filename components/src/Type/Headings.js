import styled from "styled-components";
import Text from "./Text";
import theme from "../theme";

const Title = Text.withComponent("h1");

Title.defaultProps = {
  m: 0,
  fontSize: 4,
  lineHeight: theme.lineHeights.title,
  fontWeight: 0,
  mb: 6,
  theme,
};

const SectionTitle = Text.withComponent("h2");

SectionTitle.defaultProps = {
  m: 0,
  fontSize: 3,
  fontWeight: 2,
  lineHeight: theme.lineHeights.sectionTitle,
  mb: 3,
  theme,
};

const SubsectionTitleBase = Text.withComponent("h3");

const SubsectionTitle = styled(SubsectionTitleBase)``;

SubsectionTitle.defaultProps = {
  m: 0,
  fontSize: 2,
  fontWeight: 2,
  lineHeight: theme.lineHeights.sectionTitle,
  mb: 2,
  theme,
};

export { Title, SectionTitle, SubsectionTitle };
