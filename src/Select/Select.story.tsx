import { action } from "@storybook/addon-actions";
import { boolean, select, text } from "@storybook/addon-knobs";
import React, { useEffect, useRef, useState } from "react";
import { GroupBase, OptionProps } from "react-windowed-select";
import styled from "styled-components";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Button, Select, SelectOption, StatusIndicator, Text } from "../index";
import { NDSSelectProps } from "./Select";

const errorList = ["Error message 1", "Error message 2"];

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" },
];

const partnerCompanyName = [
  { value: "2", label: "PCN2 12387387484895884957848576867587685780" },
  { value: "4", label: "PCN4 12387387484895884957848576867587685780" },
  { value: "1", label: "PCN1 12387387484895884957848576867587685780" },
  { value: "9", label: "PCN9 12387387484895884957848576867587685780" },
  { value: "7", label: "PCN7 12387387484895884957848576867587685780" },
  { value: "6", label: "PCN6 12387387484895884957848576867587685780" },
  { value: "3", label: "PCN3 12387387484895884957848576867587685780e" },
];

const wrappingOptions = [
  {
    value: "onestring",
    label:
      "Onelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstringonelongstring",
  },
  {
    value: "manywords",
    label:
      "Many words many words many words many words many words many words many words many words many words many words many words many words many words",
  },
];

const PCNList = [
  { value: "2", label: "PCN2" },
  { value: "4", label: "PCN4" },
  { value: "1", label: "PCN1" },
  { value: "9", label: "PCN9" },
];

const getPhotos = async () => {
  // returns 5000 items
  const data = await fetch("https://jsonplaceholder.typicode.com/photos");
  const json = await data.json();
  const results = json.map(({ title, id }) => ({
    label: title,
    value: id,
  }));
  return results;
};

const SelectWithManyOptions = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({
  multiselect,
  labelText,
}: Pick<NDSSelectProps<Option, IsMulti, Group>, "multiselect" | "labelText">) => {
  const [photoList, setPhotoList] = useState([]);

  const setOptions = async () => {
    const result = await getPhotos();
    setPhotoList(result);
  };

  useEffect(() => {
    setOptions();
  }, []);

  return <Select multiselect={multiselect} options={photoList} labelText={labelText} />;
};

function SelectWithState<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: NDSSelectProps<Option, IsMulti, Group>
) {
  const [selectedValue, setSelectedValue] = useState("");

  function handleChange(selectedValue) {
    setSelectedValue(selectedValue);
  }

  function clearSelection() {
    setSelectedValue("");
  }

  return (
    <Flex flexDirection="column" gap="x2" alignItems="flex-start">
      <Select
        className="Select"
        classNamePrefix="SelectTest"
        onChange={handleChange}
        value={selectedValue}
        options={options}
        {...props}
      />
      <Button onClick={clearSelection}>Clear selection</Button>
    </Flex>
  );
}

export default {
  title: "Components/Select",
};

export const _Select = () => (
  <Select
    options={options}
    autocomplete={boolean("autocomplete", true)}
    className={text("className", undefined)}
    classNamePrefix={text("classNamePrefix", undefined)}
    closeMenuOnSelect={boolean("closeMenuOnSelect", true)}
    disabled={boolean("disabled", false)}
    defaultValue={select("defaultValue", [undefined, ...options.map(({ value }) => value)], undefined)}
    error={boolean("error", false)}
    errorMessage={text("errorMessage", "")}
    labelText={text("labelText", "Inventory Status")}
    helpText={text("helpText", undefined)}
    noOptionsMessage={() => "No options"}
    required={boolean("required", false)}
    requirementText={text("requirementText", undefined)}
    id={text("id", undefined)}
    maxHeight={text("maxHeight", "248px")}
    menuPosition={select("menuPosition", ["absolute", "fixed"], "absolute")}
    multiselect={boolean("multiselect", false)}
    name={text("name", undefined)}
    placeholder={text("placeholder", " ")}
    value={select("value", [undefined, ...options.map(({ value }) => value)], undefined)}
    menuIsOpen={boolean("menuIsOpen", undefined)}
    onMenuOpen={action("on menu open")}
    onMenuClose={action("on menu close")}
    onChange={action("selection changed")}
    onInputChange={action("typed input value changed")}
    onBlur={action("blurred")}
  />
);

export const WithABlankValue = () => {
  const optionsWithBlank = [{ value: null, label: "" }, ...options];
  return (
    <Select
      placeholder="Please select inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      options={optionsWithBlank}
      labelText="Inventory status"
      onInputChange={action("typed input value changed")}
    />
  );
};

WithABlankValue.story = {
  name: "with a blank value",
};

export const WithAnOptionSelected = () => (
  <>
    <Select
      value={options[0].value}
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
    <br />
    <Select
      value={options[0].value}
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
      initialIsOpen
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
  </>
);

