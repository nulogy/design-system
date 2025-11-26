import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import BottomSheet from "./BottomSheet";

describe("BottomSheet", () => {
  it("passes onClose callback to primaryAction and secondaryAction", () => {
    const onCloseMock = vi.fn();
    const primaryActionMock = vi.fn(({ onClose }) => <button onClick={onClose}>Primary Action</button>);
    const secondaryActionMock = vi.fn(({ onClose }) => <button onClick={onClose}>Secondary Action</button>);

    renderWithNDSProvider(
      <BottomSheet
        title="Some title"
        isOpen={true}
        onClose={onCloseMock}
        primaryAction={primaryActionMock}
        secondaryAction={secondaryActionMock}
      />
    );

    expect(primaryActionMock).toHaveBeenCalledWith(expect.objectContaining({ onClose: onCloseMock }));
    expect(secondaryActionMock).toHaveBeenCalledWith(expect.objectContaining({ onClose: onCloseMock }));

    fireEvent.click(screen.getByText("Primary Action"));
    expect(onCloseMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Secondary Action"));
    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });
});
