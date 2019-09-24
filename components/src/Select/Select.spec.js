import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Select } from ".";

describe("select", () => {
  it("returns the selected item on change", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" }
    ];

    const callback = jest.fn();

    const { container, queryByText } = render(
      <Select
        noOptionsMessage={() => "No options"}
        options={options}
        labelText="Select something"
        onChange={callback}
      />
    );

    selectOption("Two", container, queryByText);

    expect(callback).toHaveBeenCalledWith("two");
  });
});

describe("multi select", () => {
  it("returns the selected items on change", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" }
    ];

    const callback = jest.fn();

    const { container, queryByText } = render(
      <Select
        noOptionsMessage={() => "No options"}
        options={options}
        labelText="Select some things"
        multiselect
        onChange={callback}
      />
    );

    selectOption("Three", container, queryByText);

    expect(callback).toHaveBeenCalledWith(["three"]);
  });
});

function selectOption(text, container, queryByText) {
  expect(queryByText(text)).toBeNull();

  fireEvent.focus(container.querySelector("input"));
  fireEvent.keyDown(container.querySelector("input"), { key: "ArrowDown", code: 40 });

  expect(queryByText(text)).not.toBeNull();
  fireEvent.click(queryByText(text));
}
