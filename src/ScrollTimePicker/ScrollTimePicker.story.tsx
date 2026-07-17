import { type ReactElement, useRef, useState } from "react";
import { action } from "storybook/actions";
import { expect, fireEvent, fn, screen, userEvent, waitFor, within } from "storybook/test";

import { CELL_HEIGHT } from "./ScrollColumn";
import ScrollTimePicker from "./ScrollTimePicker";
import { indexToScrollTop } from "./ScrollTimePicker.utils";

export default {
  title: "Components/ScrollTimePicker",
};

export const Default = {
  render: () => (
    <>
      <ScrollTimePicker labelText="Local Time" onChange={action("changed")} onInputChange={action("input changed")} />
      <ScrollTimePicker labelText="UTC Time" utc onChange={action("changed")} onInputChange={action("input changed")} />
    </>
  ),
  name: "default",
};

export const WithValue = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="13:45" onChange={action("changed")} />,
  name: "with value",
};

// On open, each column is scrolled so its selected value sits under the highlight band.
// Regression: the first centring fires while the floating panel is still visibility:hidden, and a
// smooth scroll on a hidden element is dropped — leaving every column pinned at index 0 ("00").
export const CentersSelectionOnOpen = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="09:30" onChange={fn()} />,
  name: "centers the selection under the highlight band on open",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opening scrolls the hour and minute columns to their selected values", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      const hourColumn = screen.getByTestId("scroll-time-column-hour");
      const minuteColumn = screen.getByTestId("scroll-time-column-minute");
      await waitFor(() => expect(hourColumn.scrollTop).toBe(indexToScrollTop(9, CELL_HEIGHT)));
      await waitFor(() => expect(minuteColumn.scrollTop).toBe(indexToScrollTop(30, CELL_HEIGHT)));
    });
  },
};

// Visual: the panel open, showing the columns, centred selection and highlight band.
export const Open = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="09:30" onChange={action("changed")} />,
  name: "open",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
    await screen.findByTestId("scroll-time-picker-panel");
  },
};

export const Touch = {
  render: () => <ScrollTimePicker labelText="Time" variant="touch" defaultValue="09:30" onChange={action("changed")} />,
  name: "touch",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
    await screen.findByTestId("scroll-time-picker-panel");
  },
};

export const WithError = {
  render: () => (
    <ScrollTimePicker labelText="Time" defaultValue="09:30" errorMessage="Select a valid time" onChange={fn()} />
  ),
  name: "with error",
};

export const RTL = {
  render: () => <ScrollTimePicker labelText="الوقت" defaultValue="09:30" onChange={action("changed")} />,
  name: "rtl",
  decorators: [
    (Story: () => ReactElement) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

export const UsingRefToControlFocus = {
  render: () => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <>
        {/* Fixed time, NOT `new Date()`: focusing opens the panel and an empty field seeds the
            open dials from the current time, so the snapshot would drift every run. */}
        <ScrollTimePicker labelText="Time" ref={ref} defaultValue="13:37" onChange={fn()} />
        <button type="button" data-testid="focus-field" onClick={() => ref.current?.focus()}>
          Focus the field
        </button>
      </>
    );
  },
  name: "using ref to control focus",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await userEvent.click(canvas.getByTestId("focus-field"));
    await waitFor(() => expect(field).toHaveFocus());
    // Focusing via ref also opens the panel (open-on-focus).
    await expect(await screen.findByTestId("scroll-time-picker-panel")).toBeInTheDocument();
  },
};

// Typing fills the mask, keeps the colon, and fires onInputChange per keystroke. The panel opened
// on focus and stays open while typing (focus-driven redesign — panel and typing coexist).
const typingOnInputChange = fn();
export const TypingKeepsColon = {
  render: () => <ScrollTimePicker labelText="Time" onChange={fn()} onInputChange={typingOnInputChange} />,
  name: "typing keeps the colon and keeps the panel open",
  // Behavioural, not a picture: the field must start empty to test typing into the mask, and the
  // panel it opens seeds the dials from `new Date()` — a fixed value would defeat the test, so the
  // snapshot would drift every run. Snapshot disabled.
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing digits fills the mask with the colon present", async () => {
      await userEvent.type(field, "930");
      await expect(field).toHaveValue("09:30");
    });
    await step("fires onInputChange and keeps the panel open", async () => {
      await expect(typingOnInputChange).toHaveBeenCalled();
      await expect(await screen.findByTestId("scroll-time-picker-panel")).toBeInTheDocument();
    });
  },
};

