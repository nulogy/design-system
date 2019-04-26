import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Box,
  Flex,
  SubsectionTitle,
  Text,
  IconicButton,
} from "ComponentsRoot";
import Card from "./Card";
import CPCard from "./CPCard";
import CardSet from "./CardSet";

storiesOf("Card", module)
  .add("Card", () => (
    <Card>I am  a card.</Card>
  ))
  .add("Cardset", () => (
    <CardSet>
      <Card>I am a 1st card in a cardset.</Card>
      <Card>I am a 2nd card in a cardset.</Card>
      <Card>I am a 3rd card in a cardset.</Card>
    </CardSet>
  ))
  .add("Capacity Planing Cardset", () => (
    <CardSet>
      <CPCard>
        <SubsectionTitle mr="x4">Title</SubsectionTitle>
        <IconicButton icon="menu" />
        <Flex justifyContent="space-between">
          <Box mr="x3">
            <Text>Item: Some item</Text>
            <Text>Quantity: 746.00 ea</Text>
          </Box>
          <Box>
            <Text textAlign="right">Due: Jun2 24, 2019</Text>
            <Text textAlign="right">12:00 pm</Text>
          </Box>
        </Flex>
      </CPCard>
      <CPCard>
        <SubsectionTitle mr="x4">Title</SubsectionTitle>
        <IconicButton icon="menu" />
        <Flex justifyContent="space-between">
          <Box mr="x3">
            <Text>Item: Some item</Text>
            <Text>Quantity: 746.00 ea</Text>
          </Box>
          <Box>
            <Text textAlign="right">Due: Jun2 24, 2019</Text>
            <Text textAlign="right">12:00 pm</Text>
          </Box>
        </Flex>
      </CPCard>
    </CardSet>
  ));
