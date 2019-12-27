import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TimePicker } from ".";

describe("TimePicker", () => {
  describe("time selection", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    it("returns the selected time when the selection has changed", () => {
      const { container, queryByText } = render(<TimePicker onChange={onChange} onInputChange={onInputChange} />);
      const newTime = "12:15 AM";
      fireEvent.focus(container.querySelector("input"));
      fireEvent.keyDown(container.querySelector("input"), { key: "ArrowDown", code: 40 });
      fireEvent.click(queryByText(newTime));

      expect(onChange).toHaveBeenCalledWith(newTime);
    });

    it("returns the value of the input when it is typed into", () => {
      const labelText = "Expiry Time";
      const { container } = render(
        <TimePicker onChange={onChange} onInputChange={onInputChange} labelText={labelText} />
      );
      const value = "20:00";
      const input = container.querySelectorAll("input")[0];
      fireEvent.change(input, { target: { value } });

      expect(onInputChange).toHaveBeenCalledWith(value, { action: "input-change" });
    });
  });
});
