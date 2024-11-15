import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import BottomSheet from "./BottomSheet";

describe("BottomSheet", () => {
  it("passes onClose callback to primaryAction and secondaryAction", () => {
    const onCloseMock = jest.fn();
    const primaryActionMock = jest.fn(({ onClose }) => <button onClick={onClose}>Primary Action</button>);
    const secondaryActionMock = jest.fn(({ onClose }) => <button onClick={onClose}>Secondary Action</button>);

    renderWithNDSProvider(
      <BottomSheet
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
