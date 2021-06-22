import styled from "styled-components";
import { flexbox } from "styled-system";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

export type FlexProps = BoxProps;

const Flex: React.FunctionComponent<FlexProps> = styled(Box)(
  {
    display: "flex",
  },
  flexbox
);

export default Flex;
