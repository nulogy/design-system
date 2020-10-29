import React from "react";
import { fireEvent } from "@testing-library/react";

import { TimePicker } from ".";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { convertTo24HourTimeArray } from './TimePicker';

const openDropdown = (container, i = 0) => {
  fireEvent.focus(container.querySelectorAll("input")[i]);
  fireEvent.keyDown(container.querySelectorAll("input")[i], { key: "ArrowDown", code: 40 });
};

const selectOption = (optionText, container, queryByText, i) => {
  openDropdown(container, i);

  fireEvent.click(queryByText(optionText));
};

describe("TimePicker", () => {
  describe("time selection", () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    it("returns the selected time when the selection has changed", () => {
      const { container, queryByText } = renderWithNDSProvider(
        <TimePicker onChange={onChange} onInputChange={onInputChange} />
      );
      selectOption("12:15 AM", container, queryByText);

      expect(onChange).toHaveBeenCalledWith("12:15 AM", "00:15");
    });

    it("returns the value of the input when it is typed into", () => {
      const labelText = "Expiry Time";
      const { container } = renderWithNDSProvider(
        <TimePicker onChange={onChange} onInputChange={onInputChange} labelText={labelText} />
      );
      const value = "20:00";
      fireEvent.change(container.querySelectorAll("input")[0], { target: { value } });

      expect(onInputChange).toHaveBeenCalledWith(value);
    });
  });
});

describe("convert to 24 hr time array [h, mm]", () => {
  it("returns the correct array for 1p", () => {
    const actual = convertTo24HourTimeArray("1p");
    const expected = [13, 0];
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 1:30", () => {
    const actual = convertTo24HourTimeArray("1:30");
    const expected = [1, 30];
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 1a", () => {
    const actual = convertTo24HourTimeArray("1a");
    const expected = [1, 0];
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 1:1p", () => {
    const actual = convertTo24HourTimeArray("1:1p");
    const expected = [13, 10];
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 1:1a", () => {
    const actual = convertTo24HourTimeArray("1:1a");
    const expected = [1, 10];
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 11", () => {
    const actual = convertTo24HourTimeArray("11");
    const expected = [11, 0];
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 11:3", () => {
    const actual = convertTo24HourTimeArray("11:3");
    const expected = [11, 30];
    expect(actual).toEqual(expected);
  });
});
