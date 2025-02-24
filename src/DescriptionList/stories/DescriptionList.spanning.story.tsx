import React, { useState } from "react";
import { Checkbox } from "../../Checkbox";
import { Flex } from "../../Flex";
import { Heading1 } from "../../Type";
import DescriptionList from "../DescriptionList";
import { DescriptionGroup } from "../DescriptionList.parts";
import { VerticalDivider } from "../../VerticalDivider";
import { OutlinedDt, OutlinedDd } from "./fixtures";

export default {
  title: "Components/DescriptionList/Spanning",
  component: DescriptionList,
};

export const ColumnSpanning = () => {
  const [outlined, setOutlined] = useState(true);

  return (
    <Flex flexDirection="column" gap="x4">
      <Flex flexDirection="row" alignItems="baseline" gap="half">
        <Heading1 compact>Column Spanning</Heading1>
        <VerticalDivider />
        <Checkbox labelText="Show group outline" checked={outlined} onChange={() => setOutlined(!outlined)} />
      </Flex>

      <Flex flexDirection="column" gap="x2">
        <DescriptionList layout="stacked" columns={2}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup columnSpan={3}>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>This value is very long and it will span 3 columns</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
    </Flex>
  );
};

export const RowSpanning = () => {
  const [outlined, setOutlined] = useState(true);

  return (
    <Flex flexDirection="column" gap="x2">
      <Flex flexDirection="row" alignItems="baseline" gap="half">
        <Heading1 compact>Row Spanning</Heading1>
        <VerticalDivider />
        <Checkbox labelText="Show group outline" checked={outlined} onChange={() => setOutlined(!outlined)} />
      </Flex>
      <DescriptionList layout="stacked" columns={3}>
        <DescriptionGroup>
          <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
          <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
        </DescriptionGroup>
        <DescriptionGroup>
          <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
          <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
        </DescriptionGroup>
        <DescriptionGroup rowSpan={3}>
          <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
          <OutlinedDd $outlined={outlined}>This value is very long and it will span 3 rows</OutlinedDd>
        </DescriptionGroup>
        <DescriptionGroup>
          <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
          <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
        </DescriptionGroup>
      </DescriptionList>
    </Flex>
  );
};

export const ColumnAndRowSpanning = () => {
  const [outlined, setOutlined] = useState(true);

  return (
    <Flex flexDirection="column" gap="x2">
      <Flex flexDirection="row" alignItems="baseline" gap="half">
        <Heading1 compact>Column and Row Spanning</Heading1>
        <VerticalDivider />
        <Checkbox labelText="Show group outline" checked={outlined} onChange={() => setOutlined(!outlined)} />
      </Flex>
      <DescriptionList layout="stacked" columns={3}>
        <DescriptionGroup>
          <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
          <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
        </DescriptionGroup>
        <DescriptionGroup>
          <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
          <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
        </DescriptionGroup>
        <DescriptionGroup>
          <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
          <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
        </DescriptionGroup>
        <DescriptionGroup rowSpan={2} columnSpan={2}>
          <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
          <OutlinedDd $outlined={outlined}>This value spans both rows and columns</OutlinedDd>
        </DescriptionGroup>
        <DescriptionGroup>
          <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
          <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
        </DescriptionGroup>
        <DescriptionGroup>
          <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
          <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
        </DescriptionGroup>
      </DescriptionList>
    </Flex>
  );
};
