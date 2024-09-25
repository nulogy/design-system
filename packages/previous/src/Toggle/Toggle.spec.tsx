import React from "react";
import { fireEvent } from "@testing-library/react";

import { Toggle } from ".";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";

describe("Toggle", () => {
  describe("calls event handlers", () => {
    const onChange = jest.fn();
    const onClick = jest.fn();

    it("returns the selected time when the selection has changed", () => {
      const { container } = renderWithNDSProvider(
        <Toggle onChange={onChange} onClick={onClick} data-testid="toggle" />
      );
      fireEvent.click(container.querySelectorAll("[data-testid='toggle'] input")[0]);

      expect(onChange).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalled();
    });
  });
});
