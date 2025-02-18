import { transparentize } from "polished";
import React, { useState } from "react";
import styled from "styled-components";
import { Checkbox } from "../Checkbox";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { StatusIndicator } from "../StatusIndicator";
import { Tooltip } from "../Tooltip";
import { Heading3, Heading4, Text } from "../Type";
import { Select } from "../Select";
import { Input } from "../Input";
import { Box } from "../Box";
import Sidebar from "../Layout/Sidebar";
import { Divider as HorizontalDivider } from "../Divider";
import { Textarea } from "../Textarea";
import { dashed } from "../utils/story/dashed";
import { Button, QuietButton } from "../Button";
import { DescriptionList } from "./DescriptionList";
import type { Layout, Density as DensityType } from "./DescriptionList";
import { Dd, DGroup, Dt } from "./DescriptionList.parts";

export default {
  title: "Components/DescriptionList",
  component: DescriptionList,
};

const ColouredDt = styled(Dt)<{ $coloured: boolean }>(({ $coloured, theme }) => ({
  backgroundClip: "content-box",
  backgroundColor: $coloured ? transparentize(0.9, theme.colors.categorical1) : undefined,
  transition: "background-color 0.25s ease-in-out",
}));

const ColouredDd = styled(Dd)<{ $coloured: boolean }>(({ $coloured, theme }) => ({
  backgroundClip: "content-box",
  backgroundColor: $coloured ? transparentize(0.9, theme.colors.categorical2) : undefined,
  transition: "background-color 0.25s ease-in-out",
}));

const DashedBox = dashed(Box);

const SampleContent = () => (
  <>
    <DGroup>
      <Dt>Customer</Dt>
      <Dd>Nulogy</Dd>
    </DGroup>
    <DGroup>
      <Dt>
        <Text display="inline-flex" alignItems="end">
          Order number
          <Tooltip tooltip="The unique identifier assigned to this order when it was placed by the customer.">
            <Icon icon="info" size="x3" paddingLeft="half" />
          </Tooltip>
        </Text>
      </Dt>
      <Dd>
        <Link href="/customer-details">P12-90381-2039</Link>
      </Dd>
    </DGroup>
    <DGroup>
      <Dt>Status</Dt>
      <Dd>
        <StatusIndicator type="success">Paid</StatusIndicator>
      </Dd>
    </DGroup>
    <DGroup>
      <Dt>Amount</Dt>
      <Dd>$202.12</Dd>
    </DGroup>
    <DGroup>
      <Dt>Amount after exchange</Dt>
      <Dd>
        <Flex as="span" alignItems="center" gap="half">
          US $202.12 <Icon icon="arrowForward" color="midGrey" /> CA $287.43
        </Flex>
      </Dd>
    </DGroup>
  </>
);

export function Inline() {
  return (
    <DescriptionList layout="inline">
      <SampleContent />
    </DescriptionList>
  );
}

export function Stacked() {
  return (
    <DescriptionList layout="stacked">
      <SampleContent />
    </DescriptionList>
  );
}

export function Auto() {
  return (
    <DescriptionList layout="auto" autoLayoutBreakpoint="640px">
      <SampleContent />
    </DescriptionList>
  );
}

export function Density() {
  return (
    <Flex flexDirection="column" gap="x4">
      <Heading3 compact>Density</Heading3>
      <Flex gap="x4">
        <Flex flexDirection="column" gap="x2" flex={1}>
          <Heading4>Compact</Heading4>
          <DescriptionList layout="stacked" density="compact">
            <SampleContent />
          </DescriptionList>
        </Flex>
        <Flex flexDirection="column" gap="x2" flex={1}>
          <Heading4>Medium</Heading4>
          <DescriptionList layout="stacked" density="medium">
            <SampleContent />
          </DescriptionList>
        </Flex>
        <Flex flexDirection="column" gap="x2" flex={1}>
          <Heading4>Relaxed</Heading4>
          <DescriptionList layout="stacked" density="relaxed">
            <SampleContent />
          </DescriptionList>
        </Flex>
      </Flex>
    </Flex>
  );
}

