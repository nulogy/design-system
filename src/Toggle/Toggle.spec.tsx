import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { Toggle } from ".";

describe("Toggle", () => {
  describe("calls event handlers", () => {
    const onChange = jest.fn();

    it("returns the selected time when the selection has changed", () => {
      const { container } = renderWithNDSProvider(<Toggle onChange={onChange} data-testid="toggle" />);
      fireEvent.click(container.querySelectorAll("[data-testid='toggle'] input")[0]);

      expect(onChange).toHaveBeenCalled();
    });

    it("correctly disables the toggle", () => {
      const { container } = renderWithNDSProvider(<Toggle onChange={onChange} data-testid="toggle" disabled />);
      const element = container.querySelector("[data-testid='toggle'] input");
      expect(element).toBeDisabled();
    });
  });
});
