import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Box } from "../../Box";
import { IconicButton } from "../../Button";
import { Checkbox } from "../../Checkbox";
import { Divider as HorizontalDivider } from "../../Divider";
import { Flex } from "../../Flex";
import { Input } from "../../Input";
import Sidebar from "../../Layout/Sidebar";
import { NDSOptionValue, Select } from "../../Select";
import { Textarea } from "../../Textarea";
import { DefaultNDSThemeType } from "../../theme";
import { Breakpoints } from "../../theme/theme.type";
import { Heading1, Text } from "../../Type";
import DescriptionList from "../DescriptionList";
import { DescriptionGroup } from "../DescriptionList.parts";
import type { Layout, Density as DensityType } from "../lib/types";
import { Link } from "../../Link";
import { StatusIndicator } from "../../StatusIndicator";
import { Resizable } from "../../utils/story/resizable";
import { OutlinedDt, OutlinedDd } from "./fixtures";

export const Playground = () => {
  const [hoveredGroupIndex, setHoveredGroupIndex] = useState<number | null>(null);
  const [outlined, setOutlined] = useState(false);
  const [containerOutline, setContainerOutline] = useState(true);
  const [layout, setLayout] = useState<Layout>("stacked");
  const [density, setDensity] = useState<DensityType>("medium");
  const [descriptionTermMaxWidth, setDescriptionTermMaxWidth] = useState("320px");
  const [fontSize, setFontSize] = useState<keyof DefaultNDSThemeType["fontSizes"]>("medium");
  const [lineHeight, setLineHeight] = useState<keyof DefaultNDSThemeType["lineHeights"]>("base");
  const initialBreakpointColumns = [{ breakpoint: "extraSmall" as keyof Breakpoints, columns: 1 }];
  const [columns, setColumns] = useState<number | Partial<Record<keyof Breakpoints, number>> | undefined>(1);
  const [breakpointColumns, setBreakpointColumns] =
    useState<Array<{ breakpoint: keyof Breakpoints; columns: number }>>(initialBreakpointColumns);
  const [groupMinWidth, setGroupMinWidth] = useState<string | undefined>(undefined);
  const [containerWidth, setContainerWidth] = useState<string | undefined>("720px");
  const [showDivider, setShowDivider] = useState(false);
  const [autoLayoutBreakpoint, setAutoLayoutBreakpoint] = useState("640px");
  const [rowSpan] = useState(0);
  const [columnSpan] = useState(0);
  const [additionalGroups, setAdditionalGroups] = useState<
    Array<{ dt: string; dd: string; rowSpan: number; columnSpan: number; isExpanded: boolean }>
  >([]);
  const [DtValue] = useState("Key");
  const [DdValue] = useState("Value");
  const theme = useTheme();

  const updateGroup = (index: number, updates: Partial<(typeof additionalGroups)[0]>) => {
    setAdditionalGroups((groups) =>
      groups.map((group, i) => {
        if (i === index) {
          return { ...group, ...updates };
        }
        return group;
      })
    );
  };

  const deleteGroup = (index: number) => {
    setAdditionalGroups((groups) => groups.filter((_, i) => i !== index));
  };

  const addRandomGroup = () => {
    setAdditionalGroups([
      ...additionalGroups,
      {
        dt: DtValue,
        dd: DdValue,
        rowSpan: rowSpan,
        columnSpan: columnSpan,
        isExpanded: false,
      },
    ]);
  };

  const toggleGroupExpansion = (index: number) => {
    setAdditionalGroups((groups) =>
      groups.map((group, i) => (i === index ? { ...group, isExpanded: !group.isExpanded } : group))
    );
  };

  const DescriptionListElement = (
    // @ts-expect-error - This is not a valid use of the component, since we're passing both columns and groupMinWidth,
    // but it's needed for this story
    <DescriptionList
      layout={layout}
      density={density}
      columns={columns}
      groupMinWidth={groupMinWidth}
      showDivider={showDivider}
      autoLayoutBreakpoint={autoLayoutBreakpoint}
      descriptionTermMaxWidth={descriptionTermMaxWidth}
      fontSize={fontSize}
      lineHeight={lineHeight}
    >
      <DescriptionGroup>
        <OutlinedDt $outlined={outlined} $highlighted={false}>
          Customer
        </OutlinedDt>
        <OutlinedDd $outlined={outlined} $highlighted={false}>
          Nulogy
        </OutlinedDd>
      </DescriptionGroup>
      <DescriptionGroup>
        <OutlinedDt $outlined={outlined} $highlighted={false}>
          Order number
        </OutlinedDt>
        <OutlinedDd $outlined={outlined} $highlighted={false}>
          <Link href="/customer-details">P12-90381-2039</Link>
        </OutlinedDd>
      </DescriptionGroup>
      <DescriptionGroup>
        <OutlinedDt $outlined={outlined} $highlighted={false}>
          Status
        </OutlinedDt>
        <OutlinedDd $outlined={outlined} $highlighted={false}>
          <StatusIndicator type="success">Paid</StatusIndicator>
        </OutlinedDd>
      </DescriptionGroup>
      <DescriptionGroup>
        <OutlinedDt $outlined={outlined} $highlighted={false}>
          Amount
        </OutlinedDt>
        <OutlinedDd $outlined={outlined} $highlighted={false}>
          $202.12
        </OutlinedDd>
      </DescriptionGroup>
      {additionalGroups.map((group, index) => (
        <DescriptionGroup rowSpan={group.rowSpan} columnSpan={group.columnSpan} key={index}>
          <OutlinedDt $outlined={outlined} $highlighted={hoveredGroupIndex === index}>
            {group.dt}
          </OutlinedDt>
          <OutlinedDd $outlined={outlined} $highlighted={hoveredGroupIndex === index}>
            {group.dd}
          </OutlinedDd>
        </DescriptionGroup>
      ))}
    </DescriptionList>
  );

  return (
    <Flex>
      <Sidebar
        height="100%"
        width="450px"
        hideCloseButton
        isOpen
        title="Controls"
        overlay="hide"
        top="0px"
        bottom="0px"
      >
        <Flex flexDirection="column" gap="x2">
          <Flex gap="x2" flexDirection="column">
            <Input
              value={descriptionTermMaxWidth}
              onChange={(e) => setDescriptionTermMaxWidth(e.target.value)}
              labelText="Description Term Max Width"
              placeholder="e.g., 320px"
            />
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
          <Select
            value={fontSize}
            onChange={(value) => setFontSize(value as keyof DefaultNDSThemeType["fontSizes"])}
            options={Object.keys(theme.fontSizes).map((size) => ({
              value: size,
              label: size,
            }))}
            labelText="Font Size"
          />
          <Select
            value={lineHeight}
            onChange={(value) => setLineHeight(value as keyof DefaultNDSThemeType["lineHeights"])}
            options={Object.keys(theme.lineHeights).map((height) => ({
              value: height,
              label: height,
            }))}
            labelText="Line Height"
          />
          <Flex flexDirection="column" gap="x2">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold">Columns</Text>
              <IconicButton
                onClick={() => {
                  const currentColumnValue = breakpointColumns[0].columns;
                  const availableBreakpoints = Object.keys(theme.breakpoints).filter(
                    (breakpoint) =>
                      !breakpointColumns.some((col) => col.breakpoint === breakpoint || breakpoint === "map")
                  );

                  if (breakpointColumns.length === 1) {
                    // First time adding a breakpoint, convert the single column to a breakpoint
                    const firstBreakpoint = breakpointColumns[0].breakpoint;
                    setBreakpointColumns([
                      { breakpoint: firstBreakpoint, columns: currentColumnValue },
                      { breakpoint: availableBreakpoints[0] as keyof Breakpoints, columns: currentColumnValue },
                    ]);
                    setColumns({
                      [firstBreakpoint]: currentColumnValue,
                      [availableBreakpoints[0]]: currentColumnValue,
                    });
                  } else {
                    // Add another breakpoint
                    const nextBreakpoint = availableBreakpoints[0] as keyof Breakpoints;
                    setBreakpointColumns([
                      ...breakpointColumns,
                      { breakpoint: nextBreakpoint, columns: currentColumnValue },
                    ]);
                    setColumns(
                      Object.fromEntries(
                        [...breakpointColumns, { breakpoint: nextBreakpoint, columns: currentColumnValue }].map(
                          ({ breakpoint, columns }) => [breakpoint, columns]
                        )
                      )
                    );
                  }
                }}
                icon="add"
                tooltip="Add column per breakpoint"
                disabled={breakpointColumns.length >= Object.keys(theme.breakpoints).length - 1}
              />
            </Flex>
            <Flex flexDirection="column" gap="x2">
              {breakpointColumns.map((breakpointColumn, index) => (
                <Flex key={index} gap="x2" alignItems="flex-end">
                  {breakpointColumns.length > 1 && (
                    <Select
                      minWidth="240px"
                      value={breakpointColumn.breakpoint}
                      onChange={(value: NDSOptionValue) => {
                        const newBreakpointColumns = [...breakpointColumns];
                        newBreakpointColumns[index] = { ...breakpointColumn, breakpoint: value as keyof Breakpoints };
                        setBreakpointColumns(newBreakpointColumns);
                        setColumns(
                          Object.fromEntries(
                            newBreakpointColumns.map(({ breakpoint, columns }) => [breakpoint, columns])
                          )
                        );
                      }}
                      options={Object.keys(theme.breakpoints)
                        .filter(
                          (breakpoint) =>
                            breakpoint === breakpointColumn.breakpoint ||
                            !breakpointColumns.some((col) => col.breakpoint === breakpoint || breakpoint === "map")
                        )
                        .map((breakpoint) => ({
                          value: breakpoint,
                          label: `${breakpoint} (${theme.breakpoints[breakpoint]})`,
                        }))}
                      labelText={index === 0 ? "Breakpoint" : undefined}
                    />
                  )}
                  <Input
                    inputWidth={breakpointColumns.length === 1 ? undefined : "95px"}
                    type="number"
                    value={breakpointColumn.columns}
                    onChange={(e) => {
                      const newValue = Math.max(1, Number(e.target.value));
                      const newBreakpointColumns = [...breakpointColumns];
                      newBreakpointColumns[index] = {
                        ...breakpointColumn,
                        columns: newValue,
                      };
                      setBreakpointColumns(newBreakpointColumns);
                      if (breakpointColumns.length === 1) {
                        setColumns(newValue);
                      } else {
                        setColumns(
                          Object.fromEntries(
                            newBreakpointColumns.map(({ breakpoint, columns }) => [breakpoint, columns])
                          )
                        );
                      }
                    }}
                    labelText={
                      breakpointColumns.length === 1 ? "Number of columns" : index === 0 ? "Columns" : undefined
                    }
                    placeholder="Number of columns"
                    min={1}
                  />
                  {breakpointColumns.length > 1 && (
                    <IconicButton
                      icon="delete"
                      onClick={() => {
                        const newBreakpointColumns = breakpointColumns.filter((_, i) => i !== index);
                        if (newBreakpointColumns.length === 1) {
                          // Convert back to single number when only one breakpoint remains
                          setColumns(newBreakpointColumns[0].columns);
                          setBreakpointColumns(newBreakpointColumns);
                        } else {
                          setBreakpointColumns(newBreakpointColumns);
                          setColumns(
                            Object.fromEntries(
                              newBreakpointColumns.map(({ breakpoint, columns }) => [breakpoint, columns])
                            )
                          );
                        }
                      }}
                    />
                  )}
                </Flex>
              ))}
            </Flex>
          </Flex>
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
          <Checkbox labelText="Show Group outline" checked={outlined} onChange={() => setOutlined(!outlined)} />
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
            <IconicButton onClick={addRandomGroup} icon="add" />
          </Flex>
          <Box>
            {additionalGroups.length === 0 && (
              <Text fontSize="sm" color="midGrey">
                No additional groups
              </Text>
            )}
            <Flex flexDirection="column">
              {additionalGroups.map((group, index) => (
                <>
                  {index > 0 && <HorizontalDivider />}
                  <Box
                    key={index}
                    onMouseEnter={() => setHoveredGroupIndex(index)}
                    onMouseLeave={() => setHoveredGroupIndex(null)}
                  >
                    <Flex justifyContent="space-between" alignItems="center" mb={group.isExpanded ? "x2" : "none"}>
                      <Flex alignItems="center" gap="x2">
                        <IconicButton
                          icon={group.isExpanded ? "downArrow" : "rightArrow"}
                          onClick={() => toggleGroupExpansion(index)}
                        />
                        <Text>Group {index + 1}</Text>
                      </Flex>
                      <IconicButton onClick={() => deleteGroup(index)} icon="delete" />
                    </Flex>
                    {group.isExpanded && (
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
                    )}
                  </Box>
                </>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Sidebar>
      <Box flex={1}>
        <Heading1 mb="x3">Playground</Heading1>
        <Resizable
          containerWidth={containerWidth}
          onResize={(width) => setContainerWidth(`${width}px`)}
          showContainerOutline={containerOutline}
        >
          {DescriptionListElement}
        </Resizable>
      </Box>
    </Flex>
  );
};

Playground.parameters = {
  chromatic: { disable: true },
};
