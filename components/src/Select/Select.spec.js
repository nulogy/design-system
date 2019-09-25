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

    const { container, queryByText } = render(<Select options={options} onChange={callback} />);

    selectOption("Two", container, queryByText);

    expect(callback).toHaveBeenCalledWith("two");
  });

  it("selects the specified default value", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" }
    ];

    const { container, queryByText } = render(<Select options={options} defaultValue="two" />);

    expect(container).toHaveTextContent("Two");
    selectOption("Three", container, queryByText);
    expect(container).toHaveTextContent("Three");
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

    const { container, queryByText } = render(<Select options={options} multiselect onChange={callback} />);

    selectOption("Three", container, queryByText);
    selectOption("Two", container, queryByText);

    expect(callback).toHaveBeenCalledWith(["three", "two"]);
  });
});

function openDropdown(container) {
  fireEvent.focus(container.querySelector("input"));
  fireEvent.keyDown(container.querySelector("input"), { key: "ArrowDown", code: 40 });
}

function selectOption(optionText, container, queryByText) {
  expect(queryByText(optionText)).toBeNull();

  openDropdown(container);

  expect(queryByText(optionText)).not.toBeNull();
  fireEvent.click(queryByText(optionText));
}
