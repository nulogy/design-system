import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Select } from ".";

describe("select", () => {});

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
        className="find-me"
        noOptionsMessage={() => "No options"}
        options={options}
        labelText="Select some things"
        multiselect
        onChange={callback}
      />
    );

    expect(queryByText("Three")).toBeNull();

    fireEvent.focus(container.querySelector("input"));
    fireEvent.keyDown(container.querySelector("input"), { key: "ArrowDown", code: 40 });

    expect(queryByText("Three")).not.toBeNull();
    fireEvent.click(queryByText("Three"));

    expect(callback).toHaveBeenCalledWith(["three"]);
  });
});
