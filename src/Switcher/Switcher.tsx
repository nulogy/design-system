import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { Box } from "../Box";
import FocusManager from "../utils/ts/FocusManager";
import { type SwitchProps } from "./Switch";

type SwitchValue = SwitchProps["value"];

type SwitcherProps = {
  children?: ReactElement<SwitchProps>[];
  selected?: SwitchValue;
  onChange?: (value: SwitchValue) => void;
};

const Switcher: React.FC<SwitcherProps> = ({ selected, onChange, ...rest }) => {
  const optionRefs = [];

  const isSelected = (value: SwitchValue, index: number) => {
    if (!selected) return index === 0;

    return value === selected;
  };

  const getSelectedIndex = () => {
    return React.Children.toArray(rest.children).findIndex(
      (child) => (child as ReactElement)?.props?.value === selected
    );
  };

  const options = (focusedIndex, setFocusedIndex, handleArrowNavigation) => {
    return React.Children.map(rest.children, (child, index) => {
      return React.cloneElement(child, {
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
      <FocusManager refs={optionRefs} defaultFocusedIndex={getSelectedIndex()}>
        {({ focusedIndex, setFocusedIndex, handleArrowNavigation }) =>
          options(focusedIndex, setFocusedIndex, handleArrowNavigation)
        }
      </FocusManager>
    </Box>
  );
};

Switcher.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default Switcher;
