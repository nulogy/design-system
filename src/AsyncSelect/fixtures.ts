import { filterOptions } from "../utils/story/simulatedAPIRequests";

export const loadMatchingProvinces = async (inputValue: string) => {
  const data = await filterOptions(inputValue, provinces);
  return await data.json();
};

export const provinces = [
  {
    label: "Alberta",
    value: "AB",
  },
  {
    label: "British Columbia",
    value: "BC",
  },
  {
    label: "Manitoba",
    value: "MB",
  },
  {
    label: "New Brunswick",
    value: "NB",
  },
  {
    label: "Newfoundland and Labrador",
    value: "NL",
  },
  {
    label: "Northwest Territories",
    value: "NT",
  },
  {
    label: "Nova Scotia",
    value: "NS",
  },
  {
    label: "Nunavut",
    value: "NU",
  },
  {
    label: "Ontario",
    value: "ON",
  },
  {
    label: "Prince Edward Island",
    value: "PE",
  },
  {
    label: "Quebec",
    value: "QC",
  },
  {
    label: "Saskatchewan",
    value: "SK",
  },
  {
    label: "Yukon Territory",
    value: "YT",
  },
];
