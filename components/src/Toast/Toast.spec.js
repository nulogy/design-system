import React from "react";
import { Toast } from ".";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";

describe("Toast", () => {
  describe("callbacks", () => {
    const onHideHandler = jest.fn();
    const onShowHandler = jest.fn();

    it("calls onShow callback when triggered", () => {
      renderWithNDSProvider(
        <Toast triggered onShow={onShowHandler}>
          Saved
        </Toast>
      );
      expect(onShowHandler).toHaveBeenCalledTimes(1);
      expect(onHideHandler).not.toHaveBeenCalled();
    });
    it("calls onHide callback when dismissed", () => {
      renderWithNDSProvider(
        <Toast triggered={false} onHide={onHideHandler}>
          Saved
        </Toast>
      );
      expect(onHideHandler).toHaveBeenCalledTimes(1);
    });
  });
});
