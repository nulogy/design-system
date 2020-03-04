/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components|Table", module)
  .add(
    "Table",
    () => `
    <table class="Table">
      <tr class="Table__row">
        <th class="Table__heading">Date</th>
        <th class="Table__heading">Expected Quantity</th>
        <th class="Table__heading">Actual Quantity</th>
        <th class="Table__heading"></th>
      </tr>
      <tr class="Table__row">
        <td class="Table__cell">2019-10-01</td>
        <td class="Table__cell">2,025 eaches</td>
        <td class="Table__cell">1,800 eaches</td>
        <td class="Table__cell"></td>
      </tr>
      <tr class="Table__row">
        <td class="Table__cell">2019-10-02</td>
        <td class="Table__cell">2,475 eaches</td>
        <td class="Table__cell">2,250 eaches</td>
        <td class="Table__cell"></td>
      </tr>
      <tr class="Table__row">
        <td class="Table__cell">2019-10-03</td>
        <td class="Table__cell">2,475 eaches</td>
        <td class="Table__cell">1,425 eaches</td>
        <td class="Table__cell"></td>
      </tr>
  </table>
`
  )
  .add(
    "Compact",
    () => `
    <table class="Table Table--compact">
    <thead>
      <tr class="Table__row">
        <th class="Table__heading">Date</th>
        <th class="Table__heading">Expected Quantity</th>
        <th class="Table__heading">Actual Quantity</th>
        <th class="Table__heading"></th>
      </tr>
      </thead>
      <tbody>
      <tr class="Table__row">
        <td class="Table__cell">2019-10-01</td>
        <td class="Table__cell">2,025 eaches</td>
        <td class="Table__cell">1,800 eaches</td>
        <td class="Table__cell"></td>
      </tr>
      <tr class="Table__row">
        <td class="Table__cell">2019-10-02</td>
        <td class="Table__cell">2,475 eaches</td>
        <td class="Table__cell">2,250 eaches</td>
        <td class="Table__cell"></td>
      </tr>
      <tr class="Table__row">
        <td class="Table__cell">2019-10-03</td>
        <td class="Table__cell">2,475 eaches</td>
        <td class="Table__cell">1,425 eaches</td>
        <td class="Table__cell"></td>
      </tr>
      </tbody>
  </table>
  `
  );
