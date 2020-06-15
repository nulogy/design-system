import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Toast } from ".";

describe("Toast", () => {
  describe("callbacks", () => {
    const onHideHandler = jest.fn();
    const onShowHandler = jest.fn();
    const onCloseHandler = jest.fn();

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
    describe("closeable toast", () => {
      it("calls onClose callback when dismissed with a close button", () => {
        const { getByLabelText } = render(
          <Toast triggered onClose={onCloseHandler} isCloseable>
            Saved
          </Toast>
        );
        const closeBtn = getByLabelText("Close");
        fireEvent.click(closeBtn);
        expect(onCloseHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
