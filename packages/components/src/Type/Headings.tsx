import Text from "./Text";

const Heading1 = Text.withComponent("h1");
Heading1.defaultProps = {
  fontSize: "heading1",
  lineHeight: "heading1",
  fontWeight: "light",
  mt: 0,
  mb: "x6"
};
const Heading2 = Text.withComponent("h2");
Heading2.defaultProps = {
  fontSize: "heading2",
  lineHeight: "heading2",
  fontWeight: "normal",
  mt: 0,
  mb: "x2"
};
const Heading3 = Text.withComponent("h3");
Heading3.defaultProps = {
  fontSize: "heading3",
  lineHeight: "heading3",
  fontWeight: "medium",
  mt: 0,
  mb: "x1"
};
const Heading4 = Text.withComponent("h4");
Heading4.defaultProps = {
  fontSize: "heading4",
  lineHeight: "heading4",
  fontWeight: "bold",
  mt: 0,
  mb: "x1"
};
export { Heading1, Heading2, Heading3, Heading4 };
