import { styled } from "styled-components";
import { useDescriptionListContext } from "./DescriptionListContext";

export const DescriptionDetails = styled.dd(({ theme }) => {
  const { autoLayoutBreakpoint, showDivider, density, layout } = useDescriptionListContext();

  return {
    margin: 0,
    paddingLeft: theme.space.none,
    paddingRight: theme.space.none,
    color: theme.colors.darkGrey,

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

    ...(showDivider &&
      layout === "inline" && {
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: theme.colors.lightGrey,
      }),

    [`@container (min-width: ${autoLayoutBreakpoint})`]: {
      ...(showDivider &&
        layout !== "stacked" && {
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: theme.colors.lightGrey,
        }),

      "&:nth-child(2)": {
        border: "none",
      },
    },
  };
});
