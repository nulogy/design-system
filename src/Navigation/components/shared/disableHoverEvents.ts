import { PointerEvent } from "react";

export const disableHoverEvents = {
  onPointerMove: (e: PointerEvent<Element>): void => e.preventDefault(),
  onPointerEnter: (e: PointerEvent<Element>): void => e.preventDefault(),
  onPointerLeave: (e: PointerEvent<Element>): void => e.preventDefault(),
};
