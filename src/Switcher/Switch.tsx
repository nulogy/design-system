import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import numberFromDimension from "../utils/numberFromDimension";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

export type SwitchProps = Omit<React.ComponentPropsWithRef<"button">, "value"> & {
  value?: string;
  selected?: boolean;
  variant?: ComponentVariant;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(({ children, ...rest }, ref) => {
  return (
    <SwitchButton {...rest} ref={ref}>
      {children}
    </SwitchButton>
  );
});

const SwitchButton = styled.button<SwitchProps>(
  ({ selected, theme }) => ({
    margin: 1,
    background: selected ? theme.colors.white : "none",
    color: selected ? theme.colors.darkBlue : theme.colors.darkGrey,
    cursor: "pointer",
    border: "none",
    borderRadius: theme.radii.pill,
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.medium,
    lineHeight: theme.lineHeights.base,
    textDecoration: "none",
    whiteSpace: "nowrap",
    padding: `${numberFromDimension(theme.space.x1) - 1}px ${theme.space.x2}`,

    ...(selected && { boxShadow: theme.shadows.small }),

    "&:focus": {
      outline: "none",
      boxShadow: theme.shadows.focus,
    },

    ...(!selected && {
      "&:hover": {
        backgroundColor: theme.colors.lightGrey,
      },
    }),
  }),
  variant({
    variants: {
      touch: {
        fontSize: "md",
        lineHeight: "base",
      },
    },
  })
);

export default Switch;
