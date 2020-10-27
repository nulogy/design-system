import React from "react";
import { fireEvent } from "@testing-library/react";

import { TimePicker } from ".";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";

const openDropdown = (container, i = 0) => {
  fireEvent.focus(container.querySelectorAll("input")[i]);
  fireEvent.keyDown(container.querySelectorAll("input")[i], {
    key: "ArrowDown",
    code: 40,
  });
};

const selectOption = (optionText, container, queryByText, i) => {
  openDropdown(container, i);

  fireEvent.click(queryByText(optionText));
};

describe("TimePicker", () => {
  describe("time selection", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    it("returns the selected time when the selection has changed", () => {
      const { container, queryByText } = renderWithNDSProvider(
        <TimePicker onChange={onChange} onInputChange={onInputChange} />
      );
      selectOption("12:15 AM", container, queryByText);

      expect(onChange).toHaveBeenCalledWith("12:15 AM", "00:15");
    });

    it("returns the value of the input when it is typed into", () => {
      const labelText = "Expiry Time";
      const { container } = renderWithNDSProvider(
        <TimePicker
          onChange={onChange}
          onInputChange={onInputChange}
          labelText={labelText}
        />
      );
      const value = "20:00";
      fireEvent.change(container.querySelectorAll("input")[0], {
        target: { value },
      });

      expect(onInputChange).toHaveBeenCalledWith(value);
    });
  });
});
