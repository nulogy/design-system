import React from "react";
import styled from "styled-components";
import { SelectOption, SelectOptionProps } from "./SelectOption";
import { NDSOption } from "./Select";

export const errorList = ["Error message 1", "Error message 2"];

export const options: NDSOption[] = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" },
];

export const partnerCompanyName = [
  { value: "2", label: "PCN2 12387387484895884957848576867587685780" },
  { value: "4", label: "PCN4 12387387484895884957848576867587685780" },
  { value: "1", label: "PCN1 12387387484895884957848576867587685780" },
  { value: "9", label: "PCN9 12387387484895884957848576867587685780" },
  { value: "7", label: "PCN7 12387387484895884957848576867587685780" },
  { value: "6", label: "PCN6 12387387484895884957848576867587685780" },
  { value: "3", label: "PCN3 12387387484895884957848576867587685780e" },
];

export const wrappingOptions = [
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

export const PCNList = [
  { value: "2", label: "PCN2" },
  { value: "4", label: "PCN4" },
  { value: "1", label: "PCN1" },
  { value: "9", label: "PCN9" },
];

export const getPhotos = async () => {
  // returns 5000 items
  const data = await fetch("https://jsonplaceholder.typicode.com/photos");
  const json = await data.json();
  return json.map(({ title, id }) => ({
    label: title,
    value: id,
  }));
};

const Indicator = styled.span(() => ({
  borderRadius: "25%",
  background: "green",
  lineHeight: "0",
  display: "inline-block",
  width: "10px",
  height: "10px",
  marginRight: "5px",
}));

export const CustomOption = ({ children, ...props }: SelectOptionProps) => {
  const newChildren = (
    <>
      <Indicator />
      {children}
    </>
  );
  return <SelectOption {...props}>{newChildren}</SelectOption>;
};