WithAnOptionSelected.story = {
  name: "with an option selected",
};

export const WithState = () => (
  <SelectWithState placeholder="Please select inventory status" options={options} labelText="Inventory status" />
);

WithState.story = {
  name: "with state",
};

export const SetToDisabled = () => (
  <Select
    placeholder="Please select inventory status"
    options={options}
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    disabled
    labelText="Inventory status"
    onInputChange={action("typed input value changed")}
  />
);

SetToDisabled.story = {
  name: "set to disabled",
};

export const WithErrorMessage = () => (
  <>
    <Select
      placeholder="Please select inventory status"
      options={options}
      errorMessage="Please select an inventory status"
      labelText="Inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
    <br />
    <Select
      placeholder="Please select inventory status"
      options={options}
      errorMessage="Please select an inventory status"
      initialIsOpen
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
  </>
);

WithErrorMessage.story = {
  name: "with error message",
};

export const WithErrorList = () => (
  <>
    <Select
      placeholder="Please select inventory status"
      options={options}
      errorMessage="Please select an inventory status"
      errorList={errorList}
      labelText="Inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
    <br />
    <Select
      placeholder="Please select inventory status"
      options={options}
      errorMessage="Please select an inventory status"
      errorList={errorList}
      initialIsOpen
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
  </>
);

WithErrorList.story = {
  name: "with error list",
};

export const Required = () => (
  <Select
    placeholder="Please select inventory status"
    options={options}
    required
    requirementText="(Required)"
    labelText="Inventory status"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    onInputChange={action("typed input value changed")}
  />
);
Required.story = {
  name: "set to required",
};

export const WithAClearButton = () => (
  <Select
    isClearable
    placeholder="Please select inventory status"
    options={options}
    labelText="Inventory status"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    onInputChange={action("typed input value changed")}
  />
);

export const WithHelpText = () => (
  <Select
    placeholder="Please select inventory status"
    options={options}
    labelText="Inventory status"
    helpText="Additional information about input"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    onInputChange={action("typed input value changed")}
  />
);

WithHelpText.story = {
  name: "with helpText",
};

export const WithCustomId = () => (
  <Select
    id="my-custom-id"
    placeholder="Please select inventory status"
    options={options}
    labelText="Inventory status"
    helpText="Additional information about input"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    onInputChange={action("typed input value changed")}
  />
);

WithCustomId.story = {
  name: "with custom id",
};

export const WithSmallerMaxHeight = () => (
  <Select
    initialIsOpen
    maxHeight="132px"
    value={options[0].value}
    placeholder="Please select inventory status"
    options={options}
    labelText="Inventory status"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    onInputChange={action("typed input value changed")}
  />
);

WithSmallerMaxHeight.story = {
  name: "with smaller maxHeight",
};

export const WithWrappingText = () => (
  <Select
    initialIsOpen
    value={options[0].value}
    placeholder="Please select inventory status"
    options={wrappingOptions}
    labelText="Inventory status"
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    onInputChange={action("typed input value changed")}
  />
);

WithWrappingText.story = {
  name: "With wrapping text",
};

export const WithMultiselect = (props) => {
  return (
    <Select
      defaultValue={[partnerCompanyName[0].value, partnerCompanyName[2].value]}
      noOptionsMessage={() => "No options"}
      placeholder="Please select inventory status"
      options={PCNList}
      labelText="Select PCN"
      className="Select"
      multiselect
      {...props}
    />
  );
};

WithMultiselect.story = {
  name: "with multiselect",
};

export const WithCloseMenuOnSelectTurnedOff = () => {
  return (
    <Select
      defaultValue={[partnerCompanyName[0].value, partnerCompanyName[2].value]}
      noOptionsMessage={() => "No options"}
      placeholder="Please select inventory status"
      options={PCNList}
      labelText="Select PCN"
      className="Select"
      multiselect
      closeMenuOnSelect={false}
    />
  );
};

WithCloseMenuOnSelectTurnedOff.story = {
  name: "with closeMenuOnSelect turned off",
};

export const TestMultiselectOverflow = () => (
  <Flex gap="x2" flexDirection="column">
    <Select
      defaultValue={["accepted", "assigned"]}
      noOptionsMessage={() => "No options"}
      placeholder="Please select inventory status"
      options={options}
      labelText="Inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      multiselect
      onInputChange={action("typed input value changed")}
    />
    <Box width="300px">
      <Select
        defaultValue={partnerCompanyName.map((item) => item.value)}
        noOptionsMessage={() => "No options"}
        placeholder="Please select inventory status"
        options={partnerCompanyName}
        labelText="PCN"
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        multiselect
        onInputChange={action("typed input value changed")}
      />
    </Box>
    <Box width="400px">
      <Select
        defaultValue={options.map((item) => item.value)}
        noOptionsMessage={() => "No options"}
        placeholder="Please select inventory status"
        options={options}
        labelText="Inventory status"
        onChange={action("selection changed")}
        onBlur={action("blurred")}
        multiselect
        onInputChange={action("typed input value changed")}
      />
    </Box>
  </Flex>
);

