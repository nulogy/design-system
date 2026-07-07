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

// B24 — on open, each column is scrolled so its selected value sits under the highlight band.
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
        <ScrollTimePicker labelText="Time" ref={ref} onChange={fn()} />
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
  },
};

// B1 — typing fills the mask, keeps the colon, and fires onInputChange per keystroke; no panel.
const b1OnInputChange = fn();
export const TypingKeepsColon = {
  render: () => <ScrollTimePicker labelText="Time" onChange={fn()} onInputChange={b1OnInputChange} />,
  name: "typing keeps the colon",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing digits fills the mask with the colon present", async () => {
      await userEvent.type(field, "930");
      await expect(field).toHaveValue("09:30");
    });
    await step("fires onInputChange without opening a panel", async () => {
      await expect(b1OnInputChange).toHaveBeenCalled();
      await expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument();
    });
  },
};

// B1b — editing mid-string keeps the caret where the user typed instead of jumping to the end.
export const TypingKeepsCaretPosition = {
  render: () => <ScrollTimePicker labelText="Time" onChange={fn()} onInputChange={fn()} />,
  name: "typing keeps the caret position",
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

// B2 — blur commits and normalizes the partial input; onChange gets the normalized value.
const b2OnChange = fn();
export const BlurCommits = {
  render: () => <ScrollTimePicker labelText="Time" onChange={b2OnChange} />,
  name: "blur commits and normalizes",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing a single hour digit then blurring normalizes to HH:mm", async () => {
      await userEvent.type(field, "9");
      await userEvent.tab();
      await expect(field).toHaveValue("09:00");
      await expect(b2OnChange).toHaveBeenLastCalledWith("09:00");
    });
  },
};

// B3 — Enter commits the typed value.
const b3OnChange = fn();
export const EnterCommits = {
  render: () => <ScrollTimePicker labelText="Time" onChange={b3OnChange} />,
  name: "enter commits",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing a full time then Enter commits it", async () => {
      await userEvent.type(field, "1430");
      await userEvent.keyboard("{Enter}");
      await expect(field).toHaveValue("14:30");
      await expect(b3OnChange).toHaveBeenLastCalledWith("14:30");
    });
  },
};

// B18 — disabled cannot open the panel or accept typing.
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

// B4 — the clock button parses the partial input on open and seeds the dials.
const b4OnChange = fn();
export const ClockOpensAndParses = {
  render: () => <ScrollTimePicker labelText="Time" onChange={b4OnChange} />,
  name: "clock opens and parses on open",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing a partial hour then opening normalizes the field and seeds the dials", async () => {
      await userEvent.type(field, "9");
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      const panel = await screen.findByTestId("scroll-time-picker-panel");
      await expect(panel).toBeInTheDocument();
      await expect(field).toHaveValue("09:00");
      await expect(field).toHaveAttribute("readonly");
      await expect(screen.getByTestId("scroll-time-cell-hour-09")).toHaveAttribute("aria-selected", "true");
      await expect(screen.getByTestId("scroll-time-cell-minute-00")).toHaveAttribute("aria-selected", "true");
    });
  },
};

// B5 — ArrowDown on the focused field opens the panel and moves focus to a listbox column.
export const ArrowDownOpens = {
  render: () => <ScrollTimePicker labelText="Time" onChange={fn()} />,
  name: "arrow down opens",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("ArrowDown opens the panel and focuses a listbox", async () => {
      await userEvent.click(field);
      await userEvent.keyboard("{ArrowDown}");
      await screen.findByTestId("scroll-time-picker-panel");
      await waitFor(() => expect(document.activeElement).toHaveAttribute("role", "listbox"));
    });
  },
};

// B6 — the field is read-only while the panel is open.
export const ReadOnlyWhileOpen = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="10:00" onChange={fn()} />,
  name: "read-only while open",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("typing into the field while open does nothing", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await expect(field).toHaveAttribute("readonly");
      await userEvent.type(field, "5").catch(() => {});
      await expect(field).toHaveValue("10:00");
    });
  },
};

// B7 — opening an empty field seeds the dials to "now" but fires no onChange.
const b7OnChange = fn();
export const EmptyOpenSeedsNow = {
  render: () => <ScrollTimePicker labelText="Time" onChange={b7OnChange} />,
  name: "empty open seeds now without onChange",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opening an empty field selects some time and does not commit", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      const hourColumn = screen.getByTestId("scroll-time-column-hour");
      await expect(within(hourColumn).getAllByRole("option", { selected: true })).toHaveLength(1);
      await expect(b7OnChange).not.toHaveBeenCalled();
    });
  },
};

