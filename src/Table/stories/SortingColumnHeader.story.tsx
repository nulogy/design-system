import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "../../index";

export default {
  title: "Components/Table/Headers",
  component: Table.SortingHeader,
} satisfies Meta<typeof Table.SortingHeader>;

type Story = StoryObj<typeof Table.SortingHeader>;

export const _SortingHeader: Story = {
  args: {
    onChange: action("sort change"),
    label: "Header Label",
    ascending: false,
    active: false,
  },
  argTypes: {
    label: {
      control: { type: "text" },
    },
    ascending: {
      control: { type: "boolean" },
    },
    active: {
      control: { type: "boolean" },
    },
  },
};
