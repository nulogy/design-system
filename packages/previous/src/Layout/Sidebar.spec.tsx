import React from "react";
import { fireEvent } from "@testing-library/react";
import { PrimaryButton } from "../Button";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { Sidebar } from ".";

describe("Sidebar", () => {
  describe("callbacks", () => {
    it("calls onClose callback when dismissed with a close button", () => {
      const onCloseHandler = jest.fn();

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

    it("does not submit the form when closing the sidebar", () => {
      const onSubmit = jest.fn();

      const { getByLabelText } = renderWithNDSProvider(
        <form onSubmit={onSubmit}>
          <Sidebar isOpen footer={<PrimaryButton type="submit" />}>
            Sidebar
          </Sidebar>
        </form>
      );

      const closeBtn = getByLabelText("Close");
      fireEvent.click(closeBtn);

      expect(onSubmit).not.toHaveBeenCalled();
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
