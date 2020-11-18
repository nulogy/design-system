const subPx = (val1, val2) => {
  const val2Str = !val2 ? "1px" : `${val2}`;
  return `${
    parseInt(val1.replace("px", ""), 10) -
    parseInt(val2Str.replace("px", ""), 10)
  }px`;
};

export default subPx;
