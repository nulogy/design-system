import React from "react";
import { storiesOf } from "@storybook/react";
import { Card, CardSet } from "../index";

storiesOf("Components/Card", module)
  .add("Card", () => <Card>I am a card.</Card>)
  .add("Custom card", () => (
    <Card bg="black" color="white" borderRadius="small" p="x1">
      I am a custom card.
    </Card>
  ))
  .add("Cardset", () => (
    <CardSet>
      <Card>I am a 1st card in a cardset.</Card>
      <Card>I am a 2nd card in a cardset.</Card>
      <Card>I am a 3rd card in a cardset.</Card>
    </CardSet>
  ));
