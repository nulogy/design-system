export default function isValidMenuItem(arr, idx, componentName, location, propFullName) {
  const obj = arr[idx];

  if (typeof obj !== "object") {
    throw new Error(
      `Invalid ${propFullName} of type \`${typeof obj}\` supplied to \`${componentName}\`, expected \`object\``
    );
  }

  let numberOfDefiningKeys = 0;
  const definingKeys = ["href", "items", "render"];
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (definingKeys.includes(keys[i])) {
      numberOfDefiningKeys += 1;
    }
  }

  if (numberOfDefiningKeys > 1) {
    return new Error(
      `Invalid set of keys for Menu Item with name \`${obj.name}\` supplied to \`${componentName}\`. Include a name key and optionally ONE of ${definingKeys}`
    );
  }

  return null;
}
