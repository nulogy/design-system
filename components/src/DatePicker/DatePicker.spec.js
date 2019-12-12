import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Simulate } from "react-dom/test-utils";
import { DatePicker } from ".";

describe("DatePicker", () => {
  describe("date selection", () => {
    const onChange = jest.fn();
    const onChangeInput = jest.fn();

    it("returns the selected date when the selection has changed", () => {
      const { container } = render(
        <DatePicker selected={new Date("Fri, 01 Jan 2019")} onChange={onChange} onChangeInput={onChangeInput} />
      );
      const input = container.querySelectorAll("input")[0];
      const newDate = new Date("Sat, 02 Jan 2019");
      fireEvent.click(input);
      fireEvent.click(container.querySelectorAll(".react-datepicker__day--002")[0]);

      expect(onChange.mock.calls[0][0]).toEqual(newDate);
    });

    it("returns the value of the input when it is typed into", () => {
      const { container } = render(
        <DatePicker selected={new Date("Fri, 01 Jan 2019")} onChange={onChange} onChangeInput={onChangeInput} />
      );
      const input = container.querySelectorAll("input")[0];
      input.value = "20/02";
      Simulate.change(input);

      expect(onChangeInput).toHaveBeenCalledWith("20/02");
    });
  });
});
