import styled from "styled-components";
import { transparentize } from "polished";

/**
 * A styled component for displaying code in a storybook.
 *
 * @example
 * <Code>const code = "console.log('Hello, world!');";</Code>
 */
export const Code = styled.code`
  background-color: ${({ theme }) => transparentize(0.9, theme.colors.darkGrey)};
  color: ${({ theme }) => theme.colors.darkGrey};
  padding: ${({ theme }) => theme.space.x0_25} ${({ theme }) => theme.space.x0_5};
  border-radius: ${({ theme }) => theme.radii.medium};
`;
