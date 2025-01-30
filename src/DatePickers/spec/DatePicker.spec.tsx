import React from "react";
import { fireEvent } from "@testing-library/react";

import { renderWithNDSProvider } from "../../NDSProvider/renderWithNDSProvider.spec-utils";
import { DatePicker, WeekPicker } from "..";
import { startOfWeek, endOfWeek, getWeek, getYear } from "date-fns";

describe("DatePicker", () => {
  describe("date selection", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    it("returns the selected date when the selection has changed", () => {
      const { container, getByLabelText } = renderWithNDSProvider(
        <DatePicker selected={new Date("Fri, 01 Jan 2019")} onChange={onChange} onInputChange={onInputChange} />
      );
      const input = getByLabelText("select a date");
      const newDate = new Date("Sat, 02 Jan 2019");
      fireEvent.click(input);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--002")[0]);

      expect(onChange.mock.calls[0][0]).toEqual(newDate);
    });

    it("returns the value of the input when it is typed into", () => {
      const labelText = "Expiry Date";
      const { getByLabelText } = renderWithNDSProvider(
        <DatePicker
          selected={new Date("Fri, 01 Jan 2019")}
          onChange={onChange}
          onInputChange={onInputChange}
          inputProps={{ labelText }}
        />
      );
      const value = "20/02";
      const input = getByLabelText(labelText);
      fireEvent.change(input, { target: { value } });

      expect(onInputChange).toHaveBeenCalledWith(value);
    });
  });
});

describe("WeekPicker", () => {
  describe("onChange callback", () => {
    it("returns a WeekRange object when a date is selected", () => {
      const onChangeMock = jest.fn();
      const testDate = new Date("2024-03-15");

      const { container } = renderWithNDSProvider(
        <WeekPicker selected={testDate} onChange={onChangeMock} inputProps={{ labelText: "Test Week Picker" }} />
      );

      fireEvent.click(container.querySelector("input") as Element);

      fireEvent.click(container.querySelector(".react-datepicker__day--015") as Element);

      expect(onChangeMock).toHaveBeenCalledTimes(1);

      const expectedWeekRange = {
        startDate: startOfWeek(testDate, { weekStartsOn: 1 }),
        endDate: endOfWeek(testDate, { weekStartsOn: 1 }),
        weekNumber: getWeek(testDate, { weekStartsOn: 1 }),
        year: getYear(testDate),
      };

      const actualWeekRange = onChangeMock.mock.calls[0][0];

      expect(actualWeekRange).toEqual(
        expect.objectContaining({
          startDate: expect.any(Date),
          endDate: expect.any(Date),
          weekNumber: expect.any(Number),
          year: expect.any(Number),
        })
      );

      expect(actualWeekRange.startDate).toEqual(expectedWeekRange.startDate);
      expect(actualWeekRange.endDate).toEqual(expectedWeekRange.endDate);
      expect(actualWeekRange.weekNumber).toBe(expectedWeekRange.weekNumber);
      expect(actualWeekRange.year).toBe(expectedWeekRange.year);
    });
  });
});
