import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { SideBar } from ".";

describe("SideBar", () => {
  describe("callbacks", () => {
    const onCloseHandler = jest.fn();

    it("calls onClose callback when dismissed with a close button", () => {
      const { getByLabelText } = renderWithNDSProvider(
        <SideBar isOpen onClose={onCloseHandler}>
          SideBar
        </SideBar>
      );
      const closeBtn = getByLabelText("Close");
      fireEvent.click(closeBtn);
      expect(onCloseHandler).toHaveBeenCalledTimes(1);
    });
  });
});
