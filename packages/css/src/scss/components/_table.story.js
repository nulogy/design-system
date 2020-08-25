/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/Table", module)
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
  )
  .add(
    "no data message",
    () => `
    <table class="Table">
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
        <td class="Table__message" colspan="4">
          No records have been created for this table.
        </td>
      </tr>
  </table>
  `
  )
  .add(
    "with selectable rows",
    () => `
    <table class="Table">
    <thead>
      <tr class="Table__row">
        <th class="Table__heading Table__heading--selectable">
          <input type="checkbox" aria-label="select all" class="Checkbox__input">
        </th>
        <th class="Table__heading">Date</th>
        <th class="Table__heading">Expected Quantity</th>
        <th class="Table__heading">Actual Quantity</th>
        <th class="Table__heading"></th>
      </tr>
      </thead>
      <tbody>
      <tr class="Table__row">
        <td class="Table__cell">
          <input type="checkbox" aria-label="select first row" class="Checkbox__input">
        </td>
        <td class="Table__cell">2019-10-01</td>
        <td class="Table__cell">2,025 eaches</td>
        <td class="Table__cell">1,800 eaches</td>
        <td class="Table__cell"></td>
      </tr>
      <tr class="Table__row">
        <td class="Table__cell">
          <input type="checkbox" aria-label="select second row" class="Checkbox__input">
        </td>
        <td class="Table__cell">2019-10-02</td>
        <td class="Table__cell">2,475 eaches</td>
        <td class="Table__cell">2,250 eaches</td>
        <td class="Table__cell"></td>
      </tr>
      <tr class="Table__row">
        <td class="Table__cell">
          <input type="checkbox" aria-label="select third row" class="Checkbox__input">
        </td>
        <td class="Table__cell">2019-10-03</td>
        <td class="Table__cell">2,475 eaches</td>
        <td class="Table__cell">1,425 eaches</td>
        <td class="Table__cell"></td>
      </tr>
      </tbody>
  </table>
  `
  )
  .add(
    "with full width section",
    () => `
    <table class="Table">
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
        <td class="Table__section" colspan="4">ABC Company</td>
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
  )
  .add(
    "with footer",
    () => `
    <table class="Table">
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
      <tfoot class="Table__footer">
        <tr class="Table__row">
          <th scope="row" class="Table__footer-heading">Total</th>
          <td class="Table__cell">2,475 eaches</td>
          <td class="Table__cell">1,425 eaches</td>
          <td class="Table__cell"></td>
        </tr>
        <tr class="Table__row">
          <th scope="row" class="Table__footer-heading">Attainment</th>
          <td class="Table__cell">2,475 eaches</td>
          <td class="Table__cell">1,425 eaches</td>
          <td class="Table__cell"></td>
        </tr>
      </tfoot>
      </tbody>
  </table>
  `
  );
