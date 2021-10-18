import styled from "styled-components";
import { TimePicker } from "../TimePicker";

const EndTime = styled(TimePicker)(({ theme }) => ({
  marginRight: theme.space.x1,
  display: "flex",
  alignItems: "flex-end",
}));

export default EndTime;
