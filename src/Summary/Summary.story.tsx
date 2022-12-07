import React from "react";
import { StatusIndicator } from "../StatusIndicator";
import { Summary, SummaryDivider, SummaryItem } from "..";

export function Default() {
  return (
    <Summary>
      <SummaryItem value={2} status={<StatusIndicator type="danger">Missed</StatusIndicator>} />
      <SummaryItem value={42} status={<StatusIndicator type="warning">Delayed</StatusIndicator>} />
      <SummaryItem value={139} status={<StatusIndicator type="neutral">On Time</StatusIndicator>} />

      <SummaryDivider />

      <SummaryItem value={12} status={<StatusIndicator type="success">Delivered</StatusIndicator>} />
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
};
