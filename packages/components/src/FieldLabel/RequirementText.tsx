import React from "react";
import { Text } from "../Type";
const RequirementText: React.SFC<any> = props => <Text inline ml="x1" fontSize="12px" color="darkGrey" {...props} />;
RequirementText.defaultProps = {
  children: null
};
export default RequirementText;
