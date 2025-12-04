import React from "react";
import { fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { selectOption } from "./Select.spec-utils";
import { UsingRefToControlFocus, WithMultiselect, WithState } from "./Select.story";
import { Select } from ".";

describe("select", () => {
  it("returns the selected item on change", () => {
    const options = [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" },
    ];

    const callback = vi.fn();

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

    expect(container.textContent).toContain("Two");
    selectOption("Three", container, queryByText);
    expect(container.textContent).toContain("Three");
  });

  describe("with state", () => {
    it("clears the selected option", () => {
      const { container, queryByText } = renderWithNDSProvider(<WithState />);
      selectOption("Open", container, queryByText);
      expect(container.textContent).toContain("Open");
      fireEvent.click(queryByText("Clear selection"));
      expect(container.textContent).not.toContain("Open");
    });
  });
});

describe("multi select", () => {
  it("returns the selected items on change", () => {
    const callback = vi.fn();

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

    expect(container.textContent).toContain("One");
    expect(container.textContent).toContain("Two");
  });
  describe("with ref", () => {
    it("can set the focus", () => {
      const { container, queryByText } = renderWithNDSProvider(<UsingRefToControlFocus />);
      expect(document.activeElement).not.toBe(container.querySelectorAll("input")[0]);
      fireEvent.click(queryByText("Focus the Input"));
      expect(document.activeElement).toBe(container.querySelectorAll("input")[0]);
    });
  });
});
