import styled from "styled-components";
import { Button } from "ComponentsRoot";
import theme from "../theme";

const QuietButton = styled(Button)({
  color: theme.colors.blue,
  borderColor: "transparent",
  backgroundColor: "transparent",
});

export default QuietButton;
