import styled from "styled-components";
import { TimePicker } from "../TimePicker";

const EndTime = styled(TimePicker)(({ theme }) => ({
  marginRight: theme.space.x1,
}));

export default EndTime;
