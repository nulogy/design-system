/* eslint-disable no-global-assign */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MockDate from "mockdate";
import { DateRange } from ".";

describe("DateRange", () => {
  describe("range selection", () => {
    const now = new Date("2020-02-01T00:00:00.000Z");
    let _Date = null;
    beforeEach(() => {
      MockDate.set(now);

      function replaceDate() {
        if (_Date) {
          return;
        }

        _Date = Date;

        // eslint-disable-next-line func-names
        Object.getOwnPropertyNames(Date).forEach(function(name) {
          _Date[name] = Date[name];
        });

        // set Date ctor to always return same date
        // eslint-disable-next-line func-names
        // eslint-disable-next-line no-global-assign
        // eslint-disable-next-line func-names
        Date = function() {
          return new _Date("2020-02-01T00:00:00.000Z");
        };

        // eslint-disable-next-line func-names
        Object.getOwnPropertyNames(_Date).forEach(function(name) {
          Date[name] = _Date[name];
        });
      }
      replaceDate();
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
      function repairDate() {
        if (_Date === null) {
          return;
        }

        // eslint-disable-next-line no-global-assign
        Date = _Date;
        // eslint-disable-next-line func-names
        Object.getOwnPropertyNames(_Date).forEach(function(name) {
          Date[name] = _Date[name];
        });

        _Date = null;
      }
      repairDate();
      MockDate.reset();
    });
    it("returns the selected range when the range changes", () => {
      const onRangeChange = jest.fn();
      const { container } = render(<DateRange onRangeChange={onRangeChange} defaultStartDate={now} />);
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--001")[0]);
      const endDateInput = container.querySelectorAll("input")[1];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--005")[0]);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(new Date("Wed, 01 Jan 2020"));
      expect(latestCall.endDate).toMatchDate(new Date("2020-02-05T00:00:00.000Z"));
      expect(latestCall.error).toBeUndefined();
    });
    it("returns the selected range with an error if the range is invalid", () => {
      const onRangeChange = jest.fn();
      const { container } = render(<DateRange onRangeChange={onRangeChange} defaultStartDate={now} />);
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--005")[0]);
      const endDateInput = container.querySelectorAll("input")[1];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--001")[0]);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(new Date("2020-02-01T00:00:00.000Z"));
      expect(latestCall.endDate).toMatchDate(new Date("2020-02-05T00:00:00.000Z"));
      expect(latestCall.error).toEqual("End date is before start date");
    });
    it("returns the start date when the start date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container } = render(
        <DateRange onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} defaultStartDate={now} />
      );
      const startDateInput = container.querySelectorAll("input")[0];
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--001")[0]);
      const onChangeCalls = onStartDateChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall).toMatchDate(new Date("2020-02-01T00:00:00.000Z"));
      expect(onEndDateChange).not.toHaveBeenCalled();
    });
    it("returns the end date when the end date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container } = render(
        <DateRange onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} defaultStartDate={now} />
      );
      const endDateInput = container.querySelectorAll("input")[1];
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--005")[0]);
      const latestCall = onEndDateChange.mock.calls[0][0];
      expect(latestCall).toMatchDate(new Date("2020-02-05T00:00:00.000Z"));
      expect(onStartDateChange).not.toHaveBeenCalled();
    });
  });
});
