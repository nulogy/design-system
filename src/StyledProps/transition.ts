import { system } from "styled-system";

export type TransitionProps = {
  transition?: string;
  transitionProperty?: string;
  transitonDuration?: string;
  transitionTimingFunction?: string;
  transitionDelay?: string;
};

export const transition = system({
  transition: true,
  transitionProperty: true,
  transitionDuration: true,
  transitionTimingFunction: true,
  transitionDelay: true,
});
