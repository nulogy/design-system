/* eslint-disable no-console */
export const deprecatedProp = (propType, newPropName) => {
  return (props, propName, componentName, ...rest) => {
    if (props[propName] != null) {
      const message = `NDS Warning: "${propName}" prop of "${componentName}" has been deprecated.\n Please use the "${newPropName}" prop instead. If you need assistance upgrading please message #design-system`;
      console.warn(message);
    }

    return propType(props, propName, componentName, ...rest);
  };
};
