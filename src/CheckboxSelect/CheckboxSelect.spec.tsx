import React from "react";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import CheckboxSelect from "./CheckboxSelect";

describe("CheckboxSelect", () => {
  it("displays none when none of the options are selected", () => {
    const component = new Component({});

    expect(component.triggerInput).toHaveDisplayValue("None selected");
  });

  it("displays the selected option if only one is selected", () => {
    const component = new Component({ value: [2] });

    expect(component.triggerInput).toHaveDisplayValue("{{selectedName}} (1/{{total}})");
  });

  it("displays multiple when multiple options are selected", () => {
    const component = new Component({ value: [1, 2] });

    expect(component.triggerInput).toHaveDisplayValue("Multiple ({{selectedCount}}/{{total}})");
  });

  it("displays all when all options are selected", () => {
    const component = new Component({ value: [1, 2, 3] });

    expect(component.triggerInput).toHaveDisplayValue("All ({{total}}/{{total}})");
  });
});

class Component {
  component: ReturnType<typeof renderWithNDSProvider>;

  constructor(props) {
    const defaultProps = {
      options: [
        { label: "Line 1", value: 1 },
        { label: "Line 2", value: 2 },
        { label: "Line 3", value: 3 },
      ],
      value: [],
      onClick: jest.fn(),
      width: "300px",
      allowSelectAll: true,
    };

    this.component = renderWithNDSProvider(<CheckboxSelect {...defaultProps} {...props} />);
  }

  get triggerInput() {
    return this.component.getByTestId("dropdown-trigger");
  }
}
