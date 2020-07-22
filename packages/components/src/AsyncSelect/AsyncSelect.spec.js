import React from "react";
import { AsyncSelect } from ".";
import { selectOption } from "../Select/Select.spec-utils";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";

describe("select", () => {
  it("returns the selected item on change", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" }
    ];

    const callback = jest.fn();

    const { container, queryByText } = renderWithNDSProvider(
      <AsyncSelect defaultOptions={options} onChange={callback} />
    );

    selectOption("Two", container, queryByText);

    expect(callback).toHaveBeenCalledWith("two");
  });
});
