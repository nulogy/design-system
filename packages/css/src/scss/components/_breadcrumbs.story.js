/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/Breadcrumbs", module).add(
  "Breadcrumbs",
  () => `
    <nav class="Breadcrumbs">
      <ol>
        <li class="Breadcrumbs__item"><a href="/">Home</a></li>
        <li><i class="material-icons">keyboard_arrow_right</i><li>
        <li class="Breadcrumbs__item"><a class="Breadcrumbs__item"href="/Tenants">Tenants</a></li>
        <li><i class="material-icons">keyboard_arrow_right</i><li>
        <li class="Breadcrumbs__item">Current Tenant<li>
        <li><i class="material-icons">keyboard_arrow_right</i><li>
      </ol>
    </nav>
`
);