// Editing mid-string keeps the caret where the user typed instead of jumping to the end.
export const TypingKeepsCaretPosition = {
  render: () => <ScrollTimePicker labelText="Time" onChange={fn()} onInputChange={fn()} />,
  name: "typing keeps the caret position",
  // Behavioural, not a picture: the field must start empty to test caret handling while typing, and
  // the panel it opens seeds the dials from `new Date()` — a fixed value would defeat the test, so
  // the snapshot would drift every run. Snapshot disabled.
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input") as HTMLInputElement;
    await step("fill the field", async () => {
      await userEvent.type(field, "1234");
      await expect(field).toHaveValue("12:34");
    });
    await step("inserting a digit mid-string keeps the caret after the typed digit", async () => {
      // Caret between "1" and "2", then type "9": "12:34" -> "19:23", caret stays after the "9".
      await userEvent.type(field, "9", { initialSelectionStart: 1, initialSelectionEnd: 1 });
      await expect(field).toHaveValue("19:23");
      await expect(field.selectionStart).toBe(2);
      await expect(field.selectionEnd).toBe(2);
    });
  },
};

// Backspacing a digit is field-local: it blanks that digit's slot and leaves the other
// field untouched, instead of collapsing every digit into one stream and re-flowing it.
export const BackspaceIsFieldLocal = {
  render: () => <ScrollTimePicker labelText="Time" onChange={fn()} onInputChange={fn()} />,
  name: "backspace is field-local",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input") as HTMLInputElement;
    await step("fill the field", async () => {
      await userEvent.type(field, "1530");
      await expect(field).toHaveValue("15:30");
    });
    await step("cursor after the hours ones-digit, Backspace blanks only that digit", async () => {
      // Caret between "5" and ":", then Backspace: "15:30" -> "1-:30", minutes untouched.
      field.setSelectionRange(2, 2);
      await userEvent.keyboard("{Backspace}");
      await expect(field).toHaveValue("1-:30");
    });
    await step("committing keeps the digit in its column: 1- reads as 10, not 01", async () => {
      await userEvent.tab();
      await expect(field).toHaveValue("10:30");
    });
  },
};

// Blur commits and normalizes the partial input; onChange gets the normalized value.
const blurOnChange = fn();
export const BlurCommits = {
  render: () => <ScrollTimePicker labelText="Time" onChange={blurOnChange} />,
  name: "blur commits and normalizes",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing a single hour digit then blurring normalizes to HH:mm", async () => {
      await userEvent.type(field, "9");
      await userEvent.tab();
      await expect(field).toHaveValue("09:00");
      await expect(blurOnChange).toHaveBeenLastCalledWith("09:00");
    });
  },
};

// Enter commits the typed value.
const enterCommitsOnChange = fn();
export const EnterCommits = {
  render: () => <ScrollTimePicker labelText="Time" onChange={enterCommitsOnChange} />,
  name: "enter commits",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing a full time then Enter commits it and closes the panel", async () => {
      await userEvent.type(field, "1430");
      await userEvent.keyboard("{Enter}");
      await expect(field).toHaveValue("14:30");
      await expect(enterCommitsOnChange).toHaveBeenLastCalledWith("14:30");
      // Enter in the field now also closes the panel (the field keeps focus + stays editable).
      await expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument();
    });
  },
};

// Disabled cannot open the panel or accept typing.
export const Disabled = {
  render: () => <ScrollTimePicker labelText="Time" disabled onChange={fn()} />,
  name: "disabled",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    const openButton = canvas.getByTestId("scroll-time-picker-open");
    await step("field is disabled and the clock button cannot open the panel", async () => {
      await expect(field).toBeDisabled();
      await userEvent.click(openButton);
      await expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument();
    });
  },
};

