import styled from "styled-components";
import { TimePicker } from "../TimePicker";

const StartTime = styled(TimePicker)(({ theme }) => ({
  marginLeft: theme.space.x1,
  display: "flex",
  alignItems: "flex-end",
}));

export default StartTime;
