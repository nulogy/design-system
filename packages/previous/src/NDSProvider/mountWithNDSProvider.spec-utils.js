import React from "react";
import { mount } from "enzyme";
import NDSProvider from "./NDSProvider";

export const mountWithNDSProvider = (component, locale = "en_US") =>
  mount(<NDSProvider locale={locale}>{component}</NDSProvider>);
