import React, { useEffect, useRef, useState } from "react";
import { action } from "@storybook/addon-actions";
import { boolean, select, text } from "@storybook/addon-knobs";
import { PropsValue } from "react-select";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Button, Heading2 } from "../index";
import Select, { NDSOptionValue, NDSSelectProps } from "./Select";
import {
  CustomOption,
  getPhotos,
  options,
  partnerCompanyName,
  wrappingOptions,
  PCNList,
  errorList,
} from "./Select.story.fixture";

const SelectWithManyOptions = ({ multiselect, labelText, ...props }: Partial<NDSSelectProps>) => {
  const [photoList, setPhotoList] = useState([]);

  const setOptions = async () => {
    const result = await getPhotos();
    setPhotoList(result);
  };

  useEffect(() => {
    setOptions();
  }, []);

  return <Select multiselect={multiselect} options={photoList} labelText={labelText} {...props} />;
};

type SelectWithStateProps = NDSSelectProps & {
  selectedValue: string;
};

class SelectWithState extends React.Component<SelectWithStateProps, { selectedValue: PropsValue<NDSOptionValue> }> {
  constructor(props) {
    super(props);

    this.state = { selectedValue: "" };
    this.handleChange = this.handleChange.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  handleChange(selectedValue: PropsValue<NDSOptionValue>) {
    this.setState({ selectedValue });
  }

  clearSelection() {
    this.setState({ selectedValue: "" });
  }

  render() {
    const { selectedValue } = this.state;
    return (
      <Flex flexDirection="column" gap="x2" alignItems="flex-start">
        <Select
          className="Select"
          classNamePrefix="SelectTest"
          onChange={this.handleChange}
          value={selectedValue}
          options={options}
          {...this.props}
        />
        <Button onClick={this.clearSelection}>Clear selection</Button>
      </Flex>
    );
  }
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

export const WithDifferentSizes = () => {
  return (
    <Flex flexDirection="column" gap="x2">
      <Heading2>Standard</Heading2>
      <Flex gap="x2" minHeight="360px">
        <Select
          initialIsOpen
          placeholder="Please select inventory status"
          onChange={action("selection changed")}
          onBlur={action("blurred")}
          options={options}
          labelText="Default size"
          onInputChange={action("typed input value changed")}
        />
        <Select
          size="medium"
          initialIsOpen
          placeholder="Please select inventory status"
          onChange={action("selection changed")}
          onBlur={action("blurred")}
          options={options}
          labelText="Medium size"
          onInputChange={action("typed input value changed")}
        />
        <Select
          size="large"
          initialIsOpen
          placeholder="Please select inventory status"
          onChange={action("selection changed")}
          onBlur={action("blurred")}
          options={options}
          labelText="Large size"
          onInputChange={action("typed input value changed")}
        />
      </Flex>

      <Heading2>Multi-select</Heading2>
      <Flex gap="x2" alignItems="flex-start">
        <Select
          initialIsOpen
          defaultValue={[partnerCompanyName[0].value, partnerCompanyName[2].value]}
          noOptionsMessage={() => "No options"}
          placeholder="Please select inventory status"
          options={PCNList}
          labelText="Default Size"
          multiselect
        />
        <Select
          size="medium"
          initialIsOpen
          defaultValue={[partnerCompanyName[0].value, partnerCompanyName[2].value]}
          noOptionsMessage={() => "No options"}
          placeholder="Please select inventory status"
          options={PCNList}
          labelText="Medium Size"
          multiselect
        />
        <Select
          size="large"
          initialIsOpen
          defaultValue={[partnerCompanyName[0].value, partnerCompanyName[2].value]}
          noOptionsMessage={() => "No options"}
          placeholder="Please select inventory status"
          options={PCNList}
          labelText="Large Size"
          multiselect
        />
      </Flex>
    </Flex>
  );
};

export const WithStyledProps = () => {
  return (
    <Select
      initialIsOpen
      placeholder="Please select inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      maxWidth="300px"
      options={options}
      labelText="Default size"
      onInputChange={action("typed input value changed")}
    />
  );
};

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
  <SelectWithState
    selectedValue="foo"
    placeholder="Please select inventory status"
    options={options}
    labelText="Inventory status"
  />
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
  <>
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
  </>
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
  <Box style={{ width: "300px" }}>
    <SelectWithManyOptions labelText="Select from many options:" />
    <SelectWithManyOptions multiselect labelText="Multiselect many options:" />
  </Box>
);

export const WithCustomOptionComponent = () => {
  return (
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
    <>
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
    </>
  );
};

export const WithTopMenuPlacement = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Select options={options} menuPlacement="top" />
    </Flex>
  );
};

export const WithCustomStyles = () => {
  return (
    <Select
      options={options}
      menuPlacement="top"
      styles={(styles) => {
        return {
          ...styles,
          control: (provided, props) => ({
            ...styles.control(provided, props),
            border: "2px solid lightblue",
          }),
        };
      }}
    />
  );
};
