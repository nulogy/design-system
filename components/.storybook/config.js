import React, { useState } from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { create } from "@storybook/theming";
import NDSProvider from "../src/NDSProvider/NDSProvider";
import theme from "../src/theme";
import { withA11y } from "@storybook/addon-a11y";
import { Radio } from "../src";

const req = require.context("../src", true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const newViewports = {
  extraSmall: {
    name: "Extra small",
    styles: {
      width: "320px",
      height: "100%"
    }
  },
  small: {
    name: "Small",
    styles: {
      width: "768px",
      height: "100%"
    }
  },
  medium: {
    name: "Medium",
    styles: {
      width: "1024px",
      height: "100%"
    }
  },
  large: {
    name: "Large",
    styles: {
      width: "1360px",
      height: "100%"
    }
  },
  extraLarge: {
    name: "Extra large",
    styles: {
      width: "1920px",
      height: "100%"
    }
  }
};

addDecorator(withA11y);

addParameters({
  viewport: { viewports: newViewports },
  options: {
    theme: create({
      gridCellSize: 8
    })
  }
});

addDecorator(story => {
  const [locale, setLocale] = useState("en");
  return (
    <div style={{ padding: theme.space.x3 }}>
      <Radio
        id="radio-en"
        onClick={() => {
          setLocale("en");
        }}
        checked={locale === "en"}
        labelText="English"
      />
      <Radio
        id="radio-es"
        onClick={() => {
          setLocale("es");
        }}
        checked={locale === "es"}
        labelText="Spanish"
      />
      <NDSProvider locale={locale}>{story()}</NDSProvider>
    </div>
  );
});

configure(loadStories, module);
