import React from "react";
import { fireEvent } from "@testing-library/react";

import { MonthPicker } from ".";
import { render } from "../NDSProvider/render.spec-utils";

describe("MonthPicker", () => {
  describe("month selection", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    it("returns the selected date when the selection has changed", () => {
      const { container, getByLabelText } = render(
        <MonthPicker selected={new Date("Fri, 01 Jan 2019")} onChange={onChange} onInputChange={onInputChange} />
      );
      const input = getByLabelText("select a date");
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