// The clock button parses the partial input on open and seeds the dials.
const clockOpenOnChange = fn();
export const ClockOpensAndParses = {
  render: () => <ScrollTimePicker labelText="Time" onChange={clockOpenOnChange} />,
  name: "clock opens and parses on open",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing a partial hour then opening normalizes the field and seeds the dials", async () => {
      await userEvent.type(field, "9");
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      const panel = await screen.findByTestId("scroll-time-picker-panel");
      await expect(panel).toBeInTheDocument();
      // Normalize-on-handoff: the explicit clock gesture commits the typed partial so the field
      // matches the dials (plain focus never would). onChange fires on this deliberate action.
      await expect(field).toHaveValue("09:00");
      await expect(clockOpenOnChange).toHaveBeenLastCalledWith("09:00");
      await expect(field).toHaveAttribute("readonly");
      await expect(screen.getByTestId("scroll-time-cell-hour-09")).toHaveAttribute("aria-selected", "true");
      await expect(screen.getByTestId("scroll-time-cell-minute-00")).toHaveAttribute("aria-selected", "true");
    });
  },
};

// Focusing the field already opens the panel; ArrowDown then hands focus off to a listbox column.
export const ArrowDownOpens = {
  // Fixed time, NOT `new Date()`: the panel ends open, and an empty field seeds the dials from the
  // current time, so the snapshot would drift every run.
  render: () => <ScrollTimePicker labelText="Time" defaultValue="13:37" onChange={fn()} />,
  name: "arrow down moves focus into the columns",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("focus opens the panel; ArrowDown then focuses a listbox", async () => {
      await userEvent.click(field);
      await screen.findByTestId("scroll-time-picker-panel"); // already open on focus, before ArrowDown
      await expect(field).not.toHaveAttribute("readonly");
      await userEvent.keyboard("{ArrowDown}");
      await waitFor(() => expect(document.activeElement).toHaveAttribute("role", "listbox"));
    });
  },
};

// read-only now tracks "focus is in the columns," not "panel open." Entering the columns makes the
// field read-only so arrow keys drive the dial instead of the text.
export const ReadOnlyWhileColumnsFocused = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="10:00" onChange={fn()} />,
  name: "read-only while focus is in the columns",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("entering the columns makes the field read-only and arrows drive the dial", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await waitFor(() => expect(document.activeElement).toHaveAttribute("role", "listbox"));
      await expect(field).toHaveAttribute("readonly");
      await userEvent.keyboard("{ArrowDown}");
      await expect(screen.getByTestId("scroll-time-cell-hour-11")).toHaveAttribute("aria-selected", "true");
    });
  },
};

// Opening an empty field seeds the dials to "now" but fires no onChange.
const emptyOpenOnChange = fn();
export const EmptyOpenSeedsNow = {
  render: () => <ScrollTimePicker labelText="Time" onChange={emptyOpenOnChange} />,
  name: "empty open seeds now without onChange",
  // Behavioural, not a picture: the empty field is the whole point (it seeds the open dials from
  // `new Date()`), so the snapshot would drift every run. Snapshot disabled.
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opening an empty field selects some time and does not commit", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      const hourColumn = screen.getByTestId("scroll-time-column-hour");
      await expect(within(hourColumn).getAllByRole("option", { selected: true })).toHaveLength(1);
      await expect(emptyOpenOnChange).not.toHaveBeenCalled();
    });
  },
};

// Clicking outside closes the panel.
export const OutsideClickCloses = {
  render: () => (
    <>
      <ScrollTimePicker labelText="Time" onChange={fn()} />
      <button type="button" data-testid="outside-target">
        outside
      </button>
    </>
  ),
  name: "outside click closes",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("clicking an outside element dismisses the panel", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.click(canvas.getByTestId("outside-target"));
      await waitFor(() => expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument());
    });
  },
};

