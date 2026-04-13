const prefix = "random-id-";
let randomId = 0;

/**
 * Generates a unique ID for an element.
 * @returns {string} A unique ID.
 * @deprecated use `useId` instead
 */
const generateId = () => {
  randomId += 1;

  return prefix + randomId;
};

export default generateId;
