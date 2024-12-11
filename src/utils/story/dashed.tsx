import styled from "styled-components";
import { ComponentType } from "react";

/**
 * A styled utility that adds a dashed border around a component
 * to highlight its boundaries. To be used in Storybook exclusively.
 * Do not export for production.
 */
export const dashed = <P extends Record<string, unknown>>(component: ComponentType<P>) =>
  styled(component)`
    border-radius: ${(props) => props.theme.radii.large};
    border-width: ${(props) => props.theme.space.x0_25};
    border-style: dashed;
    border-color: ${({ theme }) => theme.colors.lightBlue};
  `;
