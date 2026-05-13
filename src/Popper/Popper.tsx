import {
  arrow,
  autoUpdate,
  FloatingPortal,
  flip,
  type Middleware,
  offset,
  type Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PopperArrow } from "../utils";

type LegacyModifiers = {
  preventOverflow?: { enabled?: boolean; padding?: number };
  flip?: { enabled?: boolean };
  offset?: { enabled?: boolean; offset?: number };
  [key: string]: unknown;
};

type PopperProps = {
  children?: React.ReactElement;
  popperPlacement?: Placement;
  defaultOpen?: boolean;
  showDelay?: string | number;
  hideDelay?: string | number;
  id?: string;
  trigger: React.ReactElement;
  openOnClick?: boolean;
  openOnHover?: boolean;
  modifiers?: LegacyModifiers;
  backgroundColor?: string;
  borderColor?: string;
  showArrow?: boolean;
  openAriaLabel?: string;
  closeAriaLabel?: string;
};

const KNOWN_MODIFIER_KEYS = new Set(["preventOverflow", "flip", "offset"]);

const toMs = (delay: string | number | undefined, fallback: number): number => {
  if (delay == null) return fallback;
  const n = typeof delay === "string" ? Number.parseInt(delay, 10) : delay;
  return Number.isFinite(n) ? n : fallback;
};

const translateModifiers = (modifiers: LegacyModifiers | undefined): Middleware[] => {
  const middleware: Middleware[] = [];

  if (modifiers?.offset && modifiers.offset.enabled !== false) {
    const value = typeof modifiers.offset.offset === "number" ? modifiers.offset.offset : 0;
    middleware.push(offset(value));
  }

  if (modifiers?.flip?.enabled !== false) {
    middleware.push(flip());
  }

  if (modifiers?.preventOverflow?.enabled !== false) {
    const padding = typeof modifiers?.preventOverflow?.padding === "number" ? modifiers.preventOverflow.padding : 8;
    middleware.push(shift({ padding }));
  }

  if (process.env.NODE_ENV !== "production" && modifiers) {
    for (const key of Object.keys(modifiers)) {
      if (!KNOWN_MODIFIER_KEYS.has(key)) {
        console.warn(
          `[Popper] Unsupported modifier "${key}" ignored. The floating-ui adapter only translates preventOverflow, flip, and offset.`,
        );
      }
    }
  }

  return middleware;
};

const makeArray = <T,>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

const wrapInFunction = <T,>(
  x: T | ((args: { closeMenu: (e: React.MouseEvent) => void; openMenu: (e: React.MouseEvent) => void }) => T),
) =>
  (typeof x === "function" ? x : () => x) as (args: {
    closeMenu: (e: React.MouseEvent) => void;
    openMenu: (e: React.MouseEvent) => void;
  }) => T;

const Popper = React.forwardRef<unknown, PopperProps>(
  (
    {
      id,
      trigger,
      children,
      backgroundColor,
      borderColor,
      openAriaLabel,
      closeAriaLabel,
      modifiers,
      showDelay = "100",
      hideDelay = "350",
      defaultOpen = false,
      popperPlacement = "bottom",
      openOnClick = false,
      openOnHover = true,
      showArrow = true,
    },
    _popperRef,
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const arrowRef = useRef<HTMLDivElement | null>(null);

    const middleware = useMemo(() => {
      const result = translateModifiers(modifiers);
      if (showArrow) {
        result.push(arrow({ element: arrowRef }));
      }
      return result;
    }, [modifiers, showArrow]);

    const { refs, floatingStyles, context, placement, middlewareData, isPositioned } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: popperPlacement,
      middleware,
      whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
      enabled: openOnHover,
      delay: { open: toMs(showDelay, 100), close: toMs(hideDelay, 350) },
      handleClose: safePolygon(),
    });
    const click = useClick(context, { enabled: openOnClick });
    const focus = useFocus(context);
    const dismiss = useDismiss(context, { escapeKey: true, outsidePress: true });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, focus, dismiss]);

    const { t } = useTranslation();
    const openLabel = openAriaLabel || t("open");
    const closeLabel = closeAriaLabel || t("close");

    const transformInnerChildren = (elements: React.ReactNode): React.ReactNode =>
      makeArray(elements).map((element, i) => {
        const transformedElement = wrapInFunction(element as React.ReactNode)({
          closeMenu: (e: React.MouseEvent) => {
            setIsOpen(false);
            e.stopPropagation();
          },
          openMenu: (e: React.MouseEvent) => {
            setIsOpen(true);
            e.stopPropagation();
          },
        });
        return React.isValidElement(transformedElement)
          ? React.cloneElement(transformedElement, {
              // biome-ignore lint/suspicious/noArrayIndexKey: popup children may have no explicit keys
              key: i,
            })
          : transformedElement;
      });

    const renderInnerChildren = (popupChildren: React.ReactElement): React.ReactNode => {
      const innerChildren = (popupChildren.props as { children?: React.ReactNode }).children;
      return typeof innerChildren !== "string" ? transformInnerChildren(innerChildren) : innerChildren;
    };

    const arrowData = middlewareData.arrow;

    const popupChildren = children as React.ReactElement<{
      style?: React.CSSProperties;
      className?: string;
    }>;

    return (
      <>
        {React.cloneElement(trigger, {
          ref: refs.setReference,
          "aria-haspopup": true,
          "aria-expanded": isOpen,
          "aria-describedby": id,
          "aria-label": isOpen ? closeLabel : openLabel,
          ...getReferenceProps(),
        } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> })}
        {isOpen && popupChildren && (
          <FloatingPortal>
            {React.cloneElement(
              popupChildren,
              {
                ref: refs.setFloating,
                id,
                style: {
                  ...floatingStyles,
                  visibility: isPositioned ? "visible" : "hidden",
                  ...popupChildren.props.style,
                },
                dataPlacement: placement,
                className: `${popupChildren.props.className || ""} nds-popper-pop-up`.trim(),
                ...getFloatingProps(),
              } as React.HTMLAttributes<HTMLElement> & {
                ref: React.Ref<HTMLElement>;
                dataPlacement: Placement;
              },
              [
                ...makeArray(renderInnerChildren(popupChildren)),
                showArrow && (
                  <PopperArrow
                    key="popper-arrow"
                    ref={arrowRef}
                    placement={placement}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                    style={{
                      left: arrowData?.x != null ? `${arrowData.x}px` : undefined,
                      top: arrowData?.y != null ? `${arrowData.y}px` : undefined,
                    }}
                  />
                ),
              ],
            )}
          </FloatingPortal>
        )}
      </>
    );
  },
);

export default Popper;
