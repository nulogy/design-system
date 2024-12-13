import React from "react";
import { Flex } from "../Flex";
import { Heading4, Text } from "../Type";
import { Link } from "../Link";
import { Icon } from "../Icon";
import { StatusIndicator } from "../StatusIndicator";
import { DescriptionDetails, DescriptionList, DescriptionTerm } from ".";

export default {
  title: "Components/DescriptionList",
  component: DescriptionList,
};

const SampleContent = () => (
  <>
    <DescriptionTerm>Customer</DescriptionTerm>
    <DescriptionDetails>Nulogy</DescriptionDetails>
    <DescriptionTerm>
      <Text display="inline-flex" alignItems="end">
        Order number
        <Icon icon="info" size="x3" paddingLeft="half" />
      </Text>
    </DescriptionTerm>
    <DescriptionDetails>
      <Link href="/customer-details">P12-90381-2039</Link>
    </DescriptionDetails>
    <DescriptionTerm>Status</DescriptionTerm>
    <DescriptionDetails>
      <StatusIndicator type="success">Paid</StatusIndicator>
    </DescriptionDetails>
    <DescriptionTerm>Amount</DescriptionTerm>
    <DescriptionDetails>$202.12</DescriptionDetails>
    <DescriptionTerm>Amount after exchange</DescriptionTerm>
    <DescriptionDetails>
      <Flex as="span" alignItems="center" gap="half">
        US $202.12 <Icon icon="arrowForward" color="midGrey" /> CA $287.43
      </Flex>
    </DescriptionDetails>
  </>
);

export function Layout() {
  return (
    <Flex flexDirection="column" gap="x8">
      <Flex flexDirection="column" gap="x1" flex="1">
        <Heading4>Auto Layout (Default)</Heading4>
        <DescriptionList layout="auto">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x1" flex="1">
        <Heading4>Stacked Layout</Heading4>
        <DescriptionList layout="stacked">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x1" flex="1">
        <Heading4>Inline Layout</Heading4>
        <DescriptionList layout="inline">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function Density() {
  return (
    <Flex gap="x8" flexDirection="column">
      <Flex flexDirection="column" gap="x1">
        <Heading4>Compact Density</Heading4>
        <Flex>
          <DescriptionList density="compact" layout="stacked">
            <SampleContent />
          </DescriptionList>
          <DescriptionList density="compact" layout="inline">
            <SampleContent />
          </DescriptionList>
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap="x1">
        <Heading4>Medium Density (Default)</Heading4>
        <Flex>
          <DescriptionList density="medium" layout="stacked">
            <SampleContent />
          </DescriptionList>
          <DescriptionList density="medium" layout="inline">
            <SampleContent />
          </DescriptionList>
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap="x1">
        <Heading4>Relaxed Density</Heading4>
        <Flex>
          <DescriptionList density="relaxed" layout="stacked">
            <SampleContent />
          </DescriptionList>
          <DescriptionList density="relaxed" layout="inline">
            <SampleContent />
          </DescriptionList>
        </Flex>
      </Flex>
    </Flex>
  );
}

export function FontSize() {
  return (
    <Flex gap="x8">
      <Flex flexDirection="column" gap="x1" flexBasis="100%">
        <Heading4>Smaller Font Size</Heading4>
        <DescriptionList fontSize="smaller">
          <SampleContent />
        </DescriptionList>
      </Flex>

      <Flex flexDirection="column" gap="x1" flexBasis="100%">
        <Heading4>Small Font Size</Heading4>
        <DescriptionList fontSize="small">
          <SampleContent />
        </DescriptionList>
      </Flex>

      <Flex flexDirection="column" gap="x1" flexBasis="100%">
        <Heading4>Medium Font Size (Default)</Heading4>
        <DescriptionList fontSize="medium">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function Divider() {
  return (
    <Flex gap="x8">
      <Flex flexDirection="column" gap="x1" flexBasis="100%">
        <Heading4>With Dividers (Stacked layout)</Heading4>
        <DescriptionList showDivider layout="stacked">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x1" flexBasis="100%">
        <Heading4>With Dividers (Inline layout)</Heading4>
        <DescriptionList showDivider layout="inline">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function AutoLayoutCustomBreakpoint() {
  return (
    <Flex gap="x8" flexDirection="column">
      <Flex flexDirection="column" gap="x1">
        <Heading4>Auto layout custom breakpoint (800px)</Heading4>
        <DescriptionList layout="auto" autoLayoutBreakpoint="800px">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function CustomDescriptionTermWidth() {
  return (
    <Flex gap="x8" flexDirection="column">
      <Flex flexDirection="column" gap="x1">
        <Heading4>Custom description term max-width (33.33%)</Heading4>
        <DescriptionList layout="inline" descriptionTermMaxWidth="30%">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x1">
        <Heading4>Custom description term max-width (320px)</Heading4>
        <DescriptionList layout="inline" descriptionTermMaxWidth="320px">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x1">
        <Heading4>Custom description term max-width (20em)</Heading4>
        <DescriptionList layout="inline" descriptionTermMaxWidth="20em">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function CombinedFeatures() {
  return (
    <Flex gap="x8" flexDirection="column">
      <Flex flexDirection="column" gap="x1">
        <Heading4>
          Auto Layout, divider, compact density, small font, 40% term width, 720px auto layout breakpoint
        </Heading4>
        <DescriptionList
          showDivider
          density="compact"
          fontSize="small"
          descriptionTermMaxWidth="40%"
          autoLayoutBreakpoint="720px"
        >
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x1">
        <Heading4>Stacked, no dividers, relaxed, large font</Heading4>
        <DescriptionList layout="stacked" density="relaxed" fontSize="large">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}
