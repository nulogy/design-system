import React from "react";
import { Card, CardSet } from "../index";

export default {
  title: "Components/Card",
};

export const _Card = () => <Card>I am a card.</Card>;

export const CustomCard = () => (
  <Card bg="black" color="white" borderRadius="small" p="x1">
    I am a custom card.
  </Card>
);

CustomCard.story = {
  name: "Custom card",
};

export const Cardset = () => (
  <CardSet>
    <Card>I am a 1st card in a cardset.</Card>
    <Card>I am a 2nd card in a cardset.</Card>
    <Card>I am a 3rd card in a cardset.</Card>
  </CardSet>
);
