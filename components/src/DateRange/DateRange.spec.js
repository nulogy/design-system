import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MockDate from "mockdate";
import { DateRange } from ".";

describe("MonthRange", () => {
  describe("range selection", () => {
    beforeEach(() => {
      const now = new Date("2020-02-01T00:00:00.000Z");
      MockDate.set(now);
      expect.extend({
        toMatchDate(received, date) {
          const pass =
            date.getMonth() === received.getMonth() &&
            date.getYear() === received.getYear() &&
            date.getDay() === received.getDay();
          if (pass) {
            return {
              message: () => `expected ${received} not to match ${date}`,
              pass: true
            };
          } else {
            return {
              message: () => `expected ${received} to match ${date}`,
              pass: false
            };
          }
        }
      });
    });
    afterEach(() => {
      MockDate.reset();
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
      expect(latestCall.startDate).toMatchMonthAndYear(new Date("2020-02-01T00:00:00.000Z"));
      expect(latestCall.endDate).toMatchMonthAndYear(new Date("2020-02-05T00:00:00.000Z"));
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
      expect(latestCall.startDate).toMatchMonthAndYear(new Date("2020-02-01T00:00:00.000Z"));
      expect(latestCall.endDate).toMatchMonthAndYear(new Date("2020-02-05T00:00:00.000Z"));
      expect(latestCall.error).toEqual("End date is before start date");
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
      expect(latestCall).toMatchMonthAndYear(new Date("2020-02-01T00:00:00.000Z"));
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
      expect(latestCall).toMatchMonthAndYear(new Date("2020-02-05T00:00:00.000Z"));
      expect(onStartDateChange).not.toHaveBeenCalled();
    });
  });
});
