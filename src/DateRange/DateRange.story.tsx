import { useRef, useState } from "react";
import { action } from "storybook/actions";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { Box, Button, Flex, PrimaryButton } from "..";
import DateRange from "./DateRange";

export default {
  title: "Components/DateRange",
};

export const Default = () => (
  <DateRange
    p="x3"
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

export const DefaultStartAndEndDate = {
  render: () => (
    <DateRange
      defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
      defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
    />
  ),
  name: "default start and end date",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("shows start date marker in calendar when end date input is clicked", async () => {
      await userEvent.click(canvas.getByLabelText("Select an end date"));
      await waitFor(() => expect(document.querySelector(".nds-datepicker-day--start-date")).toBeInTheDocument());
    });
    await step("shows an error when start date is set after end date", async () => {
      await userEvent.click(canvas.getByLabelText("Select a start date"));
      // Both pickers portal into the same node and the end-date calendar from the
      // previous step can stay open (in Chromatic's animated capture, click-outside
      // and Escape don't reliably close it — local runs disable animations and mask
      // this). Identify the start-date calendar by its selected day (Jan 1) rather
      // than DOM position, then click day 8 within it — clicking the first match
      // would otherwise land in the lingering end-date calendar.
      const day8 = await waitFor(() => {
        const startCalendar = [...document.querySelectorAll(".react-datepicker")].find((calendar) =>
          calendar.querySelector(".react-datepicker__day--001.react-datepicker__day--selected"),
        );
        const el = startCalendar?.querySelector(".react-datepicker__day--008");
        expect(el).toBeInTheDocument();
        return el as HTMLElement;
      });
      await userEvent.click(day8);
      await waitFor(() => expect(canvas.getByText("End date is before start date")).toBeVisible());
    });
  },
};