// A mouse round-trip from the columns back to the field re-enables typing while the panel stays
// open (the panel and typing coexist; clicking the field no longer closes it).
export const ClickFieldReturnsToEditable = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="10:00" onChange={fn()} />,
  name: "clicking the field returns from columns to editable",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("clicking the field while focus is in the columns re-enables typing, panel stays open", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open")); // enterColumns
      const panel = await screen.findByTestId("scroll-time-picker-panel");
      await waitFor(() => expect(field).toHaveAttribute("readonly")); // region: columns
      await userEvent.click(field);
      await expect(panel).toBeInTheDocument(); // still open
      await expect(field).not.toHaveAttribute("readonly"); // region: field
      await expect(field).toHaveFocus();
    });
  },
};

// Escape reverts the draft to the value at open and returns focus to the field.
const escapeRevertsOnChange = fn();
export const EscapeReverts = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="10:00" onChange={escapeRevertsOnChange} />,
  name: "escape reverts and refocuses",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("changing a dial then pressing Escape reverts and refocuses the field", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await waitFor(() => expect(screen.getByTestId("scroll-time-column-hour")).toHaveFocus());
      await userEvent.keyboard("{ArrowDown}");
      await expect(field).toHaveValue("11:00");
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument());
      await expect(field).toHaveValue("10:00");
      await waitFor(() => expect(field).toHaveFocus());
    });
  },
};

// Clicking a cell commits the value and keeps the panel open.
const clickCellOnChange = fn();
export const ClickCellCommits = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={clickCellOnChange} />,
  name: "clicking a cell commits and stays open",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("clicking the 09 hour cell commits 09:00 with the panel still open", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      const panel = await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.click(screen.getByTestId("scroll-time-cell-hour-09"));
      await expect(screen.getByTestId("scroll-time-cell-hour-09")).toHaveAttribute("aria-selected", "true");
      await expect(panel).toBeInTheDocument();
      await expect(field).toHaveValue("09:00");
      await expect(clickCellOnChange).toHaveBeenLastCalledWith("09:00");
    });
  },
};

// ArrowUp wraps past the first option to the last.
const arrowWrapOnChange = fn();
export const ArrowWrap = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={arrowWrapOnChange} />,
  name: "arrow up wraps",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Home then ArrowUp wraps the hour column to 23", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await waitFor(() => expect(screen.getByTestId("scroll-time-column-hour")).toHaveFocus());
      await userEvent.keyboard("{Home}");
      await userEvent.keyboard("{ArrowUp}");
      const hourColumn = screen.getByTestId("scroll-time-column-hour");
      await expect(hourColumn).toHaveAttribute("aria-activedescendant", "scroll-time-hour-23");
      await expect(screen.getByTestId("scroll-time-cell-hour-23")).toHaveAttribute("aria-selected", "true");
      await expect(arrowWrapOnChange).toHaveBeenLastCalledWith("23:00");
    });
  },
};

// Left/Right move focus between columns, no-op at the ends.
export const ArrowMovesColumns = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={fn()} />,
  name: "left/right move between columns",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("ArrowRight moves to the minute column and no-ops at the last column", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await waitFor(() => expect(screen.getByTestId("scroll-time-column-hour")).toHaveFocus());
      await userEvent.keyboard("{ArrowRight}");
      await waitFor(() => expect(screen.getByTestId("scroll-time-column-minute")).toHaveFocus());
      await userEvent.keyboard("{ArrowRight}");
      await expect(screen.getByTestId("scroll-time-column-minute")).toHaveFocus();
    });
  },
};

// Home/End jump to the first/last option.
const homeEndOnChange = fn();
export const HomeEnd = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={homeEndOnChange} />,
  name: "home and end",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("End selects the last hour and Home the first", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await waitFor(() => expect(screen.getByTestId("scroll-time-column-hour")).toHaveFocus());
      await userEvent.keyboard("{End}");
      await expect(screen.getByTestId("scroll-time-cell-hour-23")).toHaveAttribute("aria-selected", "true");
      await expect(homeEndOnChange).toHaveBeenLastCalledWith("23:00");
      await userEvent.keyboard("{Home}");
      await expect(screen.getByTestId("scroll-time-cell-hour-00")).toHaveAttribute("aria-selected", "true");
      await expect(homeEndOnChange).toHaveBeenLastCalledWith("00:00");
    });
  },
};

