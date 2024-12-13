import { styled } from "styled-components";
import { useDescriptionListContext } from "./DescriptionListContext";

export const DescriptionTerm = styled.dt(({ theme }) => {
  const { showDivider, density, layout, autoLayoutBreakpoint } = useDescriptionListContext();

  return {
    // narrow stuff + non-auto layout
    gridColumnStart: 1,
    color: theme.colors.midGrey,
    paddingLeft: theme.space.none,
    paddingRight: theme.space.none,

    ...(layout !== "inline" && {
      paddingBottom: theme.space.none,
    }),

    ...(density === "compact" && {
      paddingTop: theme.space.x0_25,

      ...(layout === "inline" && {
        paddingBottom: theme.space.x0_25,
      }),
    }),

    ...(density === "medium" && {
      paddingTop: theme.space.x0_75,

      ...(layout === "inline" && {
        paddingBottom: theme.space.x0_75,
      }),
    }),

    ...(density === "relaxed" && {
      paddingTop: theme.space.x1_5,
      paddingBottom: theme.space.x0_25,

      ...(layout === "inline" && {
        paddingBottom: theme.space.x1_5,
      }),
    }),

    ...(showDivider && {
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: theme.colors.lightGrey,
    }),

    "&:first-child": {
      border: "none",
    },

    [`@container (min-width: ${autoLayoutBreakpoint})`]: {
      // wide auto layout
      ...(showDivider &&
        layout !== "stacked" && {
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: theme.colors.lightGrey,
        }),

      ...(density === "compact" &&
        layout !== "stacked" && {
          paddingBottom: theme.space.x0_25,
        }),
      ...(density === "medium" &&
        layout !== "stacked" && {
          paddingBottom: theme.space.x0_75,
        }),
      ...(density === "relaxed" &&
        layout !== "stacked" && {
          paddingBottom: theme.space.x1_5,
        }),
    },
  };
});
