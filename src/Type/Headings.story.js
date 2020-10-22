import React from "react";
import { Text, Heading1, Heading2, Heading3, Heading4 } from "../index";

export default {
  title: "Components/Headings"
};

export const _Heading1 = () => <Heading1>Heading 1</Heading1>;

_Heading1.story = {
  name: "Heading1"
};

export const _Heading2 = () => <Heading2>Heading 2</Heading2>;

_Heading2.story = {
  name: "Heading2"
};

export const _Heading3 = () => <Heading3>Heading 3</Heading3>;

_Heading3.story = {
  name: "Heading3"
};

export const _Heading4 = () => <Heading4>Heading 4</Heading4>;

_Heading4.story = {
  name: "Heading4"
};

export const WithACustomMargin = () => (
  <>
    <Heading1 mb="x6">Heading1</Heading1>
    <Text>Lorem ipsum</Text>
  </>
);

WithACustomMargin.story = {
  name: "With a custom margin"
};
