import React from "react";
import { selectOption } from "../Select/Select.spec-utils";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { AsyncSelect } from ".";

describe("select", () => {
  it("returns the selected item on change", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" },
    ];

    const callback = jest.fn();
    const loadOptions = jest.fn();

    const { container, queryByText } = renderWithNDSProvider(
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions={options}
        onChange={callback}
      />
    );

    selectOption("Two", container, queryByText);

    expect(callback).toHaveBeenCalledWith(
      { label: "Two", value: "two" },
      { action: "select-option", name: undefined, option: undefined }
    );
  });
});
