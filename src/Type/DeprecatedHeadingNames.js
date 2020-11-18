import { Heading1, Heading2, Heading3 } from "./Headings";
import { Deprecated } from "../utils/DeprecatedComponent";

const Title = Deprecated(
  Heading1,
  "Title is deprecated, replace it with Heading1"
);
const SectionTitle = Deprecated(
  Heading2,
  "SectionTitle is deprecated, replace it with Heading2"
);
const SubsectionTitle = Deprecated(
  Heading3,
  "SubsectionTitle is deprecated, replace it with Heading3"
);

export { Title, SectionTitle, SubsectionTitle };
