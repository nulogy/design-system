import React from "react";
import { mount } from "enzyme";
import withGeneratedId from "./withGeneratedId";

it("sets the specified id", () => {
  const SomeElement = props => <div {...props} />;
  const SomeElementWithId = withGeneratedId(SomeElement);

  const wrapper = mount(<SomeElementWithId id="myid" />);

  expect(wrapper.find("SomeElement#myid").length).toEqual(1);
});

it("sets a generated id when id isn't specified", () => {
  const SomeElement = props => <div {...props} />;
  const SomeElementWithId = withGeneratedId(SomeElement);

  const wrapper = mount(<SomeElementWithId />);
  const nodeWithId = wrapper.find("SomeElement").filterWhere(n => n.prop("id") !== undefined);

  expect(nodeWithId.length).toEqual(1);
});

it("sets a different id for each component", () => {
  const SomeElement = props => <div {...props} />;
  const SomeElementWithId = withGeneratedId(SomeElement);

  const wrapper = mount(
    <>
      <SomeElementWithId />
      <SomeElementWithId />
    </>
  );

  const ids = wrapper.find("SomeElement").map(n => n.prop("id"));

  expect(ids[0]).not.toEqual(ids[1]);
});

it("sets a different id for each individually wrapped components", () => {
  const SomeElement = props => <div {...props} />;
  const SomeElementWithId1 = withGeneratedId(SomeElement);
  const SomeElementWithId2 = withGeneratedId(SomeElement);

  const wrapper = mount(
    <>
      <SomeElementWithId1 />
      <SomeElementWithId2 />
    </>
  );

  const ids = wrapper.find("SomeElement").map(n => n.prop("id"));

  expect(ids[0]).not.toEqual(ids[1]);
});
