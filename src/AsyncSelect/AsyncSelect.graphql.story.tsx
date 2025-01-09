import { gql, useLazyQuery } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import React, { useCallback } from "react";
import { AsyncSelect } from "../index";

export default {
  title: "Components/AsyncSelect/GraphQL",
};

interface Country {
  name: string;
}

const GET_COUNTRIES = gql`
  query {
    countries {
      name
    }
  }
`;

const mockCountries = [
  { name: "United States" },
  { name: "Canada" },
  { name: "United Kingdom" },
  { name: "France" },
  { name: "Germany" },
  { name: "Japan" },
];

const mocks = [
  {
    request: {
      query: GET_COUNTRIES,
    },
    result: {
      data: {
        countries: mockCountries,
      },
    },
  },
];

const AsyncSelectWithApollo = () => {
  const [getCountries, { data }] = useLazyQuery(GET_COUNTRIES);

  const loadOptions = useCallback(
    async (inputValue: string) => {
      await getCountries();

      if (data?.countries) {
        return data.countries
          .filter((country: Country) => country.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map((country: Country) => ({
            label: country.name,
            value: country.name,
          }));
      }

      return [];
    },
    [data, getCountries]
  );

  return <AsyncSelect placeholder="Search for a country" loadOptions={loadOptions} labelText="Country" />;
};

export const WithApolloClientExample = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <AsyncSelectWithApollo />
  </MockedProvider>
);
