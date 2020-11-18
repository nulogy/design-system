import { system } from "styled-system";

export type TextOverflowProps = {
  whiteSpace?:
    | "normal"
    | "nowrap"
    | "pre"
    | "pre-line"
    | "pre-wrap"
    | "initial"
    | "inherit";
  textOverflow?: "clip" | "ellipsis" | "string" | "initial" | "inherit";
};

export const textOverflow = system({
  whiteSpace: true,
  textOverflow: true,
});
