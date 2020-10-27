import styled from "styled-components";
import { space } from "styled-system";
const Fieldset: React.SFC<any> = styled.fieldset(
  {
    padding: 0,
    border: 0,
    margin: 0,
    legend: {
      padding: 0,
    },
    width: "100%",
  },
  space
);
export default Fieldset;
