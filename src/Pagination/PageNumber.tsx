import styled from "styled-components";
import PaginationButton from "./PaginationButton";

type PageNumberProps = {
  currentPage: boolean;
};

const PageNumber = styled(PaginationButton)<PageNumberProps>(({ theme, currentPage }) => ({
  background: currentPage ? theme.colors.darkBlue : "transparent",
  color: currentPage ? theme.colors.whiteGrey : theme.colors.black,
}));

export default PageNumber;
