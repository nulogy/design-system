import { Text } from "../Type";
import type { TextProps } from "../Type/Text";

const RequirementText = (props: TextProps) => (
	<Text inline ml="x1" fontSize="smaller" color="darkGrey" {...props} />
);

export default RequirementText;
