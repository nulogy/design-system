import React from "react";
import { render } from "@testing-library/react";
import { Select } from ".";
import { selectOption } from "./Select.spec-utils";

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

  it("selects the specified default values", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" }
    ];

    const { container } = render(<Select options={options} multiselect defaultValue={["one", "two"]} />);

    expect(container).toHaveTextContent("One");
    expect(container).toHaveTextContent("Two");
  });
});
