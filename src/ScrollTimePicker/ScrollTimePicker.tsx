import {
  autoUpdate,
  FloatingPortal,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import type { SpaceProps } from "styled-system";
import { Box } from "../Box";
import { IconicButton } from "../Button";
import { InputField } from "../Input/InputField";
import { type ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { InlineValidation } from "../Validation";
import ScrollColumn, { CELL_HEIGHT, TOUCH_CELL_HEIGHT } from "./ScrollColumn";
import {
  buildHourOptions,
  buildMinuteOptions,
  buildSecondOptions,
  caretIndexForTypedDigits,
  composeValueFromIndices,
  countDigits,
  dateToTimeParts,
  fieldsFromRaw,
  formatTime,
  maskPlaceholder,
  normalizeValueProp,
  parseInput,
  renderFields,
  resolveInitialIndices,
  type TimeIndices,
  type TimeOptions,
} from "./ScrollTimePicker.utils";

export interface ScrollTimePickerProps extends SpaceProps {
  value?: string | Date;
  defaultValue?: string | Date;
  onChange?: (value: string) => void;
  onInputChange?: (raw: string) => void;
  utc?: boolean;
  showSeconds?: boolean;
  disabled?: boolean;
  labelText?: string;
  placeholder?: string;
  errorMessage?: string;
  errorList?: string[];
  "aria-label"?: string;
  className?: string;
  variant?: ComponentVariant;
  id?: string;
  ref?: React.Ref<HTMLInputElement>;
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

// --- styled ---

const CLOCK_ICON_SIZE = "x2";

// `width: fit-content` shrinks this positioning context to the input's width so the
// absolutely-positioned clock button anchors to the input's right edge, not the full row.
const FieldGroup = styled(Box)({
  position: "relative",
  width: "fit-content",
});

// Reserve room on the right of the input so typed text never runs under the clock button.
const StyledField = styled(InputField)(({ theme }) => ({
  paddingRight: `calc(${theme.space.x3} + ${theme.space.x1})`,
}));

// Overlays the input row (label sits above, so anchoring to the bottom centres the button
// over the field regardless of whether a label is present).
const ClockButtonWrapper = styled.div(({ theme }) => ({
  position: "absolute",
  right: theme.space.half,
  bottom: 0,
  height: theme.sizes.x5,
  display: "flex",
  alignItems: "center",
}));

const Panel = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.white,
  border: `1px solid ${theme.colors.grey}`,
  borderRadius: theme.radii.medium,
  boxShadow: theme.shadows.medium,
  padding: theme.space.half,
  zIndex: theme.zIndices.overlay,
}));

const PanelInner = styled.div({
  position: "relative",
});

const Columns = styled.div(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "stretch",
  gap: theme.space.x0_25,
}));

const Separator = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.colors.midGrey,
  fontSize: theme.fontSizes.medium,
}));

const HighlightBand = styled.div<{ $cellHeight: number }>(({ theme, $cellHeight }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  height: `${$cellHeight}px`,
  backgroundColor: theme.colors.whiteGrey,
  borderRadius: theme.radii.medium,
  pointerEvents: "none",
  zIndex: 0,
}));