// Enter commits and closes, returning focus to the field.
const enterClosesOnChange = fn();
export const EnterCommitsAndCloses = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={enterClosesOnChange} />,
  name: "enter commits and closes the panel",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("changing the minute then Enter commits, closes and refocuses", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await waitFor(() => expect(screen.getByTestId("scroll-time-column-hour")).toHaveFocus());
      await userEvent.keyboard("{ArrowRight}");
      await waitFor(() => expect(screen.getByTestId("scroll-time-column-minute")).toHaveFocus());
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");
      await waitFor(() => expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument());
      await expect(field).toHaveValue("00:01");
      await waitFor(() => expect(field).toHaveFocus());
      await expect(enterClosesOnChange).toHaveBeenLastCalledWith("00:01");
    });
  },
};

// Controlled: a dial commit updates the parent, and an external value change re-selects.
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("00:00");
    return (
      <>
        <ScrollTimePicker labelText="Time" value={value} onChange={setValue} />
        <div data-testid="parent-value">{value}</div>
        <button type="button" data-testid="set-external" onClick={() => setValue("15:45")}>
          set 15:45
        </button>
      </>
    );
  },
  name: "controlled",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("a dial commit flows up to the controlling parent", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.click(screen.getByTestId("scroll-time-cell-hour-09"));
      await expect(field).toHaveValue("09:00");
      await expect(canvas.getByTestId("parent-value")).toHaveTextContent("09:00");
    });
    await step("an external value change re-selects the dials", async () => {
      await userEvent.click(canvas.getByTestId("set-external"));
      await waitFor(() => expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument());
      await expect(field).toHaveValue("15:45");
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await expect(screen.getByTestId("scroll-time-cell-hour-15")).toHaveAttribute("aria-selected", "true");
      await expect(screen.getByTestId("scroll-time-cell-minute-45")).toHaveAttribute("aria-selected", "true");
    });
  },
};

// Controlled invariant: the display always reflects the value prop. Clearing the field never
// commits (an empty field emits no onChange), so on blur the display must snap back to the
// controlled value rather than diverge to blank — otherwise re-applying the SAME value can't
// restore it, because the sync effect only reacts to value *changes*. (Regression: DateTimePicker
// controlled story — clear the time, then set the parent to the same value.)
export const ControlledClearSnapsBack = {
  render: () => {
    const [value, setValue] = useState("18:45");
    return (
      <>
        <ScrollTimePicker labelText="Time" value={value} onChange={setValue} />
        <button type="button" data-testid="set-same" onClick={() => setValue("18:45")}>
          set 18:45 (same)
        </button>
      </>
    );
  },
  name: "controlled clear snaps back to the value prop",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("clearing then blurring snaps the display back to the controlled value", async () => {
      await userEvent.clear(field);
      await userEvent.tab();
      await expect(field).toHaveValue("18:45");
    });
    await step("re-applying the same value keeps the display correct", async () => {
      await userEvent.click(canvas.getByTestId("set-same"));
      await expect(field).toHaveValue("18:45");
    });
  },
};

// A Date value with utc reads the UTC wall-clock time.
export const WithDateValueUTC = {
  render: () => (
    <ScrollTimePicker labelText="Time" value={new Date(Date.UTC(2020, 0, 1, 23, 30))} utc onChange={fn()} />
  ),
  name: "with a UTC Date value",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("the field shows the UTC time and the dials match", async () => {
      await expect(field).toHaveValue("23:30");
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await expect(screen.getByTestId("scroll-time-cell-hour-23")).toHaveAttribute("aria-selected", "true");
      await expect(screen.getByTestId("scroll-time-cell-minute-30")).toHaveAttribute("aria-selected", "true");
    });
  },
};

