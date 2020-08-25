/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/Pagination", module).add(
  "Pagination",
  () => `
    <nav class="Pagination">
      <a href="" class="Pagination__button Pagination__button--disabled">< Previous</a>
      <a href="" class="Pagination__button Pagination__button--current">1</a>
      <a href="" class="Pagination__button">2</a>
      <p class="Pagination__seperator">...</p>
      <a href="" class="Pagination__button">9</a>
      <a href="" class="Pagination__button">Next ></a>
    </nav>
`
);
