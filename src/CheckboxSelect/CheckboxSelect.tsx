import React from "react";
import { useTranslation } from "react-i18next";
import { PropsValue } from "react-select";
import styled from "styled-components";
import { Box } from "../Box";
import { Checkbox } from "../Checkbox";
import { Divider } from "../Divider";
import { DropdownMenu } from "../DropdownMenu";
import { Input } from "../Input";

const StyledInput = styled(Input)(({ theme }) => ({
  input: {
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    opacity: 1,
    textAlign: "left",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

function getMessage({ options, t, value }) {
  if (value.length === 0) {
    return t("None selected");
  } else if (value.length === options.length) {
    return t("All ({{total}}/{{total}})", { total: options.length });
  } else if (value.length === 1) {
    return t("{{selectedName}} (1/{{total}})", {
      selectedName: options.find((option) => option.value === value[0])?.label,
      total: options.length,
    });
  } else {
    return t("Multiple ({{selectedCount}}/{{total}})", {
      selectedCount: value.length,
      total: options.length,
    });
  }
}

export type CheckboxSelectOption = {
  label: string;
  value: string;
};

type CustomOnChangeValue = CheckboxSelectOption[];

export type CheckboxSelectProps<Option extends CheckboxSelectOption = CheckboxSelectOption> = {
  allowSelectAll?: boolean;
  className?: string;
  "data-testid"?: string;
  errorMessage?: string;
  onChange?: (newValue: CustomOnChangeValue) => void;
  options: readonly Option[];
  value?: PropsValue<Option["value"]>[];
  width?: string;
};

export default function CheckboxSelect({
  errorMessage,
  options,
  value,
  onChange,
  width = "300px",
  allowSelectAll = true,
  "data-testid": dataTestId = null,
  className = null,
}: CheckboxSelectProps) {
  const { t } = useTranslation();
  const message = getMessage({ options, t, value });

  const handleChange = (option) => {
    if (!onChange) return;

    const itemsToSet = () => {
      if (option === "all") {
        return value.length === options.length ? [] : options.map((option) => option.value);
      } else if (value.includes(option)) {
        return value.filter((id) => id !== option);
      } else {
        return [...value, option];
      }
    };

    const items = itemsToSet();
    onChange(items);
  };

  const checkboxes = options.map(({ label, value: optionValue }) => (
    <Checkbox
      data-testid={`checkbox-option-${optionValue}`}
      pl="x1"
      labelText={label}
      value={optionValue}
      key={optionValue}
      onChange={() => handleChange(optionValue)}
      onClick={(event) => event.stopPropagation()}
      checked={value.includes(optionValue)}
    />
  ));

  if (allowSelectAll) {
    checkboxes.unshift(<Divider key="divider" my="half" mx="x1" />);

    checkboxes.unshift(
      <Checkbox
        data-testid="checkbox-option-all"
        pl="x1"
        labelText={t("Select all")}
        value="all"
        key="all"
        onChange={() => handleChange("all")}
        onClick={(event) => event.stopPropagation()}
        checked={value.length === options.length}
      />
    );
  }

  return (
    <Box width={width} position="relative" data-testid={dataTestId} className={className}>
      <DropdownMenu
        data-testid="checkbox-select-dropdown"
        width={width}
        showArrow={false}
        trigger={() => (
          <StyledInput
            data-testid="dropdown-trigger"
            value={message}
            width={width}
            inputWidth={width}
            errorMessage={errorMessage}
            iconRight="downArrow"
            iconRightSize="20px"
            disabled
          />
        )}
        maxHeight="260px"
        overflowY="auto"
      >
        {checkboxes}
      </DropdownMenu>
    </Box>
  );
}
