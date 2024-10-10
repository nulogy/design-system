const prefix = "random-id-";
let randomId = 0;

const generateId = () => {
  randomId += 1;

  return prefix + randomId;
};

export default generateId;
