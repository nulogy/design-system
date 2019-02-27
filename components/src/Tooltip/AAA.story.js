import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Button, PrimaryButton, Link, Text, Flex,
} from "ComponentsRoot";
import { Manager, Reference, Popper } from "react-popper";
import styled from "styled-components";
import Tooltip from "./Tooltip";


const PopperWrap = styled.div`
 background-color: red;
 padding: 10px;
 margin: 10px
`;

const Example = () => (
  <Manager>
    <Reference>
      {({ ref }) => (
        <button type="button" ref={ ref }>
          Reference element
        </button>
      )}
    </Reference>
    <Popper placement="right-start">
      {({
        ref, style, placement, arrowProps,
      }) => (
        <PopperWrap ref={ ref } style={ style } data-placement={ placement }>
          Popper element
          <div ref={ arrowProps.ref } style={ arrowProps.style } />
        </PopperWrap>
      )}
    </Popper>
  </Manager>
);

storiesOf("AAA", module)
  .add("AAA", () => (
    <Example />
  ));
