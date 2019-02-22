import styled from "styled-components";
import theme from "../theme";
import { Button } from "ComponentsRoot";

const QuietButton = styled(Button)({
  color: theme.colors.blue,
  borderColor: "transparent",
  backgroundColor: "transparent",
});

export default QuietButton;
