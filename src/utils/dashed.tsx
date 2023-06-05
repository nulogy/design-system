import styled from "styled-components";

/**
 * A styled utility that adds a dashed border around a component
 * to highlight its boundaries. To be used in Storybook exclusively.
 */
const dashed = (component) => styled(component)`
  border-radius: 0.375rem;
  border-width: 2px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.lightBlue};
`;

export default dashed;
