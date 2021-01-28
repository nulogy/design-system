import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { Sidebar } from ".";

describe("Sidebar", () => {
  describe("callbacks", () => {
    const onCloseHandler = jest.fn();

    it("calls onClose callback when dismissed with a close button", () => {
      const { getByLabelText } = renderWithNDSProvider(
        <Sidebar isOpen onClose={onCloseHandler}>
          Sidebar
        </Sidebar>
      );
      const closeBtn = getByLabelText("Close");
      fireEvent.click(closeBtn);
      expect(onCloseHandler).toHaveBeenCalledTimes(1);
    });

    it("shows an overlay by default", () => {
      const { queryByTestId } = renderWithNDSProvider(
        <Sidebar isOpen>Sidebar</Sidebar>
      );
      expect(queryByTestId("sidebar-overlay")).toBeTruthy();
    });

    it("doesn't show an overlay when set to false", () => {
      const { queryByTestId } = renderWithNDSProvider(
        <Sidebar isOpen overlay={false}>
          Sidebar
        </Sidebar>
      );
      expect(queryByTestId("sidebar-overlay")).toBeNull();
    });
  });
});
