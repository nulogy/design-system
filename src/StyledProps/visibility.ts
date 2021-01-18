import { system } from "styled-system";

export type VisibilityProps = {
  visibility?: "hidden" | "visible";
};

export const visibility = system({
  visibility: true,
});