// The minute column always spans the full 00..59 range at step 1.
export const FullMinuteRange = {
  render: () => <ScrollTimePicker labelText="Time" value="09:32" onChange={fn()} />,
  name: "full minute range",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("the minute column has all 60 options and the current one is selected", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      const minuteColumn = screen.getByTestId("scroll-time-column-minute");
      await expect(within(minuteColumn).getAllByRole("option")).toHaveLength(60);
      await expect(screen.getByTestId("scroll-time-cell-minute-32")).toHaveAttribute("aria-selected", "true");
    });
  },
};

// An inline onChange that also setStates must not loop.
const inlineCallbackSpy = fn();
export const DoesNotLoopWithInlineCallback = {
  render: () => {
    const [value, setValue] = useState("00:00");
    const [, setTick] = useState(0);
    return (
      <ScrollTimePicker
        labelText="Time"
        value={value}
        onChange={(next) => {
          inlineCallbackSpy(next);
          setValue(next);
          setTick((tick) => tick + 1);
        }}
      />
    );
  },
  name: "does not loop with an inline onChange",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("committing a dial value fires onChange once and then stays quiescent", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.click(screen.getByTestId("scroll-time-cell-hour-09"));
      const before = inlineCallbackSpy.mock.calls.length;
      await new Promise((resolve) => setTimeout(resolve, 200));
      const after = inlineCallbackSpy.mock.calls.length;
      // A loop would keep re-firing onChange in this quiet window; post-fix it stays put.
      expect(after - before).toBeLessThan(3);
    });
  },
};

// Scrolling a column settles on the nearest cell and commits it.
const scrollSnapOnChange = fn();
export const ScrollSnapSettles = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={scrollSnapOnChange} />,
  name: "scroll snap settles",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("scrolling the minute column commits the settled value", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      const minuteColumn = screen.getByTestId("scroll-time-column-minute");
      minuteColumn.scrollTop = indexToScrollTop(5, CELL_HEIGHT);
      fireEvent.scroll(minuteColumn);
      await waitFor(() =>
        expect(screen.getByTestId("scroll-time-cell-minute-05")).toHaveAttribute("aria-selected", "true"),
      );
      await waitFor(() => expect(scrollSnapOnChange).toHaveBeenLastCalledWith("00:05"));
    });
  },
};

// showSeconds adds a third column and a :ss field.
const withSecondsOnChange = fn();
export const WithSeconds = {
  // Fixed time, NOT `new Date()`: the panel ends open, and an empty field seeds the hour/minute
  // dials from the current time, so the snapshot would drift every run.
  render: () => (
    <ScrollTimePicker labelText="Time" showSeconds defaultValue="12:34:56" onChange={withSecondsOnChange} />
  ),
  name: "with seconds",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input") as HTMLInputElement;
    await step("the mask has three fields and committing produces HH:mm:ss", async () => {
      await expect(field).toHaveAttribute("placeholder", "--:--:--");
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await expect(screen.getAllByRole("listbox")).toHaveLength(3);
      await userEvent.click(screen.getByTestId("scroll-time-cell-second-05"));
      await waitFor(() => expect(field.value).toMatch(/^\d{2}:\d{2}:05$/));
      expect(withSecondsOnChange.mock.calls.at(-1)?.[0]).toMatch(/^\d{2}:\d{2}:05$/);
    });
  },
};

// Exactly one option is selected per column.
export const SingleSelectionPerColumn = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="09:30" onChange={fn()} />,
  name: "single selection per column",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("each column has exactly one selected option", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      const hourColumn = screen.getByTestId("scroll-time-column-hour");
      const minuteColumn = screen.getByTestId("scroll-time-column-minute");
      await expect(within(hourColumn).getAllByRole("option", { selected: true })).toHaveLength(1);
      await expect(within(minuteColumn).getAllByRole("option", { selected: true })).toHaveLength(1);
    });
  },
};

