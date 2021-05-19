const conditionallyApplyDelay = (fnc, delay) => {
  if (delay) {
    setTimeout(fnc, Number(delay));
  } else {
    fnc();
  }
};

export default conditionallyApplyDelay;
