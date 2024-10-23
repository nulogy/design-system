import React, { ReactElement } from "react";
import { Box } from "../Box";
import FocusManager from "../utils/ts/FocusManager";
import type { ComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import type { SwitchProps } from "./Switch";

type SwitcherProps = {
  variant?: ComponentVariant;
  children?: ReactElement<SwitchProps>[];
  selected?: string;
  onChange?: (value: string) => void;
};

const Switcher: React.FC<React.PropsWithChildren<SwitcherProps>> = ({ variant, selected, onChange, ...rest }) => {
  const componentVariant = useComponentVariant(variant);

  const optionRefs = [];

  const isSelected = (value: string, index: number) => {
    if (!selected) return index === 0;

    return value === selected;
  };

  const getSelectedIndex = () => {
    return React.Children.toArray(rest.children).findIndex(
      (child) => (child as ReactElement)?.props?.value === selected
    );
  };

  const options = (focusedIndex, setFocusedIndex, handleArrowNavigation) => {
    return React.Children.map(rest.children, (child: ReactElement<SwitchProps>, index) => {
      return React.cloneElement(child, {
        variant: componentVariant,
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
        onClick: (e) => {
          setFocusedIndex(index);
          if (onChange) onChange(e.target.value);
        },
      });
    });
  };

  return (
    <Box display="inline-flex" bg="whiteGrey" borderRadius="9999px" {...rest}>
      <FocusManager refs={optionRefs} defaultFocusedIndex={getSelectedIndex()}>
        {({ focusedIndex, setFocusedIndex, handleArrowNavigation }) =>
          options(focusedIndex, setFocusedIndex, handleArrowNavigation)
        }
      </FocusManager>
    </Box>
  );
};

export default Switcher;
