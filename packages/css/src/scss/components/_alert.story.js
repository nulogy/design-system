/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/Alerts", module)
  .add(
    "Alert",
    () => `
    <div class="Alert">
      <p class="Alert__title">Important information</p>
      <p class="Alert__message">Details about important information</p>
    </div>
`
  )
  .add(
    "Alert--danger",
    () => `
  <div class="Alert Alert--danger nds-flex"">
    <div class="Alert--danger__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
    </div>
    <div class="Alert__content">
      <p class="Alert__title">Important information</p>
      <p class="Alert__message">Details about important information</p>
    </div>
  </div>
  `
  )
  .add(
    "Alert--warning",
    () => `
  <div class="Alert Alert--warning">
    <p class="Alert__title">Important information</p>
    <p class="Alert__message">Details about important information</p>
  </div>
  `
  )
  .add(
    "Alert--success",
    () => `
  <div class="Alert Alert--success nds-flex"">
    <svg class="Alert--success__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    <div class="Alert__content">
      <p class="Alert__title">Important information</p>
      <p class="Alert__message">Details about important information</p>
    </div>
  </div>
  `
  )
  .add(
    "Alert--closeable",
    () => `
  <div class="Alert nds-flex"">
    <div class="Alert__content nds-flex--row nds-flex-grow-1">
      <p class="Alert__title">Important information</p>
      <p class="Alert__message">Details about important information</p>
    </div>
    <button class="Alert__close-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
  </div>
  `
  );
