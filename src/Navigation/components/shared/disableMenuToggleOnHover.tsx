import { PointerEvent } from "react";

export const disableMenuToggleOnHover = {
  onPointerMove: (e: PointerEvent<Element>) => e.preventDefault(),
  onPointerEnter: (e: PointerEvent<Element>) => e.preventDefault(),
  onPointerLeave: (e: PointerEvent<Element>) => e.preventDefault(),
};
