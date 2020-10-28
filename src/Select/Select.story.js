/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { Button, Input, PrimaryButton, Select, SelectOption } from "../index";
import { Box } from "../Box";

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

const SelectWithManyOptions = ({ multiselect, labelText }) => {
  const [photoList, setPhotoList] = useState([]);
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
  const setOptions = async () => {
    const result = await getPhotos();
    setPhotoList(result);
  };
  useEffect(() => {
    setOptions();
  }, []);
  return (
    <Select
      multiselect={multiselect}
      options={photoList}
      labelText={labelText}
    />
  );
};

class SelectWithState extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedValue: "" };
    this.handleChange = this.handleChange.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  handleChange(selectedValue) {
    this.setState({ selectedValue });
  }

  clearSelection() {
    this.setState({ selectedValue: "" });
  }

  render() {
    const { selectedValue } = this.state;
    return (
      <>
        <Select
          className="Select"
          classNamePrefix="SelectTest"
          onChange={this.handleChange}
          value={selectedValue}
          options={options}
          {...this.props}
        />
        <Button onClick={this.clearSelection}>Clear selection</Button>
      </>
    );
  }
}

export default {
  title: "Components/Select",
};

export const _Select = () => (
  <Select
    placeholder={" "}
    onChange={action("selection changed")}
    onBlur={action("blurred")}
    className="Select"
    classNamePrefix="SelectTest"
    options={options}
    labelText="Inventory status"
    onInputChange={action("typed input value changed")}
  />
);

export const WithState = () => (
  <SelectWithState
    placeholder="Please select inventory status"
    options={options}
    labelText="Inventory status"
  />
);

WithADefaultValue.story = {
  name: "with a defaultValue",
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
      loading
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

export const SetToRequired = () => (
  <form>
    <Input placeholder="Please select inventory status" />
    <Select
      placeholder="Please select inventory status"
      options={options}
      required
      requirementText="(Required)"
      style={{ marginTop: "5px" }}
      labelText="Inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      onInputChange={action("typed input value changed")}
    />
    <PrimaryButton mt="x1" type="submit">
      Submit
    </PrimaryButton>
  </form>
);

SetToRequired.story = {
  name: "set to required",
};

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

export const WithMultiselect = () => {
  const PCNList = [
    { value: "2", label: "PCN2" },
    { value: "4", label: "PCN4" },
    { value: "1", label: "PCN1" },
    { value: "9", label: "PCN9" },
  ];
  return (
    <Select
      defaultValue={[partnerCompanyName[0].value, partnerCompanyName[2].value]}
      noOptionsMessage={() => "No options"}
      placeholder="Please select inventory status"
      options={PCNList}
      labelText="Select PCN"
      className="Select"
      multiselect
    />
  );
};

WithMultiselect.story = {
  name: "with multiselect",
};

export const WithCloseMenuOnSelectTurnedOff = () => {
  const PCNList = [
    { value: "2", label: "PCN2" },
    { value: "4", label: "PCN4" },
    { value: "1", label: "PCN1" },
    { value: "9", label: "PCN9" },
  ];
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

WithManyOptions.story = {
  name: "with many options ",
};

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
  const CustomOption = ({ children, ...props }) => {
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

UsingRefToControlFocus.story = {
  name: "using ref to control focus",
};

export const WithANullValue = () => {
  const optionsWithBlank = [
    { value: null, label: "Nullable" },
    { value: null, label: "Other null" },
    ...options,
  ];
  return (
    <Select
      defaultValue={null}
      placeholder="Please select inventory status"
      onChange={action("selection changed")}
      onBlur={action("blurred")}
      options={optionsWithBlank}
      labelText="Inventory status"
      onInputChange={action("typed input value changed")}
    />
  );
};

WithANullValue.story = {
  name: "with a null value",
};
