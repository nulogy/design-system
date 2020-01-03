import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MockDate from "mockdate";
import { MonthRange } from ".";

describe("MonthRange", () => {
  describe("range selection", () => {
    beforeEach(() => {
      MockDate.set("2020-04-01T04:00:00.000Z", 0);
    });
    afterEach(() => {
      MockDate.reset();
    });
    it("returns the selected range when the range changes", () => {
      const onRangeChange = jest.fn();
      const { container } = render(<MonthRange onRangeChange={onRangeChange} />);
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-3")[0]);
      const endDateInput = container.querySelectorAll("input")[1];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-5")[0]);
      expect(onRangeChange).lastCalledWith({
        startDate: new Date("2020-04-01T04:00:00.000Z"),
        endDate: new Date("2020-06-01T04:00:00.000Z"),
        error: undefined
      });
    });
    it("returns the selected range with an error if the range is invalid", () => {
      const onRangeChange = jest.fn();
      const { container } = render(<MonthRange onRangeChange={onRangeChange} />);
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-5")[0]);
      const endDateInput = container.querySelectorAll("input")[1];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-3")[0]);
      expect(onRangeChange).lastCalledWith({
        startDate: new Date("2020-06-01T04:00:00.000Z"),
        endDate: new Date("2020-04-01T04:00:00.000Z"),
        error: "End date is before start Month"
      });
    });
    it("returns the start date when the start date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container } = render(
        <MonthRange onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} />
      );
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-3")[0]);
      expect(onStartDateChange).toHaveBeenCalledWith(new Date("2020-04-01T04:00:00.000Z"));
      expect(onEndDateChange).not.toHaveBeenCalled();
    });
    it("returns the end date when the end date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container } = render(
        <MonthRange onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} />
      );
      const endDateInput = container.querySelectorAll("input")[1];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-10")[0]);
      expect(onEndDateChange).toHaveBeenCalledWith(new Date("2020-11-01T04:00:00.000Z"));
      expect(onStartDateChange).not.toHaveBeenCalled();
    });
  });
});
