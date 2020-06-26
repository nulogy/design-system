// register.js

import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";

addons.register("my/design-addon", () => {
  addons.add("design-addon/panel", {
    title: "assets",
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        implement
      </AddonPanel>
    )
  });
});