// Focus opens the panel while the field stays editable and focused (not moved into the columns).
const focusOpensOnChange = fn();
export const FocusOpensPanel = {
  // Fixed time, NOT `new Date()`: focusing opens the panel and an empty field seeds the dials from
  // the current time, so the snapshot would drift every run. onChange still never fires on focus.
  render: () => <ScrollTimePicker labelText="Time" defaultValue="13:37" onChange={focusOpensOnChange} />,
  name: "focus opens the panel and keeps the field editable",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("clicking the field opens the panel; focus and editability stay in the field", async () => {
      await userEvent.click(field);
      await screen.findByTestId("scroll-time-picker-panel");
      await expect(field).toHaveFocus();
      await expect(field).not.toHaveAttribute("readonly");
      await expect(document.activeElement).toBe(field); // focus stays in the field, not a listbox
      await expect(focusOpensOnChange).not.toHaveBeenCalled();
    });
  },
};

// The sharpest proof the panel does NOT sync to typing: the dials seed once (on focus) and then
// stay put while the field text changes.
export const TypingKeepsPanelOpenDialsStale = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="10:00" onChange={fn()} onInputChange={fn()} />,
  name: "typing keeps the panel open and the dials stale",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("dials seed to 10:00 on focus, then stay put while typing 07:30", async () => {
      await userEvent.click(field); // dials seed to 10:00
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.clear(field);
      await userEvent.type(field, "0730");
      await expect(field).toHaveValue("07:30");
      await expect(screen.getByTestId("scroll-time-picker-panel")).toBeInTheDocument();
      await expect(screen.getByTestId("scroll-time-cell-hour-10")).toHaveAttribute("aria-selected", "true");
      await expect(screen.getByTestId("scroll-time-cell-hour-07")).toHaveAttribute("aria-selected", "false");
    });
  },
};

// Commit + close fire only when focus leaves the whole widget, not when moving field↔columns.
const blurOutsideSpy = fn();
export const BlurOutsideCommitsAndCloses = {
  render: () => (
    <>
      <ScrollTimePicker labelText="Time" onChange={blurOutsideSpy} />
      <button type="button" data-testid="outside">
        outside
      </button>
    </>
  ),
  name: "blurring outside the widget commits and closes",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing then clicking an outside element commits 09:00 and closes", async () => {
      await userEvent.type(field, "9"); // focus opens the panel
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.click(canvas.getByTestId("outside"));
      await expect(field).toHaveValue("09:00");
      await expect(blurOutsideSpy).toHaveBeenLastCalledWith("09:00");
      await waitFor(() => expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument());
    });
  },
};

// Open-on-focus must never mutate or commit an empty field — it only seeds the dials to "now".
const focusEmptySpy = fn();
export const FocusDoesNotCommitEmpty = {
  render: () => <ScrollTimePicker labelText="Time" onChange={focusEmptySpy} />,
  name: "focus never commits or clears an empty field",
  // Behavioural, not a picture: the empty field is the whole point (the play asserts the value stays
  // ""), and the panel it opens seeds the dials from `new Date()`, so the snapshot would drift every
  // run. Snapshot disabled.
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("focusing an empty field opens the panel and seeds the dials but commits nothing", async () => {
      await userEvent.click(field);
      await screen.findByTestId("scroll-time-picker-panel");
      await expect(field).toHaveValue(""); // not normalized, not cleared to a seeded value
      await expect(focusEmptySpy).not.toHaveBeenCalled();
      const hourColumn = screen.getByTestId("scroll-time-column-hour");
      await expect(within(hourColumn).getAllByRole("option", { selected: true })).toHaveLength(1); // seeded to "now"
    });
  },
};

// Escape closes and refocuses the field without instantly reopening (the reopen guard); a later
// keystroke reopens the panel.
export const TypingReopensAfterEscape = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="10:00" onChange={fn()} />,
  name: "typing reopens the panel after Escape",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("Escape closes and refocuses the field without reopening", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open")); // enterColumns, focus in columns
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument());
      await waitFor(() => expect(field).toHaveFocus()); // refocused, NOT reopened (guard held)
    });
    await step("typing then reopens the panel", async () => {
      await userEvent.type(field, "0");
      await expect(await screen.findByTestId("scroll-time-picker-panel")).toBeInTheDocument();
    });
  },
};
