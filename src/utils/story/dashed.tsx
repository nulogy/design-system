import styled, { StyledComponent } from "styled-components";
import { ComponentType } from "react";
import { DefaultNDSThemeType } from "../../theme.type";

/**
 * A styled utility that adds a dashed border around a component
 * to highlight its boundaries. To be used in Storybook exclusively.
 */
export const dashed = <P extends object>(
  component: ComponentType<P>
): StyledComponent<ComponentType<P>, DefaultNDSThemeType> =>
  styled(component)`
    border-radius: 0.375rem;
    border-width: 2px;
    border-style: dashed;
    border-color: ${({ theme }) => theme.colors.lightBlue};
  `;