export const DisabledRangeValidation = () => (
  <DateRange
    disableRangeValidation
    defaultEndDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultStartDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

export const WithCustomError = () => (
  <DateRange
    errorMessage="This range conflicts with another range"
    defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

export const CustomizingInputProps = () => (
  <DateRange
    startDateInputProps={{
      placeholder: "From (Mon YYYY)",
      inputWidth: "280px",
      labelText: "From",
      error: true,
    }}
    endDateInputProps={{
      placeholder: "To (Mon YYYY)",
      inputWidth: "260px",
      labelText: "To",
    }}
    labelProps={{ labelText: "" }}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
    errorMessage="Start date is required."
  />
);

export const Disabled = () => {
  const NON_BREAKING_SPACE = "\u00A0";

  return (
    <DateRange
      startDateInputProps={{
        placeholder: "From (Mon YYYY)",
        labelText: "From",
        disabled: true,
      }}
      endDateInputProps={{
        placeholder: "To (Mon YYYY)",
        labelText: "To",
        disabled: true,
      }}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
      labelProps={{ labelText: "" }}
      showTimes
      endTimeProps={{
        labelText: NON_BREAKING_SPACE,
        disabled: true,
      }}
      startTimeProps={{
        labelText: NON_BREAKING_SPACE,
        disabled: true,
      }}
    />
  );
};

export const IndividualInputError = () => (
  <DateRange
    errorMessage="Start date is required"
    startDateInputProps={{ required: true }}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

export const WithTimes = {
  render: () => (
    <DateRange
      defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
      defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
      showTimes
    />
  ),
  name: "with times",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("shows an error when start time is after end time on the same day", async () => {
      await userEvent.click(canvas.getByLabelText("Select a start date"));
      const day8Start = await waitFor(() => {
        const el = document.querySelector(".react-datepicker__day--008");
        expect(el).toBeInTheDocument();
        return el as HTMLElement;
      });
      await userEvent.click(day8Start);
      await userEvent.click(canvas.getByLabelText("Select a start time"));
      const startOptions = within(canvas.getByTestId("daterange-start-time")).getAllByTestId(/select-option/);
      await userEvent.click(startOptions[4]);
      await userEvent.click(canvas.getByLabelText("Select an end time"));
      const endOptions = within(canvas.getByTestId("daterange-end-time")).getAllByTestId(/select-option/);
      await userEvent.click(endOptions[3]);
      await userEvent.click(canvas.getByLabelText("Select an end date"));
      const day8End = await waitFor(() => {
        const el = document.querySelector(".react-datepicker__day--008");
        expect(el).toBeInTheDocument();
        return el as HTMLElement;
      });
      await userEvent.click(day8End);
      await waitFor(() => expect(canvas.getByText("End time is before start time")).toBeVisible());
    });
  },
};

export const CustomizingInputPropsWithTimes = () => (
  <DateRange
    startDateInputProps={{ placeholder: "From", inputWidth: "280px" }}
    endDateInputProps={{ placeholder: "To", inputWidth: "280px" }}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
    showTimes
  />
);

export const WithDefaultStartAndEndTimes = () => (
  <DateRange
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
    defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    showTimes
    defaultStartTime="03:30"
    defaultEndTime="13:30"
  />
);

export const WithTimeError = () => (
  <DateRange
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
    defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultEndDate={new Date("2019-07-05T05:00:00.000Z")}
    showTimes
    defaultStartTime="13:30"
    defaultEndTime="10:30"
  />
);

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const focusStartDate = () => {
    ref.current.dateRef1.focus();
  };
  const focusEndDate = () => {
    ref.current.dateRef2.focus();
  };
  const focusStartTime = () => {
    ref.current.timeRef1.focus();
  };
  const focusEndTime = () => {
    ref.current.timeRef2.focus();
  };

  return (
    <Flex flexDirection="column">
      <Box>
        <DateRange
          onRangeChange={action("range changed")}
          onStartDateChange={action("start date changed")}
          onEndDateChange={action("end date changed")}
          defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
          defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
          showTimes
          defaultStartTime="03:30"
          defaultEndTime="13:30"
          ref={ref}
        />
      </Box>
      <Flex>
        <Button onClick={focusStartDate}>Focus Start Date</Button>
        <PrimaryButton onClick={focusStartTime} ml="x2">
          Focus Start Time
        </PrimaryButton>
        <Button onClick={focusEndTime} ml="x2">
          Focus End Time
        </Button>
        <PrimaryButton onClick={focusEndDate} ml="x2">
          Focus End Date
        </PrimaryButton>
      </Flex>
    </Flex>
  );
};

// Regression test for the onRangeChange infinite loop (GO-11207). The wrapper passes a fresh
// inline callback every render that also setStates — the exact consumer pattern that used to
// re-fire the effect on every render and peg the CPU. The module-scoped spy is shared with
// the play() function, which measures how many times the callback fires in a quiet window.
const dateRangeLoopSpy = fn();
export const DoesNotLoopWithInlineCallback = {
  render: () => {
    const [, setTick] = useState(0);
    return (
      <DateRange
        onRangeChange={(value) => {
          dateRangeLoopSpy(value);
          setTick((tick) => tick + 1);
        }}
      />
    );
  },
  name: "does not loop with an inline onRangeChange",
  play: async () => {
    await waitFor(() => expect(dateRangeLoopSpy).toHaveBeenCalled());
    const before = dateRangeLoopSpy.mock.calls.length;
    await new Promise((resolve) => setTimeout(resolve, 200));
    const after = dateRangeLoopSpy.mock.calls.length;
    // Pre-fix the effect re-fired every render, so this quiet window captured hundreds of
    // calls (the loop was measured at ~1000 in 1.5s). Post-fix it fires once on mount and
    // then stays quiescent — no growth.
    expect(after - before).toBeLessThan(3);
  },
};

// Mount fire: the parent learns the initial/default range + validation error exactly once.
const mountFireSpy = fn();
export const FiresOnceOnMountWithDefaults = {
  render: () => (
    <DateRange
      defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
      defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
      onRangeChange={mountFireSpy}
    />
  ),
  name: "fires onRangeChange once on mount with defaults",
  play: async () => {
    await waitFor(() => expect(mountFireSpy).toHaveBeenCalledTimes(1));
    const payload = mountFireSpy.mock.calls[0][0];
    expect(payload.startDate).toEqual(new Date("2019-01-01T05:00:00.000Z"));
    expect(payload.endDate).toEqual(new Date("2019-01-05T05:00:00.000Z"));
    expect(payload.error).toBeUndefined();
  },
};

// Invalid defaults: an end date before the start date is reported in the mount payload's error.
const invalidDefaultsSpy = fn();
export const ReportsErrorForInvalidDefaultsOnMount = {
  render: () => (
    <DateRange
      defaultStartDate={new Date("2019-01-05T05:00:00.000Z")}
      defaultEndDate={new Date("2019-01-01T05:00:00.000Z")}
      onRangeChange={invalidDefaultsSpy}
    />
  ),
  name: "reports error for invalid defaults on mount",
  play: async () => {
    await waitFor(() => expect(invalidDefaultsSpy).toHaveBeenCalledTimes(1));
    expect(invalidDefaultsSpy.mock.calls[0][0].error).toBe("end date is before start date");
  },
};

// C1 behavior: toggling the display-only `showTimes` prop must NOT fire onRangeChange — the
// range didn't change. (Pre-refactor it fired because `showTimes` was in the effect deps.)
const toggleSpy = fn();
export const TogglingShowTimesDoesNotFire = {
  render: () => {
    const [showTimes, setShowTimes] = useState(false);
    return (
      <>
        <DateRange
          defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
          defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
          showTimes={showTimes}
          onRangeChange={toggleSpy}
        />
        <Button onClick={() => setShowTimes((value) => !value)}>Toggle times</Button>
      </>
    );
  },
  name: "toggling showTimes does not fire onRangeChange",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(toggleSpy).toHaveBeenCalledTimes(1)); // mount fire
    await userEvent.click(canvas.getByText("Toggle times"));
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(toggleSpy).toHaveBeenCalledTimes(1); // no extra fire for the toggle
  },
};
