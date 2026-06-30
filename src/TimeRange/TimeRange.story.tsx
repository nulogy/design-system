import { useRef, useState } from "react";
import { action } from "storybook/actions";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

import { Button, PrimaryButton } from "..";
import TimeRange from "./TimeRange";

export default {
  title: "Components/TimeRange",
};

export const Default = {
  render: () => (
    <TimeRange
      p="x3"
      onRangeChange={action("range changed")}
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ),

  name: "default",
};

export const DefaultSelections = {
  render: () => (
    <TimeRange
      onRangeChange={action("range changed")}
      defaultStartTime="12:00 AM"
      defaultEndTime="01:30 PM"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ),

  name: "default selections",
};

export const WithRangeValidation = {
  render: () => (
    <TimeRange
      onRangeChange={action("range changed")}
      defaultStartTime="12:00 AM"
      defaultEndTime="03:30 AM"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ),

  name: "with range validation",
};

export const WithMinAndMaxTimeRange = {
  render: () => (
    <TimeRange
      onRangeChange={action("range changed")}
      minTime="09:00"
      maxTime="18:30"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ),

  name: "with min and max time range",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("shows constrained end time options after selecting a start time", async () => {
      await userEvent.click(canvas.getByLabelText("Select a start time"));
      const startOptions = screen.getAllByTestId(/select-option/);
      await userEvent.click(startOptions[4]);
      const startInput = canvas.getAllByTestId("select-input")[0];
      await expect(startInput).toHaveValue("10:00 AM");
      await userEvent.click(canvas.getByLabelText("Select an end time"));
      const endOptions = screen.getAllByTestId(/select-option/);
      await expect(endOptions.length).toBeGreaterThan(0);
    });
  },
};

export const UsingRefToControlFocus = {
  render: () => {
    const ref = useRef(null);
    const handleClick = () => {
      ref.current.inputRef1.focus();
    };
    const handleClick2 = () => {
      ref.current.inputRef2.focus();
    };

    return (
      <>
        <TimeRange
          onRangeChange={action("range changed")}
          onStartTimeChange={action("start date changed")}
          onEndTimeChange={action("end date changed")}
          ref={ref}
        />
        <Button onClick={handleClick} ml="x2">
          Focus the First Input
        </Button>
        <PrimaryButton onClick={handleClick2} ml="x2">
          Focus the Second Input
        </PrimaryButton>
      </>
    );
  },

  name: "using ref to control focus",
};

// Regression test for the onRangeChange infinite loop (GO-11207) — mirrors the DateRange case.
// The wrapper passes a fresh inline callback every render that also setStates, the pattern that
// used to re-fire the effect on every render. The module-scoped spy is shared with the play()
// function, which measures how many times the callback fires in a quiet window.
const timeRangeLoopSpy = fn();
export const DoesNotLoopWithInlineCallback = {
  render: () => {
    const [, setTick] = useState(0);
    return (
      <TimeRange
        onRangeChange={(value) => {
          timeRangeLoopSpy(value);
          setTick((tick) => tick + 1);
        }}
      />
    );
  },
  name: "does not loop with an inline onRangeChange",
  play: async () => {
    await waitFor(() => expect(timeRangeLoopSpy).toHaveBeenCalled());
    const before = timeRangeLoopSpy.mock.calls.length;
    await new Promise((resolve) => setTimeout(resolve, 200));
    const after = timeRangeLoopSpy.mock.calls.length;
    // Pre-fix the effect re-fired every render, so this quiet window captured hundreds of
    // calls. Post-fix it fires once on mount and then stays quiescent — no growth.
    expect(after - before).toBeLessThan(3);
  },
};

// Mount fire: the parent learns the initial/default range + validation error exactly once.
// With defaults that are out of order, the error surfaces in the mount payload.
const timeMountFireSpy = fn();
export const FiresOnceOnMountWithDefaults = {
  render: () => <TimeRange defaultStartTime="13:30" defaultEndTime="10:30" onRangeChange={timeMountFireSpy} />,
  name: "fires onRangeChange once on mount with defaults",
  play: async () => {
    await waitFor(() => expect(timeMountFireSpy).toHaveBeenCalledTimes(1));
    expect(timeMountFireSpy.mock.calls[0][0].error).toBe("end time is before start time");
  },
};
