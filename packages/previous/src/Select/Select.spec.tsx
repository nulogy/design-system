import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { selectOption } from "./Select.spec-utils";
import { UsingRefToControlFocus, WithCustomProps, WithMultiselect, WithState } from "./Select.story";
import { Select } from ".";

describe("select", () => {
  it("returns the selected item on change", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" },
    ];

    const callback = jest.fn();

    const { container, queryByText } = renderWithNDSProvider(
      <Select options={options} name="multiselect" onChange={callback} />
    );

    selectOption("Two", container, queryByText);

    expect(callback).toHaveBeenCalledWith("two");
  });

  it("selects the specified default value", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" },
    ];

    const { container, queryByText } = renderWithNDSProvider(<Select options={options} defaultValue="two" />);

    expect(container).toHaveTextContent("Two");
    selectOption("Three", container, queryByText);
    expect(container).toHaveTextContent("Three");
  });

  it("passes along the custom props to custom components", () => {
    const { container, queryByText } = renderWithNDSProvider(<WithCustomProps />);

    selectOption("custom prop value", container, queryByText);

    expect(container).toHaveTextContent("custom prop value");
  });

  describe("with state", () => {
    it("clears the selected option", () => {
      const { container, queryByText } = renderWithNDSProvider(<WithState />);
      selectOption("Open", container, queryByText);
      expect(container).toHaveTextContent("Open");
      fireEvent.click(queryByText("Clear selection"));
      expect(container).not.toHaveTextContent("Open");
    });
  });
});

describe("multi select", () => {
  it("returns the selected items on change", () => {
    const callback = jest.fn();

    const { container, queryByText } = renderWithNDSProvider(<WithMultiselect onChange={callback} />);

    selectOption("PCN4", container, queryByText);
    selectOption("PCN9", container, queryByText);

    expect(callback).toHaveBeenCalledWith(["2", "1", "4", "9"]);
  });

  it("selects the specified default values", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" },
    ];

    const { container } = renderWithNDSProvider(<Select options={options} multiselect defaultValue={["one", "two"]} />);

    expect(container).toHaveTextContent("One");
    expect(container).toHaveTextContent("Two");
  });
  describe("with ref", () => {
    it("can set the focus", () => {
      const { container, queryByText } = renderWithNDSProvider(<UsingRefToControlFocus />);
      expect(container.querySelectorAll("input")[0]).not.toHaveFocus();
      fireEvent.click(queryByText("Focus the Input"));
      expect(container.querySelectorAll("input")[0]).toHaveFocus();
    });
  });
});
