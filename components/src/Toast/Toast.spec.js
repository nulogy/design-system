import React from "react";
import { render } from "@testing-library/react";
import { Toast } from ".";

describe("Toast", () => {
  describe("callbacks", () => {
    const onHideHandler = jest.fn();
    const onShowHandler = jest.fn();

    it("calls onShow callback when triggered", () => {
      render(
        <Toast triggered onShow={onShowHandler}>
          Saved
        </Toast>
      );
      expect(onShowHandler).toHaveBeenCalledTimes(1);
      expect(onHideHandler).not.toHaveBeenCalled();
    });
    it("calls onHide callback when dismissed", () => {
      render(
        <Toast triggered={false} onHide={onHideHandler}>
          Saved
        </Toast>
      );
      expect(onHideHandler).toHaveBeenCalledTimes(1);
    });
  });
});
