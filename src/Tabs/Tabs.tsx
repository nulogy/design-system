import propTypes from "@styled-system/prop-types";
import React, { useCallback, useRef, useState } from "react";
import { Box } from "../Box";
import { type ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { getSubset } from "../utils/subset";
import FocusManager from "../utils/ts/FocusManager";
import TabContainer from "./TabContainer";
import TabScrollIndicators from "./TabScrollIndicators";

export interface TabsProps {
  children?: React.ReactNode;
  className?: string;
  selectedIndex?: number;
  variant?: ComponentVariant;
  defaultSelectedIndex?: number | null;
  renderTabContentOnlyWhenSelected?: boolean;
  fitted?: boolean;
  onTabClick?: (...args: any[]) => any;
}

// Exported for consuming story/test files
export interface TabsState {
  selectedIndex: number | null;
}

function Tabs(props: TabsProps) {
  const {
    children,
    className,
    selectedIndex: controlledSelectedIndex,
    variant,
    defaultSelectedIndex = null,
    renderTabContentOnlyWhenSelected = false,
    fitted = false,
    onTabClick,
  } = props;

  const [uncontrolledSelectedIndex, setUncontrolledSelectedIndex] = useState<number | null>(defaultSelectedIndex);
  const componentVariant = useComponentVariant(variant);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = controlledSelectedIndex !== undefined ? controlledSelectedIndex : uncontrolledSelectedIndex;
  const spaceProps = getSubset(props, propTypes.space);

  const handleTabClick = useCallback((index: number) => {
    setUncontrolledSelectedIndex(index);
  }, []);

  function getTabs(
    setFocusToTab: (index: number) => void,
    focusedIndex: number,
    handleArrowNavigation: (e: React.KeyboardEvent) => void,
  ) {
    const tabs = React.Children.toArray(children) as React.ReactElement[];

    return tabs.filter(Boolean).map((tab, index) =>
      React.cloneElement(tab, {
        onClick: (e: React.MouseEvent) => {
          setFocusToTab(index);
          tab.props.onClick?.(e);
          if (onTabClick) {
            onTabClick(e, index);
          } else {
            handleTabClick(index);
          }
        },
        onFocus: (e: React.FocusEvent) => {
          e.stopPropagation();
        },
        onKeyDown: handleArrowNavigation,
        index,
        variant: componentVariant,
        tabIndex: index === focusedIndex ? 0 : -1,
        selected: index === selectedIndex,
        "aria-selected": index === selectedIndex,
        fullWidth: fitted,
        ref: (ref: HTMLButtonElement | null) => {
          tabRefs.current[index] = ref;
        },
      }),
    );
  }

  function getTabContent() {
    const tabs = React.Children.toArray(children) as React.ReactElement[];

    return tabs.filter(Boolean).map((tab, index) => {
      const selected = index === selectedIndex;
      if (renderTabContentOnlyWhenSelected && !selected) return null;
      return (
        <div aria-hidden={!selected} hidden={!selected} key={tab.key ?? tab.props.label}>
          {tab.props.children}
        </div>
      );
    });
  }

  return (
    <Box position="relative">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <FocusManager refs={tabRefs.current as any} defaultFocusedIndex={selectedIndex}>
        {({ focusedIndex, setFocusedIndex, handleArrowNavigation }) => (
          <TabScrollIndicators tabRefs={tabRefs.current} tabContainerRef={tabContainerRef}>
            {({ handleScroll }) => (
              <TabContainer
                className={className}
                role="tablist"
                onScroll={handleScroll}
                ref={tabContainerRef}
                {...spaceProps}
              >
                {getTabs(setFocusedIndex, focusedIndex, handleArrowNavigation)}
              </TabContainer>
            )}
          </TabScrollIndicators>
        )}
      </FocusManager>
      {getTabContent()}
    </Box>
  );
}

export default Tabs;
