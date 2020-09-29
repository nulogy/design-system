import styled from "styled-components";
import Button from "./Button";
const QuietButton: React.SFC<any> = styled(Button)(({ theme }) => ({
  color: theme.colors.blue,
  borderColor: "transparent",
  backgroundColor: "transparent"
}));
export default QuietButton;
