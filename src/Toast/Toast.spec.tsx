import React from "react";
import { fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { Toast } from ".";

describe("Toast", () => {
  describe("callbacks", () => {
    const onHideHandler = vi.fn();
    const onShowHandler = vi.fn();
    const onCloseHandler = vi.fn();

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
    describe("closeable toast", () => {
      it("calls onClose callback when dismissed with a close button", () => {
        const { getByLabelText } = renderWithNDSProvider(
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
