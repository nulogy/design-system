import { styled } from "styled-components";
import { useDescriptionListContext } from "./DescriptionListContext";

export const DescriptionTerm = styled.dt(({ theme }) => {
  const { showDivider, density, layout } = useDescriptionListContext();

  return {
    gridColumnStart: 1,
    color: theme.colors.midGrey,
    paddingLeft: theme.space.none,
    paddingRight: theme.space.none,

    ...(density === "compact" && {
      paddingTop: theme.space.x0_25,
      paddingBottom: theme.space.x0_25,
    }),

    ...(density === "medium" && {
      paddingTop: theme.space.x0_75,
      paddingBottom: theme.space.x0_75,
    }),

    ...(density === "relaxed" && {
      paddingTop: theme.space.x1_5,
      paddingBottom: theme.space.x1_5,
    }),

    ...(showDivider && {
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: theme.colors.lightGrey,
    }),

    "&:first-child": {
      border: "none",
    },
  };
});
