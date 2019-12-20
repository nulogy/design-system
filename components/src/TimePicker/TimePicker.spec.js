import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TimePicker } from ".";

describe("TimePicker", () => {
  describe("time selection", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    it("returns the selected time when the selection has changed", () => {
      const { container } = render(<TimePicker onChange={onChange} onInputChange={onInputChange} />);
      const input = container.querySelectorAll("input")[0];
      const newTime = "12:15 AM";
      fireEvent.click(input);
      fireEvent.click(container.querySelectorAll("div[class*='SelectOption']")[1]);

      expect(onChange.mock.calls[0][0]).toEqual(newTime);
    });

    it("returns the value of the input when it is typed into", () => {
      const labelText = "Expiry Time";
      const { getByLabelText } = render(
        <TimePicker onChange={onChange} onInputChange={onInputChange} inputProps={{ labelText }} />
      );
      const value = "20:00";
      const input = getByLabelText(labelText);
      fireEvent.change(input, { target: { value } });

      expect(onInputChange).toHaveBeenCalledWith(value);
    });
  });
});
