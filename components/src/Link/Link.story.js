import React from "react";
import { storiesOf } from "@storybook/react";
import { Link } from "../index";

storiesOf("Link", module)
  .add("Link", () => <Link href="http://nulogy.design">Link</Link>)
  .add("Without underline", () => (
    <Link underline={false} href="http://nulogy.design">
      Link
    </Link>
  ))
  .add("With a different color", () => (
    <Link color="black" hover="red" href="http://nulogy.design">
      Link
    </Link>
  ))
  .add("With a different size", () => (
    <Link color="black" fontSize="large" href="http://nulogy.design">
      Link
    </Link>
  ))
  .add("As a <button>", () => <Link as="button">Link</Link>);
