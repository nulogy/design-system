import styled from "styled-components";
import { Link } from "../Link";
import { DefaultNDSThemeType } from "../theme";
import { Text } from "../Type";
import { useDescriptionListContext } from "./DescriptionListContext";
import { BaseDescriptionListProps, Columns, Density, GroupMinWidth } from "./lib/types";

export type DescriptionListPartsProps = BaseDescriptionListProps & {
  columns?: Columns;
  groupMinWidth?: GroupMinWidth;
};

const gapConfig: Record<Density, keyof DefaultNDSThemeType["space"]> = {
  compact: "x0_75",
  medium: "x1_5",
  relaxed: "x3",
};

export const DescriptionListContainer = styled.div({
  containerType: "inline-size",
  width: "100%",
});

export const DescriptionList = styled.dl(({ theme }) => {
  const { fontSize, lineHeight, density, columns, groupMinWidth } = useDescriptionListContext();

  return {
    containerType: "inline-size",
    width: "100%",
    margin: 0,
    display: "grid",
    columnGap: theme.space[gapConfig[density]],
    fontSize: theme.fontSizes[fontSize] ?? theme.fontSizes.medium,
    lineHeight: theme.lineHeights[lineHeight] ?? theme.lineHeights.base,
    ...(typeof columns === "number" && {
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    }),

    [`${Link}`]: {
      fontSize: "inherit",
      lineHeight: "inherit",
    },

    [`${Text}`]: {
      fontSize: "inherit",
      lineHeight: "inherit",
    },

    ...(groupMinWidth && {
      gridTemplateColumns: `repeat(auto-fit, minmax(${groupMinWidth}, 1fr))`,
    }),

    ...(typeof columns === "object" && {
      ...Object.fromEntries(
        Object.entries(columns).map(([key, value]) => [
          `@container (min-width: ${theme.breakpoints[key]})`,
          { gridTemplateColumns: `repeat(${value}, minmax(0, 1fr))` },
        ])
      ),
    }),
  };
});

export const DescriptionGroup = styled.div<{ rowSpan?: number; columnSpan?: number }>(
  ({ theme, rowSpan, columnSpan }) => {
    const { descriptionTermMaxWidth, layout, showDivider, autoLayoutBreakpoint } = useDescriptionListContext();

    return {
      display: "grid",
      gridTemplateRows: "auto 1fr",
      ...(showDivider && {
        borderBottom: `1px solid ${theme.colors.lightGrey}`,
      }),

      ...(layout === "inline" && {
        gridTemplateColumns: `minmax(0, ${descriptionTermMaxWidth}) 1fr`,
      }),

      ...((layout === "stacked" || layout === "auto") && {
        gridTemplateColumns: "1fr",
      }),

      ...(columnSpan && {
        gridColumn: `span ${columnSpan} / span ${columnSpan}`,
      }),

      ...(rowSpan && {
        gridRow: `span ${rowSpan} / span ${rowSpan}`,
      }),

      [`@container (min-width: ${autoLayoutBreakpoint})`]: {
        ...(layout === "auto" && {
          gridTemplateColumns: `minmax(0, min(50%, ${descriptionTermMaxWidth})) 1fr`,
        }),
      },
    };
  }
);

export const DescriptionTerm = styled.dt(({ theme }) => {
  const { showDivider, layout, density, autoLayoutBreakpoint } = useDescriptionListContext();

  return {
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

export const DescriptionDetails = styled.dd(({ theme }) => {
  const { autoLayoutBreakpoint, showDivider, density, layout } = useDescriptionListContext();

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
          paddingTop: theme.space.x0_25,
        }),
      ...(density === "medium" &&
        layout !== "stacked" && {
          paddingTop: theme.space.x0_75,
        }),
      ...(density === "relaxed" &&
        layout !== "stacked" && {
          paddingTop: theme.space.x1_5,
        }),
    },
  };
});
