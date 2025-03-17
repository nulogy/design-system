import React from "react";
import { AppTag } from "..";
import type { AppName } from "../constants";
import { APP_DISPLAY_NAMES } from "../constants";
import { Table } from "../../Table";
import { Flex } from "../../Flex";
import { Heading1 } from "../../Type";

export default {
  title: "Components/AppTag",
  component: AppTag,
};

export const Default = () => {
  const appNames = Object.keys(APP_DISPLAY_NAMES) as AppName[];

  const columns = [
    { label: "Application Name", dataKey: "name", width: "25%" },
    { label: "Active (default)", dataKey: "active", width: "25%" },
    { label: "Inactive", dataKey: "inactive", width: "25%" },
    { label: "Interactive", dataKey: "interactive", width: "25%" },
  ];

  const rows = appNames.map((appName) => ({
    id: appName,
    name: APP_DISPLAY_NAMES[appName],
    active: <AppTag app={appName} type="active" />,
    inactive: <AppTag app={appName} type="inactive" />,
    interactive: <AppTag app={appName} type="interactive" />,
  }));

  return <Table rowHovers={false} columns={columns} rows={rows} />;
};

export const WithoutATooltip = () => {
  const appNames = Object.keys(APP_DISPLAY_NAMES) as AppName[];

  return (
    <Flex flexDirection="column" gap="x2">
      <Heading1 compact>AppTag without tooltip</Heading1>
      <Flex gap="x2">
        {appNames.map((appName) => (
          <AppTag key={appName} app={appName} type="active" hideTooltip />
        ))}
      </Flex>
    </Flex>
  );
};

WithoutATooltip.storyName = "Without a tooltip";
