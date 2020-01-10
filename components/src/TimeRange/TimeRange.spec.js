import React from "react";
import { render } from "@testing-library/react";
import { TimeRange } from ".";
import { selectOption } from "../Select/Select.spec-utils";

describe("TimeRange", () => {
  describe("range selection", () => {
    it("returns the selected range when the range changes", () => {
      const onRangeChange = jest.fn();
      const { container, queryByText } = render(<TimeRange onRangeChange={onRangeChange} />);
      selectOption("10:00 AM", container, queryByText);
      selectOption("11:15 AM", container, queryByText, 1);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startTime).toBe("10:00");
      expect(latestCall.endTime).toBe("11:15");
      expect(latestCall.error).toBeUndefined();
    });
    it("shows an error if the range is invalid", () => {
      const onRangeChange = jest.fn();
      const { queryByText } = render(
        <TimeRange onRangeChange={onRangeChange} defaultStartTime="12:00" defaultEndTime="05:00" />
      );
      expect(queryByText("End time is before start time")).not.toBeNull();
    });
    it("returns the start date when the start date changes", () => {
      const onStartTimeChange = jest.fn();
      const onEndTimeChange = jest.fn();
      const { container, queryByText } = render(
        <TimeRange onStartTimeChange={onStartTimeChange} onEndTimeChange={onEndTimeChange} />
      );
      selectOption("10:00 AM", container, queryByText);
      const onChangeCalls = onStartTimeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall).toBe("10:00");
      expect(onEndTimeChange).not.toHaveBeenCalled();
    });
    it("returns the end time when the end time changes", () => {
      const onStartTimeChange = jest.fn();
      const onEndTimeChange = jest.fn();
      const { container, queryByText } = render(
        <TimeRange onStartTimeChange={onStartTimeChange} onEndTimeChange={onEndTimeChange} />
      );
      selectOption("11:00 AM", container, queryByText, 1);
      const onChangeCalls = onEndTimeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall).toBe("11:00");
      expect(onStartTimeChange).not.toHaveBeenCalled();
    });
  });
});
