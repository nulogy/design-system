import React from "react";
import { mount } from "enzyme";
import Select from "./Select";

it("opens the dropdown when clicked", () => {
  const options = [
    { value: "v1", label: "V One" },
    { value: "v2", label: "V Two" },
    { value: "v3", label: "V Three" },
  ];

  const wrapper = mount(
    <Select options={ options } />
  );

  expect(wrapper.text()).not.toEqual(expect.stringMatching(/V One/));
  wrapper.find("input").simulate("click");

  expect(wrapper.text()).toEqual(expect.stringMatching(/V One/));
});
