import React from "react";
import { storiesOf } from "@storybook/react";
import DemoPage from "./DemoPage"
import Field from "../Field/Field";
import Input from "../Input/Input";
import Form from "../Form/Form";
import FormSection from "../Form/FormSection";
import Checkbox from "../Checkbox/Checkbox";
import Radio from "../Radio/Radio";
import RadioGroup from "../Radio/RadioGroup";
import ToggleWithText from "../Toggle/Toggle";
import InlineValidation from "../Validation/InlineValidation";
import HeaderValidation from "../Validation/HeaderValidation";
import List from "../List/List";
import ListItem from "../List/ListItem";
import Select from "../Select/Select";

storiesOf("DemoPage", module)
  .add("Demo Page", () => (
    <DemoPage/>
  ));
