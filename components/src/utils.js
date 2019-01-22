
export function getTextWidth(text, font) {
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

export const addPx = (val1, val2) => {
  const val2Str = !val2 ? "1px" : `${val2}`;
  return (`${parseInt(val1.replace("px", ""), 10) + parseInt(val2Str.replace("px", ""), 10)}px`);
};

export const subPx = (val1, val2) => {
  const val2Str = !val2 ? "1px" : `${val2}`;
  return (`${parseInt(val1.replace("px", ""), 10) - parseInt(val2Str.replace("px", ""), 10)}px`);
};

export const multPx = (val1, val2) => {
  const val2Str = !val2 ? "1px" : `${val2}`;
  return (`${Math.round(parseFloat(val1.replace("px", "")) * parseFloat(val2Str.replace("px", "")))}px`);
};
