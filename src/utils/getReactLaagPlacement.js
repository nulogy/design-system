const getLaagPlacement = (placement) => {
  return placement.includes("-") ? placement : `${placement}-center`;
};

export default getLaagPlacement;
