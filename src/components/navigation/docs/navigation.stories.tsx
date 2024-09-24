import type { Meta, StoryObj } from "@storybook/react"
import { DefaultAppSwitcher, menuItems } from "./fixtures"
import Navigation from "../components/navigation"

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    menuItems: menuItems,
  },
  args: { menuItems: menuItems },
  decorators: [
    (Story) => (
      <div className="pb-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    menuItems: menuItems,
    appSwitcher: <DefaultAppSwitcher />,
  },
}
