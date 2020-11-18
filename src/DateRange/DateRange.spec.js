import React from "react";
import { fireEvent } from "@testing-library/react";

import { DateRange } from ".";
import { resetDate, mockDate } from "../testing/mockUtils/mockDates";
import "../testing/matchers/toMatchDate";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";

const openDropdown = (container, i = 0) => {
  fireEvent.focus(container.querySelectorAll("input")[i]);
  fireEvent.keyDown(container.querySelectorAll("input")[i], {
    key: "ArrowDown",
    code: 40,
  });
};

const selectTimeOption = (optionText, container, queryAllByText, i) => {
  openDropdown(container, i);

  fireEvent.click(queryAllByText(optionText)[i - 1]);
};

describe("DateRange", () => {
  describe("range selection", () => {
    beforeEach(() => {
      mockDate("2020-02-01T11:01:58.135Z");
    });
    afterEach(() => {
      resetDate();
    });
    it("returns the selected range when the range changes", () => {
      const onRangeChange = jest.fn();
      const { container, getByLabelText } = renderWithNDSProvider(
        <DateRange onRangeChange={onRangeChange} />
      );
      const startDateInput = getByLabelText("Select a start date");
      fireEvent.click(startDateInput);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--001")[0]
      );
      const endDateInput = getByLabelText("Select an end date");
      fireEvent.click(endDateInput);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--005")[0]
      );
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(
        new Date("2020-02-01T11:01:58.135Z")
      );
      expect(latestCall.endDate).toMatchDate(
        new Date("2020-02-05T11:01:58.135Z")
      );
      expect(latestCall.error).toBeUndefined();
    });
    it("returns the selected range when the time changes", () => {
      const onRangeChange = jest.fn();
      const {
        container,
        queryAllByText,
        getByLabelText,
      } = renderWithNDSProvider(
        <DateRange onRangeChange={onRangeChange} showTimes />
      );
      const startDateInput = getByLabelText("Select a start date");
      fireEvent.click(startDateInput);
      selectTimeOption("11:00 PM", container, queryAllByText, 1);
      selectTimeOption("10:15 AM", container, queryAllByText, 2);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--001")[0]
      );
      const endDateInput = getByLabelText("Select an end date");
      fireEvent.click(endDateInput);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--005")[0]
      );
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(
        new Date("2020-02-01T11:01:58.135Z")
      );
      expect(latestCall.endDate).toMatchDate(
        new Date("2020-02-05T11:01:58.135Z")
      );
      expect(latestCall.startTime).toEqual("23:00");
      expect(latestCall.endTime).toEqual("10:15");
      expect(latestCall.error).toBeUndefined();
    });
    it("returns the selected range with an error if the range is invalid", () => {
      const onRangeChange = jest.fn();
      const { container, getByLabelText } = renderWithNDSProvider(
        <DateRange onRangeChange={onRangeChange} />
      );
      const startDateInput = getByLabelText("Select a start date");
      fireEvent.click(startDateInput);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--005")[0]
      );
      const endDateInput = getByLabelText("Select an end date");
      fireEvent.click(endDateInput);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--001")[0]
      );
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(
        new Date("2020-02-05T11:01:58.135Z")
      );
      expect(latestCall.endDate).toMatchDate(
        new Date("2020-02-01T11:01:58.135Z")
      );
      expect(latestCall.error).toEqual("end date is before start date");
    });
    it("returns the selected range with an error if the range is invalid", () => {
      const onRangeChange = jest.fn();
      const {
        container,
        queryAllByText,
        getByLabelText,
      } = renderWithNDSProvider(
        <DateRange showTimes onRangeChange={onRangeChange} />
      );
      const startDateInput = getByLabelText("Select a start date");
      fireEvent.click(startDateInput);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--005")[0]
      );
      const endDateInput = getByLabelText("Select an end date");
      fireEvent.click(endDateInput);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--005")[0]
      );
      selectTimeOption("11:00 PM", container, queryAllByText, 1);
      selectTimeOption("10:15 AM", container, queryAllByText, 2);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(
        new Date("2020-02-05T11:01:58.135Z")
      );
      expect(latestCall.endDate).toMatchDate(
        new Date("2020-02-05T11:01:58.135Z")
      );
      expect(latestCall.startTime).toEqual("23:00");
      expect(latestCall.endTime).toEqual("10:15");
      expect(latestCall.error).toEqual("end time is before start time");
    });
    it("returns the start date when the start date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container, getByLabelText } = renderWithNDSProvider(
        <DateRange
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      );
      const startDateInput = getByLabelText("Select a start date");
      fireEvent.click(startDateInput);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--001")[0]
      );
      const onChangeCalls = onStartDateChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall).toMatchDate(new Date("2020-02-01T11:01:58.135Z"));
      expect(onEndDateChange).not.toHaveBeenCalled();
    });
    it("returns the end date when the end date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container, getByLabelText } = renderWithNDSProvider(
        <DateRange
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      );
      const endDateInput = getByLabelText("Select an end date");
      fireEvent.click(endDateInput);
      fireEvent.click(
        container.querySelectorAll(".react-datepicker__day--005")[0]
      );
      const latestCall = onEndDateChange.mock.calls[0][0];
      expect(latestCall).toMatchDate(new Date("2020-02-05T11:01:58.135Z"));
      expect(onStartDateChange).not.toHaveBeenCalled();
    });
  });
});
