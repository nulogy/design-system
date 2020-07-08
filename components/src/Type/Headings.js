import Text from "./Text";

const Title = Text.withComponent("h1");

Title.defaultProps = {
  fontSize: "heading1",
  lineHeight: "heading1",
  fontWeight: "light",
  mt: 0,
  mb: "x6"
};

const SectionTitle = Text.withComponent("h2");

SectionTitle.defaultProps = {
  fontSize: "heading2",
  lineHeight: "heading2",
  fontWeight: "normal",
  mt: 0,
  mb: "x2"
};

const SubsectionTitle = Text.withComponent("h3");

SubsectionTitle.defaultProps = {
  fontSize: "heading3",
  lineHeight: "heading3",
  fontWeight: "medium",
  mt: 0,
  mb: "x1"
};

export { Title, SectionTitle, SubsectionTitle };
