import { describe, expect, it } from "vitest";
import {
	convertTo24HourTimeArray,
	getBestMatchTime,
	getTimeOptions,
} from "./TimePicker";

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
		});
		const expected = {
			label: "11:00 PM",
			value: "23:00",
		};
		expect(actual).toEqual(expected);
	});

	it("returns the correct array for 11:11", () => {
		const actual = getBestMatchTime({
			time: "11:11",
			timeFormat: "h:mm aa",
			minTime: undefined,
			maxTime: undefined,
			locale: "en_US",
		});
		const expected = {
			label: "11:11 AM",
			value: "11:11",
		};
		expect(actual).toEqual(expected);
	});

	it("returns the correct array for 11:11 P", () => {
		const actual = getBestMatchTime({
			time: "11:11 P",
			timeFormat: "h:mm aa",
			minTime: undefined,
			maxTime: undefined,
			locale: "en_US",
		});
		const expected = {
			label: "11:11 PM",
			value: "23:11",
		};
		expect(actual).toEqual(expected);
	});

	it("returns the correct array for 20:2", () => {
		const actual = getBestMatchTime({
			time: "20:2",
			timeFormat: "h:mm aa",
			minTime: undefined,
			maxTime: undefined,
			locale: "en_US",
		});
		const expected = {
			label: "8:20 PM",
			value: "20:20",
		};
		expect(actual).toEqual(expected);
	});

	it("returns the correct array for 8:1p", () => {
		const actual = getBestMatchTime({
			time: "8:1p",
			timeFormat: "h:mm aa",
			minTime: undefined,
			maxTime: undefined,
			locale: "en_US",
		});
		const expected = {
			label: "8:10 PM",
			value: "20:10",
		};
		expect(actual).toEqual(expected);
	});

	it("returns the correct array for 8:1p with 10 interval", () => {
		const actual = getBestMatchTime({
			time: "8:1p",
			timeFormat: "h:mm aa",
			minTime: undefined,
			maxTime: undefined,
			locale: "en_US",
		});
		const expected = {
			label: "8:10 PM",
			value: "20:10",
		};
		expect(actual).toEqual(expected);
	});
});

describe("gets time options", () => {
	it("returns an array of options every 15 min", () => {
		const timeOptions = getTimeOptions(
			15,
			"h:mm aa",
			undefined,
			undefined,
			"en_US",
		);
		expect(timeOptions[0]).toEqual({
			value: "00:00",
			label: "12:00 AM",
		});
		expect(timeOptions[timeOptions.length - 1]).toEqual({
			value: "23:45",
			label: "11:45 PM",
		});
		expect(timeOptions).toMatchSnapshot();
	});

	it("returns an array of options within min and max", () => {
		const timeOptions = getTimeOptions(
			10,
			"h:mm aa",
			"08:00",
			"20:30",
			"en_US",
		);
		expect(timeOptions[0]).toEqual({
			value: "08:00",
			label: "8:00 AM",
		});
		expect(timeOptions[timeOptions.length - 1]).toEqual({
			value: "20:30",
			label: "8:30 PM",
		});
		expect(timeOptions).toMatchSnapshot();
	});

	it("returns an array of options within min", () => {
		const timeOptions = getTimeOptions(
			10,
			"h:mm aa",
			"09:00",
			undefined,
			"en_US",
		);
		expect(timeOptions[0]).toEqual({
			value: "09:00",
			label: "9:00 AM",
		});
		expect(timeOptions[timeOptions.length - 1]).toEqual({
			value: "23:50",
			label: "11:50 PM",
		});
		expect(timeOptions).toMatchSnapshot();
	});

	it("returns an array of options within max", () => {
		const timeOptions = getTimeOptions(
			10,
			"h:mm aa",
			undefined,
			"19:00",
			"en_US",
		);
		expect(timeOptions[0]).toEqual({
			value: "00:00",
			label: "12:00 AM",
		});
		expect(timeOptions[timeOptions.length - 1]).toEqual({
			value: "19:00",
			label: "7:00 PM",
		});
		expect(timeOptions).toMatchSnapshot();
	});
});
