import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { DateRange } from ".";
import { resetDate, mockDate } from "../testing/mockUtils/mockDates";
import "../testing/matchers/toMatchDate";
import { selectOption } from "../Select/Select.spec-utils";

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
      const { container } = render(<DateRange onRangeChange={onRangeChange} />);
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--001")[0]);
      const endDateInput = container.querySelectorAll("input")[1];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--005")[0]);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(new Date("2020-02-01T11:01:58.135Z"));
      expect(latestCall.endDate).toMatchDate(new Date("2020-02-05T11:01:58.135Z"));
      expect(latestCall.error).toBeUndefined();
    });
    it("returns the selected range when the time changes", () => {
      const onRangeChange = jest.fn();
      const { container, queryByText } = render(<DateRange onRangeChange={onRangeChange} showTimes />);
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      selectOption("11:00 PM", container, queryByText, 1);
      selectOption("10:15 AM", container, queryByText, 2);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--001")[0]);
      const endDateInput = container.querySelectorAll("input")[3];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--005")[0]);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(new Date("2020-02-01T11:01:58.135Z"));
      expect(latestCall.endDate).toMatchDate(new Date("2020-02-05T11:01:58.135Z"));
      expect(latestCall.startTime).toEqual("23:00");
      expect(latestCall.endTime).toEqual("10:15");
      expect(latestCall.error).toBeUndefined();
    });
    it("returns the selected range with an error if the range is invalid", () => {
      const onRangeChange = jest.fn();
      const { container } = render(<DateRange onRangeChange={onRangeChange} />);
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--005")[0]);
      const endDateInput = container.querySelectorAll("input")[1];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--001")[0]);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(new Date("2020-02-05T11:01:58.135Z"));
      expect(latestCall.endDate).toMatchDate(new Date("2020-02-01T11:01:58.135Z"));
      expect(latestCall.error).toEqual("end date is before start date");
    });
    it("returns the selected range with an error if the range is invalid", () => {
      const onRangeChange = jest.fn();
      const { container, queryByText } = render(<DateRange showTimes onRangeChange={onRangeChange} />);
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--005")[0]);
      const endDateInput = container.querySelectorAll("input")[3];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--005")[0]);
      selectOption("11:00 PM", container, queryByText, 1);
      selectOption("10:15 AM", container, queryByText, 2);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(new Date("2020-02-05T11:01:58.135Z"));
      expect(latestCall.endDate).toMatchDate(new Date("2020-02-05T11:01:58.135Z"));
      expect(latestCall.startTime).toEqual("23:00");
      expect(latestCall.endTime).toEqual("10:15");
      expect(latestCall.error).toEqual("end time is before start time");
    });
    it("returns the start date when the start date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container } = render(
        <DateRange onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} />
      );
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--001")[0]);
      const onChangeCalls = onStartDateChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall).toMatchDate(new Date("2020-02-01T11:01:58.135Z"));
      expect(onEndDateChange).not.toHaveBeenCalled();
    });
    it("returns the end date when the end date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container } = render(
        <DateRange onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} />
      );
      const endDateInput = container.querySelectorAll("input")[1];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--005")[0]);
      const latestCall = onEndDateChange.mock.calls[0][0];
      expect(latestCall).toMatchDate(new Date("2020-02-05T11:01:58.135Z"));
      expect(onStartDateChange).not.toHaveBeenCalled();
    });
  });
});
