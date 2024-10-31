import React, { useState } from "react";
import { ChromePicker } from "react-color";
import styled from "styled-components";

import { ThemeInput } from "./ThemeInput";

const Popover = styled.div({
  position: "absolute",
  zIndex: "2",
});

const CloseableArea = styled.div({
  position: "fixed",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "100px",
});

const Swatch = styled.div(({ color }) => ({
  backgroundColor: color,
  height: "15px",
  width: "23px",
  borderRadius: "3px",
  margin: "0 5px",
}));

const ThemeColorInput = ({ color, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  return (
    <>
      <Swatch color={color} />
      <ThemeInput onClick={() => setDisplayColorPicker(true)} value={color} readOnly />
      {displayColorPicker ? (
        <Popover>
          <CloseableArea onClick={() => setDisplayColorPicker(false)} />
          <ChromePicker color={color} onChangeComplete={(e) => onChange(e)} />
        </Popover>
      ) : null}
    </>
  );
};

export default ThemeColorInput;
