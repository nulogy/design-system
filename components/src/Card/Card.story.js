import React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Text, SubsectionTitle } from "../Type";
import { IconicButton } from "../Button";
import { Card, CardSet, CPCard } from ".";
import { Dropdown, DropdownButton } from "../Dropdown";

storiesOf("Card", module)
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
  ))
  .add("Capacity Planing Cardset", () => (
    <CardSet>
      <CPCard>
        <SubsectionTitle mr="x4">Title</SubsectionTitle>
        <Dropdown>
          <DropdownButton>Dropdown Item</DropdownButton>
          <DropdownButton>Dropdown Item</DropdownButton>
        </Dropdown>
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
        <Dropdown>
          <DropdownButton>Dropdown Item</DropdownButton>
          <DropdownButton>Dropdown Item</DropdownButton>
        </Dropdown>
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
