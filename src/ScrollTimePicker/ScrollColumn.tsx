import type React from "react";
import { forwardRef, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { indexToScrollTop, nextIndex, pad2, prevIndex, scrollTopToIndex } from "./ScrollTimePicker.utils";

export const CELL_HEIGHT = 32;
export const TOUCH_CELL_HEIGHT = 40;
export const VISIBLE_CELLS = 5; // odd, so exactly one cell sits in the centre band
const SCROLL_SETTLE_MS = 100; // debounce before resolving a scrolled-to index

export interface ScrollColumnProps {
  columnKey: "hour" | "minute" | "second";
  label: string;
  options: number[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  columnIndex: number;
  focusColumn: (index: number) => void;
  onCommitClose: () => void;
  cellHeight: number;
  idBase: string;
  reducedMotion: boolean;
}

const ColumnList = styled.div<{ $cellHeight: number }>(({ theme, $cellHeight }) => ({
  position: "relative",
  height: `${VISIBLE_CELLS * $cellHeight}px`,
  width: theme.space.x4,
  overflowY: "auto",
  scrollSnapType: "y mandatory",
  outline: "none",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
  "&:focus-visible, &:focus": {
    boxShadow: theme.shadows.focus,
    borderRadius: theme.radii.medium,
  },
}));

const Spacer = styled.div<{ $height: number }>(({ $height }) => ({
  height: `${$height}px`,
  flexShrink: 0,
}));

const Cell = styled.div<{ $cellHeight: number; $selected: boolean }>(({ theme, $cellHeight, $selected }) => ({
  height: `${$cellHeight}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  scrollSnapAlign: "center",
  cursor: "pointer",
  fontSize: theme.fontSizes.medium,
  fontVariantNumeric: "tabular-nums",
  color: $selected ? theme.colors.darkBlue : theme.colors.black,
  fontWeight: $selected ? theme.fontWeights.medium : theme.fontWeights.normal,
  borderRadius: theme.radii.medium,
  "&:hover": {
    backgroundColor: theme.colors.lightBlue,
  },
}));

const ScrollColumn = forwardRef<HTMLDivElement, ScrollColumnProps>(
  (
    {
      columnKey,
      label,
      options,
      selectedIndex,
      onSelect,
      columnIndex,
      focusColumn,
      onCommitClose,
      cellHeight,
      idBase,
      reducedMotion,
    },
    forwardedRef,
  ) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasCenteredRef = useRef(false);
    const setListRef = (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const spacerHeight = ((VISIBLE_CELLS - 1) / 2) * cellHeight;
    const cellId = (value: number) => `${idBase}-${columnKey}-${pad2(value)}`;

    // Centre the selected cell whenever the selection changes (and on open). Because this scrolls
    // to exactly `selectedIndex`, the scroll-settle listener resolves back to the same index and
    // never re-commits — no suppression flag needed.
    //
    // The first centring runs while the floating panel is still positioning (visibility:hidden until
    // floating-ui measures it). Browsers drop a `behavior: "smooth"` scroll on a not-yet-painted
    // element, which would leave the column pinned at the top so the highlight band shows "00".
    // So the initial centring snaps instantly; only later selection changes animate.
    useEffect(() => {
      const list = listRef.current;
      if (!list) return;
      const behavior = hasCenteredRef.current && !reducedMotion ? "smooth" : "auto";
      hasCenteredRef.current = true;
      list.scrollTo({
        top: indexToScrollTop(selectedIndex, cellHeight),
        behavior,
      });
    }, [selectedIndex, cellHeight, reducedMotion]);

    // Tear down the debounce timer on unmount.
    useEffect(() => {
      return () => {
        if (settleTimeout.current) clearTimeout(settleTimeout.current);
      };
    }, []);

    // After scrolling settles, resolve the centred cell and commit it — but only when it differs
    // from the current selection, so a programmatic re-centre is a no-op.
    const handleScroll = () => {
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
      settleTimeout.current = setTimeout(() => {
        const list = listRef.current;
        if (!list) return;
        const index = scrollTopToIndex(list.scrollTop, cellHeight, options.length);
        if (index !== selectedIndex) onSelect(index);
      }, SCROLL_SETTLE_MS);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          onSelect(prevIndex(selectedIndex, options.length));
          break;
        case "ArrowDown":
          event.preventDefault();
          onSelect(nextIndex(selectedIndex, options.length));
          break;
        case "Home":
          event.preventDefault();
          onSelect(0);
          break;
        case "End":
          event.preventDefault();
          onSelect(options.length - 1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          focusColumn(columnIndex - 1);
          break;
        case "ArrowRight":
          event.preventDefault();
          focusColumn(columnIndex + 1);
          break;
        case "Enter":
          event.preventDefault();
          onCommitClose();
          break;
        // Escape is handled by the panel's dismiss behaviour.
      }
    };

    return (
      <ColumnList
        ref={setListRef}
        $cellHeight={cellHeight}
        role="listbox"
        aria-orientation="vertical"
        aria-label={label}
        aria-activedescendant={cellId(options[selectedIndex])}
        // Programmatically focusable (element.focus() works on -1) but out of the tab order, so the
        // field is the widget's single tab stop — the canonical ARIA combobox shape. Load-bearing:
        // it keeps Tab from landing in the portaled columns, so widget-blur can commit on tab-out.
        tabIndex={-1}
        data-testid={`scroll-time-column-${columnKey}`}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
      >
        <Spacer $height={spacerHeight} />
        {options.map((value, index) => (
          <Cell
            key={value}
            id={cellId(value)}
            role="option"
            aria-selected={index === selectedIndex}
            data-value={value}
            data-testid={`scroll-time-cell-${columnKey}-${pad2(value)}`}
            $cellHeight={cellHeight}
            $selected={index === selectedIndex}
            onClick={() => onSelect(index)}
          >
            {pad2(value)}
          </Cell>
        ))}
        <Spacer $height={spacerHeight} />
      </ColumnList>
    );
  },
);

export default ScrollColumn;
