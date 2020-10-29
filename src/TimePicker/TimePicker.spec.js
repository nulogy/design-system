import React from "react";
import { fireEvent } from "@testing-library/react";

import { TimePicker } from ".";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { convertTo24HourTimeArray, getBestMatchTime } from './TimePicker';

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
  it("returns the correct array for 012:01", () => {
    const actual = convertTo24HourTimeArray("0012:01");
    const expected = [12, 1];
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
  it("returns the correct array for 12a", () => {
    const actual = convertTo24HourTimeArray("12a");
    const expected = [0, 0];
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 11 : 3", () => {
    const actual = convertTo24HourTimeArray(" 11 : 3");
    const expected = [11, 30];
    expect(actual).toEqual(expected);
  });
});

describe("gets best matching time", () => {
  it("returns the correct array for 11p", () => {
    const actual = getBestMatchTime({
      time: "11p",
      timeFormat: "h:mm aa",
      minTime: undefined,
      maxTime: undefined,
      locale: "en_US",
      interval: 10,
    });
    const expected = "11:00 PM";
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 11:11", () => {
    const actual = getBestMatchTime({
      time: "11:11",
      timeFormat: "h:mm aa",
      minTime: undefined,
      maxTime: undefined,
      locale: "en_US",
      interval: 10,
    });
    const expected = "11:11 AM";
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 11:11 P", () => {
    const actual = getBestMatchTime({
      time: "11:11 P",
      timeFormat: "h:mm aa",
      minTime: undefined,
      maxTime: undefined,
      locale: "en_US",
      interval: 10,
    });
    const expected = "11:11 PM";
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 20:2", () => {
    const actual = getBestMatchTime({
      time: "20:2",
      timeFormat: "h:mm aa",
      minTime: undefined,
      maxTime: undefined,
      locale: "en_US",
      interval: 5,
    });
    const expected = "8:20 PM";
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 8:1p", () => {
    const actual = getBestMatchTime({
      time: "8:1p",
      timeFormat: "h:mm aa",
      minTime: undefined,
      maxTime: undefined,
      locale: "en_US",
      interval: 15,
    });
    const expected = "8:10 PM";
    expect(actual).toEqual(expected);
  });
  it("returns the correct array for 8:1p with 10 interval", () => {
    const actual = getBestMatchTime({
      time: "8:1p",
      timeFormat: "h:mm aa",
      minTime: undefined,
      maxTime: undefined,
      locale: "en_US",
      interval: 10,
    });
    const expected = "8:10 PM";
    expect(actual).toEqual(expected);
  });
});

