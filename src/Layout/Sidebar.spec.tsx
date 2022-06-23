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
      const { queryByTestId } = renderWithNDSProvider(<Sidebar isOpen>Sidebar</Sidebar>);
      expect(queryByTestId("sidebar-overlay")).toBeTruthy();
    });

    it("shows an invisible overlay when set to false", () => {
      const { queryByTestId } = renderWithNDSProvider(
        <Sidebar isOpen overlay={false}>
          Sidebar
        </Sidebar>
      );
      expect(queryByTestId("sidebar-overlay")).toHaveStyle("opacity: 0");
    });
    it("doesn't use an overlay if the sidebar stays open on outside clicks", () => {
      const { queryByTestId } = renderWithNDSProvider(
        <Sidebar isOpen overlay={false} closeOnOutsideClick={false}>
          Sidebar
        </Sidebar>
      );
      expect(queryByTestId("sidebar-overlay")).toBeNull();
    });
  });

  describe("zIndex", () => {
    it("provides a custom zIndex to the overlay", () => {
      const { queryByTestId } = renderWithNDSProvider(
        <Sidebar isOpen zIndex={1001}>
          Sidebar
        </Sidebar>
      );
      expect(queryByTestId("sidebar-overlay")).toHaveStyle("z-index: 1001");
    });
  });
});
