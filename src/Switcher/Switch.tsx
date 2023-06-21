import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import numberFromDimension from "../utils/numberFromDimension";
import { DefaultNDSThemeType } from "../theme.type";
import { ComponentSize } from "../Input/InputField";

export type SwitchProps = Omit<React.ComponentPropsWithRef<"button">, "value"> & {
  value?: string;
  selected?: boolean;
  size?: ComponentSize;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(({ children, ...rest }, ref) => {
  return (
    <SwitchButton {...rest} ref={ref}>
      {children}
    </SwitchButton>
  );
});

const cssForSize = (size: ComponentSize, theme: DefaultNDSThemeType) => {
  switch (size) {
    case "large":
      return {
        padding: `${numberFromDimension(theme.space.x2) - 1}px ${theme.space.x3}`,
      };

    case "medium":
      return {
        padding: `${numberFromDimension(theme.space.x1) - 1}px ${theme.space.x2}`,
      };
  }
};

const SwitchButton = styled.button<SwitchProps>(
  ({ selected, theme }) => ({
    margin: 1,
    background: selected ? theme.colors.white : "none",
    color: selected ? theme.colors.darkBlue : theme.colors.darkGrey,
    cursor: "pointer",
    border: "none",
    borderRadius: 9999, // todo: move to a token
    fontSize: theme.fontSizes.medium,
    fontWeight: theme.fontWeights.medium,
    lineHeight: theme.lineHeights.base,
    textDecoration: "none",
    whiteSpace: "nowrap",

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
  ({ size, theme }) => cssForSize(size, theme)
);

Switch.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  value: PropTypes.string,
};

export default Switch;
