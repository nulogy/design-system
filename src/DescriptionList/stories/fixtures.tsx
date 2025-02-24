import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";
import { Box } from "../../Box";
import { Flex } from "../../Flex";
import { Icon } from "../../Icon";
import { Link } from "../../Link";
import { StatusIndicator } from "../../StatusIndicator";
import { Text } from "../../Type";
import { Tooltip } from "../../Tooltip";
import { dashed } from "../../utils/story/dashed";
import { DescriptionDetails, DescriptionGroup, DescriptionTerm } from "../DescriptionList.parts";

export const OutlinedDt = styled(DescriptionTerm)<{ $outlined: boolean; $highlighted?: boolean }>(
  ({ $outlined, $highlighted, theme }) => ({
    backgroundClip: "content-box",
    backgroundColor: $highlighted
      ? transparentize($outlined ? 0.7 : 0.9, theme.colors.categorical1)
      : $outlined
        ? transparentize(0.9, theme.colors.categorical1)
        : undefined,
    transition: "background-color 0.25s ease-in-out",
  })
);

export const OutlinedDd = styled(DescriptionDetails)<{ $outlined: boolean; $highlighted?: boolean }>(
  ({ $outlined, $highlighted, theme }) => ({
    backgroundClip: "content-box",
    backgroundColor: $highlighted
      ? transparentize($outlined ? 0.7 : 0.9, theme.colors.categorical2)
      : $outlined
        ? transparentize(0.9, theme.colors.categorical2)
        : undefined,
    transition: "background-color 0.25s ease-in-out",
  })
);

export const DashedBox = dashed(Box);

export const SampleContent = () => (
  <>
    <DescriptionGroup>
      <DescriptionTerm>Customer</DescriptionTerm>
      <DescriptionDetails>Nulogy</DescriptionDetails>
    </DescriptionGroup>
    <DescriptionGroup>
      <DescriptionTerm>
        <Text display="inline-flex" alignItems="center">
          Order number
          <Tooltip tooltip="The unique identifier assigned to this order when it was placed by the customer.">
            <Icon icon="info" size="x3" paddingLeft="half" />
          </Tooltip>
        </Text>
      </DescriptionTerm>
      <DescriptionDetails>
        <Link href="/customer-details">P12-90381-2039</Link>
      </DescriptionDetails>
    </DescriptionGroup>
    <DescriptionGroup>
      <DescriptionTerm>Status</DescriptionTerm>
      <DescriptionDetails>
        <StatusIndicator type="success">Paid</StatusIndicator>
      </DescriptionDetails>
    </DescriptionGroup>
    <DescriptionGroup>
      <DescriptionTerm>Amount</DescriptionTerm>
      <DescriptionDetails>$202.12</DescriptionDetails>
    </DescriptionGroup>
    <DescriptionGroup>
      <DescriptionTerm>Amount after exchange</DescriptionTerm>
      <DescriptionDetails>
        <Flex as="span" alignItems="center" gap="half">
          US $202.12 <Icon icon="arrowForward" color="midGrey" /> CA $287.43
        </Flex>
      </DescriptionDetails>
    </DescriptionGroup>
  </>
);
