import React from "react";
import { fireEvent } from "@testing-library/react";

import { TimeRange } from ".";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";

const openDropdown = (container, i = 0) => {
  fireEvent.focus(container.querySelectorAll("input")[i]);
  fireEvent.keyDown(container.querySelectorAll("input")[i], {
    key: "ArrowDown",
    code: 40,
  });
};

const selectTimeOption = (optionText, container, queryAllByText, i = 0) => {
  openDropdown(container, i);

  fireEvent.click(queryAllByText(optionText)[i]);
};

describe("TimeRange", () => {
  describe("range selection", () => {
    it("returns the selected range when the range changes", () => {
      const onRangeChange = jest.fn();
      const { container, queryAllByText } = renderWithNDSProvider(
        <TimeRange onRangeChange={onRangeChange} />
      );
      selectTimeOption("10:00 AM", container, queryAllByText);
      selectTimeOption("11:15 AM", container, queryAllByText, 1);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startTime).toBe("10:00");
      expect(latestCall.endTime).toBe("11:15");
      expect(latestCall.error).toBeUndefined();
    });
    it("shows an error if the range is invalid", () => {
      const onRangeChange = jest.fn();
      const { queryByText } = renderWithNDSProvider(
        <TimeRange
          onRangeChange={onRangeChange}
          defaultStartTime="12:00"
          defaultEndTime="05:00"
        />
      );
      expect(queryByText("end time is before start time")).not.toBeNull();
    });
    it("returns the start date when the start date changes", () => {
      const onStartTimeChange = jest.fn();
      const onEndTimeChange = jest.fn();
      const { container, queryAllByText } = renderWithNDSProvider(
        <TimeRange
          onStartTimeChange={onStartTimeChange}
          onEndTimeChange={onEndTimeChange}
        />
      );
      selectTimeOption("10:00 AM", container, queryAllByText);
      const onChangeCalls = onStartTimeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall).toBe("10:00 AM");
      expect(onEndTimeChange).not.toHaveBeenCalled();
    });
    it("returns the end time when the end time changes", () => {
      const onStartTimeChange = jest.fn();
      const onEndTimeChange = jest.fn();
      const { container, queryAllByText } = renderWithNDSProvider(
        <TimeRange
          onStartTimeChange={onStartTimeChange}
          onEndTimeChange={onEndTimeChange}
        />
      );
      selectTimeOption("11:00 AM", container, queryAllByText, 1);
      const onChangeCalls = onEndTimeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall).toBe("11:00 AM");
      expect(onStartTimeChange).not.toHaveBeenCalled();
    });
  });
});
