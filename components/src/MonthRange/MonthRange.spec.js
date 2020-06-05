import React from "react";
import { fireEvent } from "@testing-library/react";

import { MonthRange } from ".";
import { resetDate, mockDate } from "../testing/mockUtils/mockDates";
import "../testing/matchers/toMatchDate";
import { render } from "../NDSProvider/render.spec-utils";

describe("MonthRange", () => {
  describe("range selection", () => {
    beforeEach(() => {
      mockDate("2020-02-01T11:01:58.135Z");
    });
    afterEach(() => {
      resetDate();
    });
    test("returns the selected range when the range changes", () => {
      const onRangeChange = jest.fn();
      const { container, getByLabelText } = render(<MonthRange onRangeChange={onRangeChange} />);
      const startDateInput = getByLabelText("Select a start date");
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-3")[0]);
      const endDateInput = getByLabelText("Select an end date");
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-5")[0]);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(new Date("2020-04-01T04:00:00.000Z"));
      expect(latestCall.endDate).toMatchDate(new Date("2020-06-01T04:00:00.000Z"));
      expect(latestCall.error).toBeUndefined();
    });
    it("returns the selected range with an error if the range is invalid", () => {
      const onRangeChange = jest.fn();
      const { container, getByLabelText } = render(<MonthRange onRangeChange={onRangeChange} />);
      const startDateInput = getByLabelText("Select a start date");
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-5")[0]);
      const endDateInput = getByLabelText("Select an end date");
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-3")[0]);
      const onChangeCalls = onRangeChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall.startDate).toMatchDate(new Date("2020-06-01T04:00:00.000Z"));
      expect(latestCall.endDate).toMatchDate(new Date("2020-04-01T04:00:00.000Z"));
      expect(latestCall.error).toEqual("end month is before start month");
    });
    it("returns the start date when the start date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container, getByLabelText } = render(
        <MonthRange onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} />
      );
      const startDateInput = getByLabelText("Select a start date");
      fireEvent.click(startDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-3")[0]);
      const onChangeCalls = onStartDateChange.mock.calls;
      const latestCall = onChangeCalls[onChangeCalls.length - 1][0];
      expect(latestCall).toMatchDate(new Date("2020-04-01T04:00:00.000Z"));
      expect(onEndDateChange).not.toHaveBeenCalled();
    });
    it("returns the end date when the end date changes", () => {
      const onStartDateChange = jest.fn();
      const onEndDateChange = jest.fn();
      const { container, getByLabelText } = render(
        <MonthRange onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} />
      );
      const endDateInput = getByLabelText("Select an end date");
      fireEvent.click(endDateInput);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-10")[0]);
      const latestCall = onEndDateChange.mock.calls[0][0];
      expect(latestCall).toMatchDate(new Date("2020-11-01T04:00:00.000Z"));
      expect(onStartDateChange).not.toHaveBeenCalled();
    });
  });
});
