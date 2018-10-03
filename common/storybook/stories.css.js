import React from 'react';
import { injectGlobal } from 'styled-components';

injectGlobal`
  .storybookTestClass {
    color: red;
    outline: .5rem orange dotted !important;
    font-family: "comic sans", "marker felt", fantasy;
  }
`