const ScrollTimePicker = forwardRef<HTMLInputElement, ScrollTimePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onInputChange,
      utc = false,
      showSeconds = false,
      disabled = false,
      labelText,
      placeholder,
      errorMessage,
      errorList,
      "aria-label": ariaLabel,
      className,
      variant,
      id,
      ...spaceProps
    },
    forwardedRef,
  ) => {
    const { t } = useTranslation();
    const componentVariant = useComponentVariant(variant);
    const timeOptions: TimeOptions = useMemo(() => ({ utc, showSeconds }), [utc, showSeconds]);
    const cellHeight = componentVariant === "touch" ? TOUCH_CELL_HEIGHT : CELL_HEIGHT;

    const isControlled = value !== undefined;
    const normalizedProp = normalizeValueProp(value, timeOptions);
    const [internalValue, setInternalValue] = useState<string>(
      () => normalizeValueProp(defaultValue, timeOptions) ?? "",
    );
    const committedValue = isControlled ? (normalizedProp ?? "") : internalValue;

    const [open, setOpen] = useState(false);
    const [rawInput, setRawInput] = useState<string>(committedValue);
    const [draft, setDraft] = useState<TimeIndices>(() => resolveInitialIndices(committedValue, timeOptions));
    const draftRef = useRef(draft);
    draftRef.current = draft;

    const lastCommittedRef = useRef<string>(committedValue);
    const valueAtOpenRef = useRef<string>(committedValue);

    const inputRef = useRef<HTMLInputElement | null>(null);
    // Caret index to restore after a masked re-render (null when there's nothing pending).
    const pendingCaretRef = useRef<number | null>(null);
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [forwardedRef],
    );

    const hasError = !!(errorMessage || errorList);
    const panelId = id ? `${id}-panel` : undefined;

    const hourOptions = useMemo(() => buildHourOptions(), []);
    const minuteOptions = useMemo(() => buildMinuteOptions(), []);
    const secondOptions = useMemo(() => buildSecondOptions(), []);
    const reducedMotion = prefersReducedMotion();

    const commitValue = useCallback(
      (nextValue: string) => {
        if (!isControlled) setInternalValue(nextValue);
        setRawInput(nextValue);
        if (nextValue !== lastCommittedRef.current) {
          lastCommittedRef.current = nextValue;
          onChange?.(nextValue);
        }
      },
      [isControlled, onChange],
    );

    // Parse the free-typed text to the nearest acceptable value and write it back.
    const commitTypedInput = useCallback(() => {
      const parts = parseInput(rawInput, timeOptions);
      if (parts) {
        commitValue(formatTime(parts, timeOptions));
      } else {
        setRawInput("");
      }
    }, [rawInput, commitValue, timeOptions]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.currentTarget.value;
      // Anchor the caret to the number of digits before it, not the raw index — masking inserts
      // and removes separators/placeholders, so the raw index would drift.
      const caret = event.currentTarget.selectionStart ?? rawValue.length;
      const digitsBeforeCaret = countDigits(rawValue.slice(0, caret));

      const fields = fieldsFromRaw(rawValue, timeOptions);
      const masked = fields.every((field) => field === "") ? "" : renderFields(fields, timeOptions);
      pendingCaretRef.current = caretIndexForTypedDigits(fields, digitsBeforeCaret, timeOptions);
      setRawInput(masked);
      onInputChange?.(masked);
    };

    // Restore the caret after the masked value re-renders (otherwise the browser drops it at the
    // end of the field). Runs before paint so the caret never visibly jumps.
    // biome-ignore lint/correctness/useExhaustiveDependencies: rawInput is the trigger — the effect must re-run after the masked value re-renders so the caret is restored on the updated DOM value.
    useLayoutEffect(() => {
      const caret = pendingCaretRef.current;
      if (caret === null) return;
      pendingCaretRef.current = null;
      const input = inputRef.current;
      if (input && document.activeElement === input) {
        input.setSelectionRange(caret, caret);
      }
    }, [rawInput]);

    const focusField = useCallback(() => {
      requestAnimationFrame(() => inputRef.current?.focus());
    }, []);

    const focusColumn = useCallback((index: number) => {
      columnRefs.current[index]?.focus();
    }, []);

    // Parse the (possibly partial) field, seed the dials, and open the panel. A parseable
    // value is committed; an empty/unparseable field seeds the dials to the current time but
    // commits nothing (the field stays empty until the user interacts).
    const openPanel = useCallback(() => {
      if (disabled) return;
      const parts = parseInput(rawInput, timeOptions);
      let seedValue: string;
      if (parts) {
        seedValue = formatTime(parts, timeOptions);
        commitValue(seedValue);
        valueAtOpenRef.current = seedValue;
      } else {
        seedValue = formatTime(dateToTimeParts(new Date(), timeOptions), timeOptions);
        setRawInput("");
        valueAtOpenRef.current = "";
      }
      setDraft(resolveInitialIndices(seedValue, timeOptions));
      setOpen(true);
    }, [disabled, rawInput, commitValue, timeOptions]);

    // A dial interaction: update the draft index for a column and commit the composed value.
    const selectDialIndex = useCallback(
      (key: "hour" | "minute" | "second", index: number) => {
        const next: TimeIndices = { ...draftRef.current, [`${key}Index`]: index };
        setDraft(next);
        commitValue(composeValueFromIndices(next, timeOptions));
      },
      [commitValue, timeOptions],
    );

    const commitAndClose = useCallback(() => {
      commitValue(composeValueFromIndices(draftRef.current, timeOptions));
      setOpen(false);
      focusField();
    }, [commitValue, timeOptions, focusField]);

    const revertToValueAtOpen = useCallback(() => {
      const reverted = valueAtOpenRef.current;
      setRawInput(reverted);
      if (!isControlled) setInternalValue(reverted);
      if (reverted !== lastCommittedRef.current) {
        lastCommittedRef.current = reverted;
        onChange?.(reverted);
      }
    }, [isControlled, onChange]);

    // floating-ui only requests a close (Escape / outside-press). Escape reverts to the
    // value at open and returns focus to the field; outside-press keeps the last value.
    const handleOpenChange = useCallback(
      (nextOpen: boolean, _event?: Event, reason?: string) => {
        if (nextOpen) {
          setOpen(true);
          return;
        }
        if (reason === "escape-key") {
          revertToValueAtOpen();
          focusField();
        }
        setOpen(false);
      },
      [revertToValueAtOpen, focusField],
    );

    const { refs, floatingStyles, context, isPositioned } = useFloating({
      open,
      onOpenChange: handleOpenChange,
      placement: "bottom-start",
      middleware: [offset(4), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
    });
    const dismiss = useDismiss(context, { escapeKey: true, outsidePress: true });
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

    // Move focus into the first column when the panel opens.
    useEffect(() => {
      if (open) {
        requestAnimationFrame(() => columnRefs.current[0]?.focus());
      }
    }, [open]);

    // Sync the field text + dials when the committed value changes from outside — a controlled
    // `value` update, or a rejected commit snapping back. Only re-derives when the parsed value
    // actually changed and never calls onChange (loop guard, mirrors TimeRange GO-11207).
    useEffect(() => {
      if (committedValue !== lastCommittedRef.current) {
        lastCommittedRef.current = committedValue;
        setRawInput(committedValue);
        setDraft(resolveInitialIndices(committedValue, timeOptions));
      }
    }, [committedValue, timeOptions]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (open) return;
      if (event.key === "Enter") {
        event.preventDefault();
        commitTypedInput();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        openPanel();
      }
    };

    const handleInputBlur = () => {
      if (!open) commitTypedInput();
    };

    // Clicking the read-only field while the panel is open returns to type mode.
    const handleInputClick = () => {
      if (open) {
        setOpen(false);
        focusField();
      }
    };

    const columns = [
      { key: "hour" as const, label: t("hours"), options: hourOptions, index: draft.hourIndex },
      { key: "minute" as const, label: t("minutes"), options: minuteOptions, index: draft.minuteIndex },
      ...(showSeconds
        ? [{ key: "second" as const, label: t("seconds"), options: secondOptions, index: draft.secondIndex }]
        : []),
    ];

    return (
      <Box className={className} {...spaceProps}>
        <FieldGroup ref={refs.setReference} {...getReferenceProps()}>
          <StyledField
            ref={setInputRef}
            data-testid="scroll-time-picker-input"
            labelText={labelText}
            error={hasError}
            disabled={disabled}
            value={rawInput}
            placeholder={placeholder ?? maskPlaceholder(timeOptions)}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
            onClick={handleInputClick}
            readOnly={open}
            aria-label={ariaLabel || t("select a time")}
            aria-invalid={hasError}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? panelId : undefined}
            role="combobox"
            autoComplete="off"
            variant={componentVariant}
            inputWidth={componentVariant === "touch" ? "160px" : "128px"}
          />
          <ClockButtonWrapper>
            <IconicButton
              type="button"
              icon="queryBuilder"
              iconSize={CLOCK_ICON_SIZE}
              disabled={disabled}
              onClick={openPanel}
              data-testid="scroll-time-picker-open"
              aria-label={t("open time picker")}
              aria-haspopup="dialog"
              aria-expanded={open}
              variant={componentVariant}
            />
          </ClockButtonWrapper>
        </FieldGroup>
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
        {open && (
          <FloatingPortal>
            <Panel
              ref={refs.setFloating}
              style={{ ...floatingStyles, visibility: isPositioned ? "visible" : "hidden" }}
              {...getFloatingProps()}
              role="dialog"
              aria-label={ariaLabel || t("select a time")}
              id={panelId}
              data-testid="scroll-time-picker-panel"
            >
              <PanelInner>
                <HighlightBand $cellHeight={cellHeight} data-testid="scroll-time-highlight" />
                <Columns>
                  {columns.map((column, columnIndex) => (
                    <React.Fragment key={column.key}>
                      {columnIndex > 0 && <Separator>:</Separator>}
                      <ScrollColumn
                        ref={(node) => {
                          columnRefs.current[columnIndex] = node;
                        }}
                        columnKey={column.key}
                        label={column.label}
                        options={column.options}
                        selectedIndex={column.index}
                        onSelect={(index) => selectDialIndex(column.key, index)}
                        columnIndex={columnIndex}
                        focusColumn={focusColumn}
                        onCommitClose={commitAndClose}
                        cellHeight={cellHeight}
                        idBase={id ?? "scroll-time"}
                        reducedMotion={reducedMotion}
                      />
                    </React.Fragment>
                  ))}
                </Columns>
              </PanelInner>
            </Panel>
          </FloatingPortal>
        )}
      </Box>
    );
  },
);

export default ScrollTimePicker;
