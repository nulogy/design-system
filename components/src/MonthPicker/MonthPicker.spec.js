import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MonthPicker } from ".";

describe("MonthPicker", () => {
  describe("month selection", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    it("returns the selected date when the selection has changed", () => {
      const { container } = render(
        <MonthPicker selected={new Date("Fri, 01 Jan 2019")} onChange={onChange} onInputChange={onInputChange} />
      );
      const input = container.querySelectorAll("input")[0];
      fireEvent.click(input);
      fireEvent.click(container.querySelectorAll(".react-datepicker__month-1")[0]);

      expect(onChange.mock.calls[0][0].getMonth()).toEqual(1);
    });

    it("returns the value of the input when it is typed into", () => {
      const labelText = "Expiry Date";
      const { getByLabelText } = render(
        <MonthPicker
          selected={new Date("Fri, 01 Jan 2019")}
          onChange={onChange}
          onInputChange={onInputChange}
          inputProps={{ labelText }}
        />
      );
      const value = "Feb 2019";
      const input = getByLabelText(labelText);
      fireEvent.change(input, { target: { value } });

      expect(onInputChange).toHaveBeenCalledWith(value);
    });
  });
});
