import React, { useState } from "react";
import { ChromePicker } from "react-color";
import styled from "styled-components";

import ThemeInput from "./ThemeInput";

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
  const [value, setValue] = useState(color || "#000");
  return (
    <>
      <Swatch color={value} />
      <ThemeInput
        onClick={() => setDisplayColorPicker(true)}
        value={value}
        readOnly
      />
      {displayColorPicker ? (
        <Popover>
          <CloseableArea onClick={() => setDisplayColorPicker(false)} />
          <ChromePicker
            color={value}
            onChange={(e) => setValue(e.hex)}
            onChangeComplete={(e) => onChange(e)}
          />
        </Popover>
      ) : null}
    </>
  );
};

export default ThemeColorInput;
