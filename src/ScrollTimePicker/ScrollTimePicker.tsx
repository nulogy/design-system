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
  // Force the error (red) styling without an inline message — used by composing components
  // (e.g. DateTimePicker) that render a single shared validation message for the whole group.
  error?: boolean;
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
  // The panel renders in a FloatingPortal (document.body), outside NDSProvider's
  // GlobalStyles font wrapper, so it can't inherit the NDS font — declare it
  // explicitly or the digits fall back to the browser default (serif).
  fontFamily: theme.fonts.base,
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
      error = false,
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

    // `open` means "panel visible" (set on field focus). `region` is where keyboard focus lives;
    // `readOnly` derives from it, not from `open`, so the field stays editable while the panel is open.
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState<"field" | "columns">("field");
    // Guards the programmatic refocus after Escape/Enter-in-column so open-on-focus doesn't
    // instantly reopen the panel we just closed. Cleared once, in handleInputFocus.
    const suppressReopenRef = useRef(false);
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

    const hasError = !!(error || errorMessage || errorList);
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
      } else if (isControlled) {
        // Controlled: the display must reflect the value prop. An empty/unparseable field never
        // commits (no onChange fires), so rather than let the display diverge to blank — where a
        // later re-apply of the *same* value can't restore it (the sync effect only reacts to value
        // *changes*) — snap the display back to the controlled value.
        setRawInput(committedValue);
      } else {
        setRawInput("");
      }
    }, [rawInput, commitValue, timeOptions, isControlled, committedValue]);

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
      // Reopen a dismissed-but-focused field (e.g. after Escape) on the next keystroke. No-op when
      // already open, so `draft` stays stale during normal typing (the dials must not follow keys).
      if (!open) openPanelForField();
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

    // Seed the dials from a (possibly partial) source string without mutating the field text or
    // committing. Parseable → those parts; otherwise the committed value, else the current time.
    // Never calls commitValue / setRawInput / onChange.
    const seedDraft = useCallback(
      (sourceRaw: string) => {
        const parts = parseInput(sourceRaw, timeOptions);
        const seedValue = parts
          ? formatTime(parts, timeOptions)
          : committedValue || formatTime(dateToTimeParts(new Date(), timeOptions), timeOptions);
        setDraft(resolveInitialIndices(seedValue, timeOptions));
      },
      [committedValue, timeOptions],
    );

    // Open-on-focus: show the panel but keep focus + editability in the field. Snapshotting the
    // Escape baseline and seeding only on the closed→open edge means refocusing an already-open
    // field (columns→field) neither resets the baseline nor re-seeds the dials.
    const openPanelForField = useCallback(() => {
      if (disabled) return;
      setRegion("field");
      if (!open) {
        valueAtOpenRef.current = committedValue;
        setOpen(true);
        seedDraft(rawInput);
      }
    }, [disabled, open, committedValue, rawInput, seedDraft]);

    // Explicit "go to the dials" gesture (ArrowDown / clock). Normalizes the typed partial on this
    // deliberate handoff (so the field matches the dials), re-seeds the dials from it, then moves
    // focus into the columns. Re-seeding here — not during typing — is what makes the clock/ArrowDown
    // parse the partial while dials never move during plain typing.
    const enterColumns = useCallback(() => {
      if (disabled) return;
      if (!open) {
        valueAtOpenRef.current = committedValue;
        setOpen(true);
      }
      commitTypedInput();
      seedDraft(rawInput);
      setRegion("columns");
      requestAnimationFrame(() => columnRefs.current[0]?.focus());
    }, [disabled, open, committedValue, rawInput, seedDraft, commitTypedInput]);

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
      setRegion("field");
      // Arm BEFORE focusField() so the rAF focusin it triggers doesn't reopen the panel.
      suppressReopenRef.current = true;
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
          // Only arm the guard when a real focusin will actually fire to consume it. If Escape is
          // pressed while the field itself is focused (never entered a column), focusField() is a
          // no-op and fires no focusin — an unconditional guard would stick true and silently break
          // the next reopen.
          if (document.activeElement !== inputRef.current) {
            suppressReopenRef.current = true;
            focusField();
          }
          setRegion("field");
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

    // Open-on-focus, unless this focusin is the programmatic refocus after Escape / Enter-in-column
    // (guarded), which must not reopen the panel it just closed.
    const handleInputFocus = () => {
      if (disabled) return;
      if (suppressReopenRef.current) {
        suppressReopenRef.current = false;
        setRegion("field");
        return;
      }
      openPanelForField();
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        // Commit the typed value and close; the field keeps focus and stays editable. Closing fires
        // no focus event, so there's nothing to guard against reopening.
        commitTypedInput();
        setOpen(false);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        enterColumns();
      }
    };

    // Commit only when focus leaves the WHOLE widget. The panel lives in a FloatingPortal — a React
    // child of this Box but a DOM sibling in document.body — and React's onBlur (focusout) bubbles
    // along the React tree, so this receives focusout from the field, the clock button, and the
    // portaled columns alike. FieldGroup is not a React ancestor of the portal, so this must be on Box.
    const handleWidgetBlur = (event: React.FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      const reference = refs.domReference.current; // FieldGroup (the real DOM node, not a virtual el)
      const floating = refs.floating.current; // Panel
      if (next && (reference?.contains(next) || floating?.contains(next))) return; // stayed inside
      commitTypedInput(); // "9" -> "09:00"; onChange deduped by lastCommittedRef
      setRegion("field");
      setOpen(false);
    };

    const columns = [
      { key: "hour" as const, label: t("hours"), options: hourOptions, index: draft.hourIndex },
      { key: "minute" as const, label: t("minutes"), options: minuteOptions, index: draft.minuteIndex },
      ...(showSeconds
        ? [{ key: "second" as const, label: t("seconds"), options: secondOptions, index: draft.secondIndex }]
        : []),
    ];

    return (
      <Box className={className} onBlur={handleWidgetBlur} {...spaceProps}>
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
            onFocus={handleInputFocus}
            readOnly={region === "columns"}
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
              onClick={enterColumns}
              // Pure mouse affordance, out of the tab order: keyboard/SR users open the panel just
              // by focusing the field, keeping the field the widget's single tab stop.
              tabIndex={-1}
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
