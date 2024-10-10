const omit = (obj, prop) => {
  const res = Object.assign({}, obj);
  delete res[prop];
  return res;
};

export default omit;
