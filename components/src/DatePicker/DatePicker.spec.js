import React from "react";
import { fireEvent } from "@testing-library/react";

import { render } from "../NDSProvider/render.spec-utils";
import { DatePicker } from ".";

describe("DatePicker", () => {
  describe("date selection", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    it("returns the selected date when the selection has changed", () => {
      const { container, getByLabelText } = render(
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
      const { getByLabelText } = render(
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
