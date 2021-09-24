import styled from "styled-components";
import PaginationButton from "./PaginationButton";

const PageNumber = styled(PaginationButton)(({ theme, currentPage }: any) => ({
  background: currentPage ? theme.colors.darkBlue : "transparent",
  color: currentPage ? theme.colors.whiteGrey : theme.colors.black,
}));

export default PageNumber;