export function Divider() {
  return (
    <Flex
      gap="x4"
      flexDirection={{ extraSmall: "column", small: "row" }}
      alignItems={{ extraSmall: "stretch", small: "flex-start" }}
    >
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading3>Stacked</Heading3>
        <DescriptionList layout="stacked" showDivider>
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading3>Inline</Heading3>
        <DescriptionList layout="inline" descriptionTermMaxWidth="50%" showDivider>
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading3>Auto</Heading3>
        <DescriptionList layout="auto" autoLayoutBreakpoint="640px" showDivider>
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function FontSizeAndLineHeight() {
  return (
    <Flex
      gap="x4"
      flexDirection={{ extraSmall: "column", small: "row" }}
      alignItems={{ extraSmall: "stretch", small: "flex-start" }}
    >
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading4>Small font size, base line height</Heading4>
        <DescriptionList layout="stacked" fontSize="sm" lineHeight="base">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading4>Medium font size, base relaxed line height</Heading4>
        <DescriptionList layout="stacked" fontSize="md" lineHeight="baseRelaxed">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading4>Large font size, base line height</Heading4>
        <DescriptionList layout="stacked" fontSize="lg" lineHeight="base">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

FontSizeAndLineHeight.story = {
  name: "Font size & line height",
};

export function GroupMinWidth() {
  return (
    <Flex flexDirection="column" gap="x4">
      <Flex flexDirection="column">
        <Heading3 compact>Group min width</Heading3>
        <Text fontSize="sm" mb="x4">
          The group min width is set to 200px. The first column will be 200px wide and the second column will take the
        </Text>
        <DescriptionList groupMinWidth="200px">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function Columns() {
  const [coloured, setColoured] = useState(false);

  return (
    <Flex flexDirection="column" gap="x4">
      <Heading3>Columns</Heading3>
      <Checkbox labelText="Show outline" checked={coloured} onChange={() => setColoured(!coloured)} />
      <Flex flexDirection="column">
        <Heading4>The number of columns is set to 2</Heading4>
        <DescriptionList columns={2}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column">
        <Heading4>The number of columns is set to 3</Heading4>
        <DescriptionList columns={3}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column">
        <Heading4>The number of columns is set to 4</Heading4>
        <DescriptionList columns={4}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column">
        <Heading4>Extra small: 1 column, Small: 2 columns, Medium: 3 columns, Large: 6 columns</Heading4>
        <DescriptionList columns={{ extraSmall: 1, small: 2, medium: 3, large: 6 }}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function WithColumnSpan() {
  const [coloured, setColoured] = useState(false);

  return (
    <Flex flexDirection="column" gap="x4">
      <label htmlFor="coloured">
        <Checkbox
          id="coloured"
          labelText="Show outline"
          defaultChecked={coloured}
          onClick={() => setColoured(!coloured)}
        />
      </label>
      <Flex flexDirection="column" gap="x2">
        <Heading3>2 columns, span 2</Heading3>
        <DescriptionList layout="stacked" columns={2}>
          <DGroup columnSpan={2}>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>3 columns, span 3</Heading3>
        <DescriptionList layout="stacked" columns={3}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup columnSpan={3}>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>This value is very long and it will span 3 columns</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>4 columns, span 4</Heading3>
        <DescriptionList layout="stacked" columns={4}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup columnSpan={4}>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>
              This value is very long and it spans 4 columns, so it will take the space of 4 columns and not wrap
            </ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>
              This value is very long but it only spans 1 column, so it will only take the space of 1 column
            </ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function WithRowSpan() {
  const [coloured, setColoured] = useState(false);

  return (
    <Flex flexDirection="column" gap="x4">
      <Checkbox labelText="Show outline" checked={coloured} onChange={() => setColoured(!coloured)} />
      <Flex flexDirection="column" gap="x2">
        <Heading3>2 columns, span 2</Heading3>
        <DescriptionList layout="stacked" columns={2}>
          <DGroup rowSpan={2}>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>3 columns, span 3</Heading3>
        <DescriptionList layout="stacked" columns={3}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup rowSpan={3}>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>This value is very long and it will span 3 columns</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>4 columns, span 4</Heading3>
        <DescriptionList layout="stacked" columns={4}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup rowSpan={4}>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>
              This value is very long and it spans 4 rows, so it will take the space of 4 rows and not wrap
            </ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>
              This value is very long but it only spans 1 row, so it will only take the space of 1 row
            </ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function WithColumnAndRowSpan() {
  const [coloured, setColoured] = useState(false);

  return (
    <Flex flexDirection="column" gap="x4">
      <Checkbox labelText="Show outline" checked={coloured} onChange={() => setColoured(!coloured)} />
      <Flex flexDirection="column" gap="x2">
        <Heading3>2 columns, span 2</Heading3>
        <DescriptionList layout="stacked" columns={3}>
          <DGroup rowSpan={2} columnSpan={2}>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>3 columns, span 3</Heading3>
        <DescriptionList layout="stacked" columns={3}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup rowSpan={3} columnSpan={3}>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>This value is very long and it will span 3 columns</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 4</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 6</ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>4 columns, span 4</Heading3>
        <DescriptionList layout="stacked" columns={4}>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 1</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 1</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 2</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 2</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 3</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 3</ColouredDd>
          </DGroup>
          <DGroup rowSpan={4} columnSpan={4}>
            <ColouredDt $coloured={coloured}>Key 4</ColouredDt>
            <ColouredDd $coloured={coloured}>
              This value is very long and it spans 4 rows, so it will take the space of 4 rows and not wrap
            </ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 5</ColouredDt>
            <ColouredDd $coloured={coloured}>Value 5</ColouredDd>
          </DGroup>
          <DGroup>
            <ColouredDt $coloured={coloured}>Key 6</ColouredDt>
            <ColouredDd $coloured={coloured}>
              This value is very long but it only spans 1 row, so it will only take the space of 1 row
            </ColouredDd>
          </DGroup>
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function Playground() {
  const [coloured, setColoured] = useState(false);
  const [containerOutline, setContainerOutline] = useState(true);
  const [layout, setLayout] = useState<Layout>("stacked");
  const [density, setDensity] = useState<DensityType>("medium");
  const [columns, setColumns] = useState<number | undefined>(undefined);
  const [groupMinWidth, setGroupMinWidth] = useState<string | undefined>(undefined);
  const [containerWidth, setContainerWidth] = useState<string | undefined>("720px");
  const [showDivider, setShowDivider] = useState(false);
  const [autoLayoutBreakpoint, setAutoLayoutBreakpoint] = useState("640px");
  const [rowSpan, setRowSpan] = useState(0);
  const [columnSpan, setColumnSpan] = useState(0);
  const [additionalGroups, setAdditionalGroups] = useState<
    Array<{ dt: string; dd: string; rowSpan: number; columnSpan: number }>
  >([]);
  const [DtValue, setDtValue] = useState("Key");
  const [DdValue, setDdValue] = useState("Value");

  const updateGroup = (index: number, updates: Partial<(typeof additionalGroups)[0]>) => {
    setAdditionalGroups((groups) => groups.map((group, i) => (i === index ? { ...group, ...updates } : group)));
  };

  const deleteGroup = (index: number) => {
    setAdditionalGroups((groups) => groups.filter((_, i) => i !== index));
  };

  const DescriptionListElement = (
    <DescriptionList
      layout={layout}
      density={density}
      columns={columns}
      groupMinWidth={groupMinWidth}
      showDivider={showDivider}
      autoLayoutBreakpoint={autoLayoutBreakpoint}
    >
      <DGroup>
        <ColouredDt $coloured={coloured}>Customer</ColouredDt>
        <ColouredDd $coloured={coloured}>Nulogy</ColouredDd>
      </DGroup>
      <DGroup>
        <ColouredDt $coloured={coloured}>Order number</ColouredDt>
        <ColouredDd $coloured={coloured}>
          <Link href="/customer-details">P12-90381-2039</Link>
        </ColouredDd>
      </DGroup>
      <DGroup>
        <ColouredDt $coloured={coloured}>Status</ColouredDt>
        <ColouredDd $coloured={coloured}>
          <StatusIndicator type="success">Paid</StatusIndicator>
        </ColouredDd>
      </DGroup>
      <DGroup>
        <ColouredDt $coloured={coloured}>Amount</ColouredDt>
        <ColouredDd $coloured={coloured}>$202.12</ColouredDd>
      </DGroup>
      {additionalGroups.map((group, index) => (
        <DGroup rowSpan={group.rowSpan} columnSpan={group.columnSpan} key={index}>
          <ColouredDt $coloured={coloured}>{group.dt}</ColouredDt>
          <ColouredDd $coloured={coloured}>{group.dd}</ColouredDd>
        </DGroup>
      ))}
    </DescriptionList>
  );

  const addRandomGroup = () => {
    setAdditionalGroups([
      ...additionalGroups,
      {
        dt: DtValue,
        dd: DdValue,
        rowSpan: rowSpan,
        columnSpan: columnSpan,
      },
    ]);
  };

  const removeLastGroup = () => {
    setAdditionalGroups(additionalGroups.slice(0, -1));
  };

  return (
    <Flex>
      <Sidebar
        height="100%"
        width="450px"
        hideCloseButton
        isOpen
        title="Controls"
        overlay={false}
        top="0px"
        bottom="0px"
      >
        <Flex flexDirection="column" gap="x2">
          <Flex gap="x2" flexDirection="column">
            <Select
              value={layout}
              onChange={(value) => setLayout(value as Layout)}
              options={[
                { value: "stacked", label: "Stacked" },
                { value: "inline", label: "Inline" },
                { value: "auto", label: "Auto" },
              ]}
              labelText="Layout"
            />
            <Input
              value={autoLayoutBreakpoint}
              onChange={(e) => setAutoLayoutBreakpoint(e.target.value)}
              labelText="Auto Layout Breakpoint"
              placeholder="e.g., 640px"
              disabled={layout !== "auto"}
            />
          </Flex>
          <Select
            value={density}
            onChange={(value) => setDensity(value as DensityType)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "medium", label: "Medium" },
              { value: "relaxed", label: "Relaxed" },
            ]}
            labelText="Density"
          />
          <Input
            type="number"
            value={columns?.toString() ?? ""}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined;
              setColumns(value);
              if (value) setGroupMinWidth(undefined);
            }}
            labelText="Columns"
            placeholder="Number of columns"
          />
          <Input
            value={groupMinWidth ?? ""}
            onChange={(e) => {
              const value = e.target.value || undefined;
              setGroupMinWidth(value);
              if (value) setColumns(undefined);
            }}
            labelText="Group Min Width"
            placeholder="e.g., 200px"
            disabled={!!columns}
          />
          <Checkbox labelText="Show divider" checked={showDivider} onChange={() => setShowDivider(!showDivider)} />
          <HorizontalDivider />
          <Text fontWeight="bold">Debugging</Text>
          <Checkbox labelText="Show Group outline" checked={coloured} onChange={() => setColoured(!coloured)} />
          <Input
            value={containerWidth}
            onChange={(e) => setContainerWidth(e.target.value)}
            labelText="Container Width"
            placeholder="e.g., 720px"
          />
          <Checkbox
            labelText="Show container outline"
            checked={containerOutline}
            onChange={() => setContainerOutline(!containerOutline)}
          />

          <HorizontalDivider />
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold">Additional Groups</Text>
            <Button onClick={addRandomGroup} icon="add" iconSide="left">
              Add
            </Button>
          </Flex>
          <Box>
            {additionalGroups.length === 0 && (
              <Text fontSize="sm" color="midGrey">
                No additional groups
              </Text>
            )}
            <Flex flexDirection="column" gap="x2">
              {additionalGroups.map((group, index) => (
                <>
                  {index > 0 && <HorizontalDivider secondary />}
                  <Box key={index}>
                    <Flex justifyContent="space-between" alignItems="center" mb="x2">
                      <Text>Group {index + 1}</Text>
                      <QuietButton size="small" onClick={() => deleteGroup(index)}>
                        Delete
                      </QuietButton>
                    </Flex>
                    <Flex flexDirection="column" gap="x2">
                      <Input
                        value={group.dt}
                        onChange={(e) => updateGroup(index, { dt: e.target.value })}
                        labelText="Description Term"
                      />
                      <Textarea
                        value={group.dd}
                        onChange={(e) => updateGroup(index, { dd: e.target.value })}
                        labelText="Description Data"
                      />
                      <Flex gap="x2">
                        <Input
                          type="number"
                          value={group.rowSpan}
                          onChange={(e) => updateGroup(index, { rowSpan: Number(e.target.value) })}
                          labelText="Row Span"
                          min={1}
                        />
                        <Input
                          type="number"
                          value={group.columnSpan}
                          onChange={(e) => updateGroup(index, { columnSpan: Number(e.target.value) })}
                          labelText="Column Span"
                          min={1}
                        />
                      </Flex>
                    </Flex>
                  </Box>
                </>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Sidebar>
      <Box flex={1}>
        <Heading3 mb="x3">Playground</Heading3>
        {containerOutline ? (
          <DashedBox flex={1} width={containerWidth}>
            {DescriptionListElement}
          </DashedBox>
        ) : (
          <Box flex={1} width={containerWidth}>
            {DescriptionListElement}
          </Box>
        )}
      </Box>
    </Flex>
  );
}

Playground.parameters = {
  chromatic: { disable: true },
};
