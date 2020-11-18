/* eslint-disable no-console */
export const conditionallyRequiredProp = (propType, dependsOnPropName) => {
  return (props, propName, componentName, ...rest) => {
    if (
      props[propName] === undefined &&
      props[dependsOnPropName] !== undefined
    ) {
      const message = `NDS Warning: "${propName}" prop of "${componentName}" is required when ${dependsOnPropName} prop is set`;
      console.error(message);
    }

    return propType(props, propName, componentName, ...rest);
  };
};
