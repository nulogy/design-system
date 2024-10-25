import React from "react";
import { Button, DangerButton, PrimaryButton, QuietButton } from "../Button";
import { Select } from "../Select";
import { AsyncSelect } from "../AsyncSelect";
import { Flex } from "../Flex";
import { Heading2, Heading4 } from "../Type";
import { Alert } from "../Alert";
import { Banner } from "../Banner";
import { Card, CardSet } from "../Card";
import { loadMatchingProvinces } from "../AsyncSelect/fixtures";

export const KitchenSink = () => {
  return (
    <Flex flexDirection="column" gap="x3">
      <Group name="Button">
        <Component name="Medium size (default)">
          <Button>Secondary Button</Button>
          <PrimaryButton>Primary Button</PrimaryButton>
          <DangerButton>Danger Button</DangerButton>
          <QuietButton>Quiet Button</QuietButton>
        </Component>
        <Component name="Small size">
          <Button size="small">Secondary Button</Button>
          <PrimaryButton size="small">Primary Button</PrimaryButton>
          <DangerButton size="small">Danger Button</DangerButton>
          <QuietButton size="small">Quiet Button</QuietButton>
        </Component>
      </Group>

      <Group name="Select">
        <Select
          options={[
            { value: "accepted", label: "Accepted" },
            { value: "assigned", label: "Assigned to a line" },
          ]}
          labelText="Status"
        />
      </Group>
      <Group name="AsyncSelect">
        <AsyncSelect placeholder="Enter a province" labelText="Province" loadOptions={loadMatchingProvinces} />
      </Group>
      <Group name="Alert">
        {(["danger", "informative", "success", "warning"] as const).map((type) => (
          <Alert key={type} type={type} title={type}>
            This is an alert with type &quot;{type}&quot;
          </Alert>
        ))}
      </Group>
      <Group name="Banner">
        {(["danger", "informative", "success", "warning"] as const).map((type) => (
          <Banner key={type} type={type} title={type}>
            This is a banner with type &quot;{type}&quot;
          </Banner>
        ))}
      </Group>
      <Group name="Cards">
        <CardSet>
          <Card>I am a 1st card in a cardset.</Card>
          <Card>I am a 2nd card in a cardset.</Card>
          <Card>I am a 3rd card in a cardset.</Card>
        </CardSet>
      </Group>
    </Flex>
  );
};

function Component({ name, children }: { name?: string; children: React.ReactNode }) {
  return (
    <Flex flexDirection="column">
      {name && <Heading4>{name}</Heading4>}
      <Flex gap="x1">{children}</Flex>
    </Flex>
  );
}

function Group({ name, children }: { name?: string; children: React.ReactNode }) {
  return (
    <Flex flexDirection="column" gap="x2">
      <Heading2 mb="0">{name}</Heading2>
      {children}
    </Flex>
  );
}

export default {
  title: "KitchenSink/VisualTests",
};

// export { ButtonGroup } from "./ButtonGroup";
// export { Card, CardSet } from "./Card";
// export { Checkbox, CheckboxGroup } from "./Checkbox";
// export { DatePicker } from "./DatePicker";
// export { DateRange } from "./DateRange";
// export { Divider } from "./Divider";
// export { DropdownButton, DropdownItem, DropdownLink, DropdownMenu, DropdownText } from "./DropdownMenu";
// export { FieldLabel, HelpText, RequirementText } from "./FieldLabel";
// export { Flex } from "./Flex";
// export { Field, Fieldset, Form, FormSection } from "./Form";
// export { Icon, InlineIcon } from "./Icon";
// export { Input } from "./Input";
// export { ApplicationFrame, Header, Page, Sidebar } from "./Layout";
// export { Link } from "./Link";
// export { List, ListItem } from "./List";
// export { LoadingAnimation } from "./LoadingAnimation";
// export { ALL_NDS_LOCALES } from "./locales.const";
// export { Modal } from "./Modal";
// export { NavBar } from "./NavBar";
// export { NDSProvider } from "./NDSProvider";
// export { Overlay } from "./Overlay";
// export { Pagination } from "./Pagination";
// export { Radio, RadioGroup } from "./Radio";
// export { RangeContainer } from "./RangeContainer";
// export {
//   Select,
//   SelectClearIndicator,
//   SelectContainer,
//   SelectControl,
//   SelectDropdownIndicator,
//   SelectInput,
//   SelectMenu,
//   SelectMultiValue,
//   SelectOption,
// } from "./Select";
// export { SortingTable } from "./SortingTable";
// export { StatusIndicator, StatusIndicatorValues } from "./StatusIndicator";
// export type { StatusIndicatorType } from "./StatusIndicator";
// export { addStyledProps } from "./StyledProps";
// export type { StyledProps } from "./StyledProps";
// export { Summary, SummaryDivider, SummaryItem } from "./Summary/index";
// export { Switch, Switcher } from "./Switcher";
// export { Table } from "./Table";
// export type { TableCellInfoType, TableColumnType, TableProps, TableRowType } from "./Table";
// export { Tab, Tabs } from "./Tabs";
// export { Textarea } from "./Textarea";
// export type { ThemeType, DefaultNDSThemeType } from "./theme.type";
// export { TimePicker } from "./TimePicker";
// export { TimeRange } from "./TimeRange";
// export { Toast } from "./Toast";
// export { ToastContainer, toast } from "./ToastContainer";
// export { Toggle } from "./Toggle";
// export { Tooltip } from "./Tooltip";
// export { TruncatedText } from "./TruncatedText";
// export { Heading1, Heading2, Heading3, Heading4, Text } from "./Type";
// export type { TextProps } from "./Type";
// export { useWindowDimensions } from "./utils";
// export { InlineValidation } from "./Validation";
