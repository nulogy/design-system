import { fireEvent } from "@testing-library/react";

const openDropdown = (container, i = 0) => {
  fireEvent.focus(container.querySelectorAll("input")[i]);
  fireEvent.keyDown(container.querySelectorAll("input")[i], {
    key: "ArrowDown",
    code: 40,
  });
};

export const selectOption = (optionText, container, queryByText, i) => {
  expect(queryByText(optionText)).toBeNull();

  openDropdown(container, i);

  expect(queryByText(optionText)).not.toBeNull();

  fireEvent.click(queryByText(optionText));
};
