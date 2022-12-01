import React from "react";
import { StatusIndicator } from "../StatusIndicator";
import SummaryItem from "./SummaryItem";
import Summary from "./Summary";
import SummaryDivider from "./SummaryDivider";

export function Default() {
  return (
    <Summary>
      <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
      <SummaryItem value={100} status={<StatusIndicator type="danger">On Time</StatusIndicator>} />
      <SummaryItem value={200} status={<StatusIndicator type="neutral">On Time</StatusIndicator>} />

      <SummaryDivider />

      <SummaryItem value={12} status={<StatusIndicator type="success">On Time</StatusIndicator>} />
    </Summary>
  );
}

export function WithMainInfoOnly() {
  return (
    <Summary>
      <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
      <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
      <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
    </Summary>
  );
}

export default {
  title: "Components/Summary",
  parameters: {
    backgrounds: {
      default: "whiteGrey",
      values: [{ name: "whiteGrey", value: "#F0F2F5" }],
    },
  },
};