TestMultiselectOverflow.story = {
  name: "test multiselect overflow",
};

export const WithFixedPositioning = () => (
  <>
    <Box
      style={{
        position: "relative",
        overflow: "hidden",
        width: "300px",
        height: "100px",
      }}
    >
      <Select
        defaultValue={["accepted", "assigned"]}
        noOptionsMessage={() => "No options"}
        placeholder="Please select inventory status"
        options={options}
        labelText="Inventory status"
        menuPosition="fixed"
      />
    </Box>
  </>
);

WithFixedPositioning.story = {
  name: "with fixed positioning",
};

export const WithFetchedOptions = () => (
  <Flex flexDirection="column" gap="x2" width="300px">
    <SelectWithManyOptions labelText="Select from many options:" />
    <SelectWithManyOptions multiselect labelText="Multiselect many options:" />
  </Flex>
);

export const WithCustomOptionComponent = () => {
  const Indicator = styled.span(() => ({
    borderRadius: "25%",
    background: "green",
    lineHeight: "0",
    display: "inline-block",
    width: "10px",
    height: "10px",
    marginRight: "5px",
  }));

  const CustomOption = ({ children, ...props }: OptionProps) => {
    const newChildren = (
      <>
        <Indicator />
        {children}
      </>
    );
    return <SelectOption {...props}>{newChildren}</SelectOption>;
  };

  return (
    <>
      <Box position="relative" overflow="hidden" width="300px" height="600px">
        <Select
          defaultValue={["accepted"]}
          noOptionsMessage={() => "No options"}
          placeholder="Please select inventory status"
          options={options}
          components={{
            Option: CustomOption,
          }}
          multiselect
          labelText="Inventory status"
          menuPosition="fixed"
        />
      </Box>
    </>
  );
};

const optionsWithMetadata = [
  { value: "accepted", label: "Accepted", description: "Request has been reviewed and accepted", issues: 0 },
  {
    value: "assigned",
    label: "Assigned to a line",
    description: "Request has been assigned to a production line",
    issues: 2,
  },
  { value: "hold", label: "On hold", description: "Request is temporarily paused", issues: 4 },
  { value: "rejected", label: "Rejected", description: "Request has been reviewed and rejected", issues: 2 },
  { value: "open", label: "Open", description: "New request awaiting review", issues: 5 },
  { value: "progress", label: "In progress", description: "Request is actively being worked on", issues: 3 },
  { value: "quarantine", label: "In quarantine", description: "Request requires additional verification", issues: 0 },
];

export const WithACustomSelectedOption = () => {
  return (
    <Select
      defaultValue={["accepted"]}
      placeholder="Please select inventory status"
      labelText="Inventory status"
      options={optionsWithMetadata}
      getOptionLabel={({ label, issues, description }) => (
        <Flex gap="x1" alignItems="center">
          <Text fontSize="small" fontWeight="medium">
            {label}
          </Text>
          <Text color="grey">|</Text>
          <Text color="midGrey" fontSize="small">
            {description}
          </Text>

          {issues > 0 && <StatusIndicator type={issues > 3 ? "warning" : "neutral"}>{issues} items</StatusIndicator>}
        </Flex>
      )}
    />
  );
};

WithCustomOptionComponent.story = {
  name: "with custom option component",
};

export const UsingRefToControlFocus = () => {
  const multiSelectRef = useRef(null);
  const handleClick = () => {
    multiSelectRef.current.focus();
  };

  return (
    <Flex flexDirection="column" gap="x2">
      <Select
        defaultValue={["accepted"]}
        noOptionsMessage={() => "No options"}
        placeholder="Please select inventory status"
        options={options}
        ref={multiSelectRef}
        multiselect
        labelText="Inventory status"
        menuPosition="fixed"
      />
      <Button onClick={handleClick}>Focus the Input</Button>
    </Flex>
  );
};

export const WithTopMenuPlacement = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Select options={options} menuPlacement="top" />
    </Flex>
  );
};

UsingRefToControlFocus.story = {
  name: "using ref to control focus",
};

const CustomOption = (props) => {
  return <SelectOption {...props}>{props.selectProps.myCustomProp}</SelectOption>;
};

const CustomSingleValue = ({ innerProps, ...props }) => {
  return <div {...innerProps}>{props.selectProps.myCustomProp}</div>;
};

export const WithCustomProps = () => {
  return (
    <>
      <Select
        options={[{ value: "accepted", label: "Accepted" }]}
        myCustomProp="custom prop value"
        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
      />
    </>
  );
};
