import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export type SwitchProps = React.ComponentPropsWithRef<"button"> & {
  selected?: boolean;
};

const SwitchButton = styled.button<SwitchProps>(({ selected, theme }) => ({
  height: theme.space.x4,
  padding: `${theme.space.half} ${theme.space.x2}`,
  background: selected ? theme.colors.white : "none",
  color: selected ? theme.colors.darkBlue : theme.colors.darkGrey,
  cursor: "pointer",
  border: "none",
  borderRadius: 20,
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
}));

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(({ children, ...rest }, ref) => {
  return (
    <SwitchButton {...rest} ref={ref}>
      {children}
    </SwitchButton>
  );
});

Switch.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
};

export default Switch;
