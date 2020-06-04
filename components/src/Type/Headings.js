import styled from "styled-components";
import Text from "./Text";

const Title = Text.withComponent("h1");

Title.defaultProps = {
  fontSize: "largest",
  lineHeight: "title",
  fontWeight: "light",
  mt: 0,
  mb: "x6"
};

const SectionTitle = Text.withComponent("h2");

SectionTitle.defaultProps = {
  fontWeight: "medium",
  fontSize: "larger",
  lineHeight: "sectionTitle",
  mt: 0,
  mb: "x2"
};

const SubsectionTitleBase = Text.withComponent("h3");

const SubsectionTitle = styled(SubsectionTitleBase)({});

SubsectionTitle.defaultProps = {
  fontWeight: "medium",
  fontSize: "large",
  lineHeight: "subsectionTitle",
  mt: 0,
  mb: "x1"
};

export { Title, SectionTitle, SubsectionTitle };
