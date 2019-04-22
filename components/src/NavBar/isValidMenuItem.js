import PropTypes from "prop-types";

const isValidMenuItem = function validArrayItem(arr, idx, componentName, location, propFullName) {
  const obj = arr[idx];

  const objTest = { "menuDataObj": obj };
  PropTypes.checkPropTypes({ "menuDataObj": PropTypes.object }, objTest, propFullName, componentName);

  PropTypes.checkPropTypes({
    "name": PropTypes.string.isRequired,
    "href": PropTypes.string,
    "items": PropTypes.arrayOf(isValidMenuItem),
    "render": PropTypes.func,
  }, obj, propFullName, componentName);

  let numberOfDefiningKeys = 0;
  const definingKeys = ["href", "items", "render"];
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (definingKeys.includes(keys[i])) { numberOfDefiningKeys += 1; }
  }

  if (numberOfDefiningKeys != 1) {
    return new Error(
      `Invalid set of keys for Menu Item with name "${obj.name}" provided to ${componentName}. Include a name key and ONE of ${definingKeys}`
    );
  }

  return null;
};

export default isValidMenuItem;
