import React from "react";
import PropTypes from "prop-types";
import { Box } from "../Box";
import FocusManager from "../utils/ts/FocusManager";

type SwitchValue = HTMLButtonElement["value"];

type SwitcherProps = {
  children?: any;
  selected?: SwitchValue;
  onChange?: Function;
};

const Switcher: React.FC<SwitcherProps> = ({ selected, onChange, ...rest }) => {
  const optionRefs = [];

  const isSelected = (value: SwitchValue, index: number) => {
    if (!selected) return index === 0;

    return value === selected;
  };

  const options = (focusedIndex, setFocusedIndex, handleArrowNavigation) => {
    return React.Children.map(rest.children, (child, index) => {
      return React.cloneElement(child, {
        index,
        tabIndex: index === focusedIndex ? 0 : -1,
        selected: isSelected(child.props.value, index),
        "aria-selected": isSelected(child.props.value, index),
        onKeyDown: handleArrowNavigation,
        ref: (ref) => {
          optionRefs[index] = ref;
        },
        onFocus: (e) => {
          e.stopPropagation();
        },
        onClick: () => {
          setFocusedIndex(index);
          if (onChange) onChange(child.props.value);
        },
      });
    });
  };

  return (
    <Box display="inline-flex" bg="whiteGrey" borderRadius="20px" {...rest}>
      <FocusManager refs={optionRefs}>
        {({ focusedIndex, setFocusedIndex, handleArrowNavigation }) =>
          options(focusedIndex, setFocusedIndex, handleArrowNavigation)
        }
      </FocusManager>
    </Box>
  );
};

Switcher.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default Switcher;
