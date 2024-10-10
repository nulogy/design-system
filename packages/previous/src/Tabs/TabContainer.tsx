import styled from "styled-components";
import { Box } from "../Box";

const TabContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  whiteSpace: "nowrap",
  overflowX: "scroll",
  overflowY: "hidden",
  marginBottom: theme.space.x1,
  "::-webkit-scrollbar": {
    display: "none",
  },
  position: "relative",
  "&:before": {
    content: "''",
    backgroundColor: theme.colors.grey,
    height: "1px",
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export default TabContainer;
