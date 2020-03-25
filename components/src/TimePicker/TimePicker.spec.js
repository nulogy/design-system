import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TimePicker } from ".";
import { selectOption } from "../Select/Select.spec-utils";

describe("TimePicker", () => {
  describe("time selection", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    it("returns the selected time when the selection has changed", () => {
      const { container, queryByText } = render(<TimePicker onChange={onChange} onInputChange={onInputChange} />);
      selectOption("12:15 AM", container, queryByText);

      expect(onChange).toHaveBeenCalledWith("00:15");
    });

    it("returns the value of the input when it is typed into", () => {
      const labelText = "Expiry Time";
      const { getByLabelText } = render(
        <TimePicker onChange={onChange} onInputChange={onInputChange} labelText={labelText} />
      );
      const value = "20:00";
      const input = getByLabelText("Select a time");
      fireEvent.change(input, { target: { value } });

      expect(onInputChange).toHaveBeenCalledWith(value, { action: "input-change" });
    });
  });
});
