import styled from "styled-components";
import { CloseButton } from "../Button";

const ModalCloseButton = styled(CloseButton)(({ theme }) => ({
  position: "absolute",
  top: "12px",
  right: theme.space.x2,
}));

export default ModalCloseButton;
