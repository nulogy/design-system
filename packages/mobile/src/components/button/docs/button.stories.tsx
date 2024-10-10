import type { Meta, StoryObj } from "@storybook/react"
// @ts-ignore
import icons from "@nulogy/icons"
import { Button } from ".."

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "components/Button/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(icons),
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
      description: "The size of the button",
      type: {
        name: "union",
        value: [
          {
            name: "enum",
            value: ["small", "medium", "large"],
          },
        ],
      },
    },
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "destructive"],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "Create project",
  },
}
