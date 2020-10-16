export const getSubset = (o, propObj) => {
  const fields = Object.keys(propObj);
  return pick(o, ...fields);
};


export const omitSubset = (o, propObj) => {
  const fields = Object.keys(propObj);
  const objectProps = Object.keys(o);
  return objectProps.reduce((a, x) => {
    if (!fields.includes(x)) a[x] = o[x];
    return a;
  }, {});
};

const pick = (o, ...fields) => {
  const objectProps = Object.keys(o);
  return fields.reduce((a, x) => {
    if (objectProps.includes(x)) a[x] = o[x];
    return a;
  }, {});
};
