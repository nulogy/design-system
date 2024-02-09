import { fireEvent, Matcher, SelectorMatcherOptions } from "@testing-library/react";

type QueryByText = (id: Matcher, options?: SelectorMatcherOptions) => HTMLElement;

export const openDropdown = (element: HTMLElement, i: number) => {
  fireEvent.focus(element.querySelectorAll("input")[i]);

  fireEvent.keyDown(element.querySelectorAll("input")[i], {
    key: "ArrowDown",
    code: 40,
  });
};

export const selectOption = (optionText: string, container: HTMLElement, queryByText: QueryByText, i = 0) => {
  expect(queryByText(optionText)).toBeNull();

  openDropdown(container, i);

  expect(queryByText(optionText)).not.toBeNull();

  fireEvent.click(queryByText(optionText));
};