// B8 — clicking outside closes the panel.
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

// B9 — clicking the read-only field closes the panel back into type mode.
export const ClickFieldClosesToTypeMode = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="10:00" onChange={fn()} />,
  name: "clicking the field closes to type mode",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByTestId("scroll-time-picker-input");
    await step("clicking the field closes the panel and makes it editable", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.click(field);
      await waitFor(() => expect(screen.queryByTestId("scroll-time-picker-panel")).not.toBeInTheDocument());
      await expect(field).not.toHaveAttribute("readonly");
    });
  },
};

// B10 — Escape reverts the draft to the value at open and returns focus to the field.
const b10OnChange = fn();
export const EscapeReverts = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="10:00" onChange={b10OnChange} />,
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

// B11 — clicking a cell commits the value and keeps the panel open.
const b11OnChange = fn();
export const ClickCellCommits = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={b11OnChange} />,
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
      await expect(b11OnChange).toHaveBeenLastCalledWith("09:00");
    });
  },
};

// B12 — ArrowUp wraps past the first option to the last.
const b12OnChange = fn();
export const ArrowWrap = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={b12OnChange} />,
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
      await expect(b12OnChange).toHaveBeenLastCalledWith("23:00");
    });
  },
};

// B13 — Left/Right move focus between columns, no-op at the ends.
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

// B14 — Home/End jump to the first/last option.
const b14OnChange = fn();
export const HomeEnd = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={b14OnChange} />,
  name: "home and end",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("End selects the last hour and Home the first", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await waitFor(() => expect(screen.getByTestId("scroll-time-column-hour")).toHaveFocus());
      await userEvent.keyboard("{End}");
      await expect(screen.getByTestId("scroll-time-cell-hour-23")).toHaveAttribute("aria-selected", "true");
      await expect(b14OnChange).toHaveBeenLastCalledWith("23:00");
      await userEvent.keyboard("{Home}");
      await expect(screen.getByTestId("scroll-time-cell-hour-00")).toHaveAttribute("aria-selected", "true");
      await expect(b14OnChange).toHaveBeenLastCalledWith("00:00");
    });
  },
};

// B15 — Enter commits and closes, returning focus to the field.
const b15OnChange = fn();
export const EnterCommitsAndCloses = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={b15OnChange} />,
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
      await expect(b15OnChange).toHaveBeenLastCalledWith("00:01");
    });
  },
};

// B16 — controlled: a dial commit updates the parent, and an external value change re-selects.
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

// B17 — a Date value with utc reads the UTC wall-clock time.
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

// B20 — the minute column always spans the full 00..59 range at step 1.
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

// B22 — an inline onChange that also setStates must not loop.
const b22Spy = fn();
export const DoesNotLoopWithInlineCallback = {
  render: () => {
    const [value, setValue] = useState("00:00");
    const [, setTick] = useState(0);
    return (
      <ScrollTimePicker
        labelText="Time"
        value={value}
        onChange={(next) => {
          b22Spy(next);
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
      const before = b22Spy.mock.calls.length;
      await new Promise((resolve) => setTimeout(resolve, 200));
      const after = b22Spy.mock.calls.length;
      // A loop would keep re-firing onChange in this quiet window; post-fix it stays put.
      expect(after - before).toBeLessThan(3);
    });
  },
};

// B21 — scrolling a column settles on the nearest cell and commits it.
const b21OnChange = fn();
export const ScrollSnapSettles = {
  render: () => <ScrollTimePicker labelText="Time" defaultValue="00:00" onChange={b21OnChange} />,
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
      await waitFor(() => expect(b21OnChange).toHaveBeenLastCalledWith("00:05"));
    });
  },
};

// B19 — showSeconds adds a third column and a :ss field.
const b19OnChange = fn();
export const WithSeconds = {
  render: () => <ScrollTimePicker labelText="Time" showSeconds onChange={b19OnChange} />,
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
      expect(b19OnChange.mock.calls.at(-1)?.[0]).toMatch(/^\d{2}:\d{2}:05$/);
    });
  },
};

// B23 — exactly one option is selected per column.
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
