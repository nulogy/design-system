import { styled } from "styled-components";
import { useDescriptionListContext } from "./DescriptionListContext";

export const DescriptionDetails = styled.dd(({ theme }) => {
  const { showDivider, density, layout } = useDescriptionListContext();

  return {
    // narrow stuff + non-auto layout
    margin: 0,
    color: theme.colors.black,
    paddingLeft: theme.space.none,
    paddingRight: theme.space.none,

    ...(layout !== "inline" && {
      paddingTop: theme.space.none,
    }),

    ...(density === "compact" && {
      paddingBottom: theme.space.x0_25,

      ...(layout === "inline" && {
        paddingTop: theme.space.x0_25,
      }),
    }),

    ...(density === "medium" && {
      paddingBottom: theme.space.x0_75,

      ...(layout === "inline" && {
        paddingTop: theme.space.x0_75,
      }),
    }),

    ...(density === "relaxed" && {
      paddingBottom: theme.space.x1_5,
      paddingTop: theme.space.x0_25,

      ...(layout === "inline" && {
        paddingTop: theme.space.x1_5,
      }),
    }),

    ...(showDivider &&
      layout === "inline" && {
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: theme.colors.lightGrey,
      }),

    "&:nth-child(2)": {
      border: "none",
    },
  };
});
