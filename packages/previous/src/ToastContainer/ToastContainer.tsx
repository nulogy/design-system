import React, { useEffect } from "react";
import { toast as _toast, Toaster, ToasterProps, useToasterStore } from "react-hot-toast";
import { useTheme } from "styled-components";
import numberFromDimension from "../utils/numberFromDimension";
import { TOAST_SHOW_DURATION } from "../Toast/Toast";
import { ToastOptions } from "./ToastFunction";

type ToastContainerProps = {
  gap?: number;
  maxVisibleToasts?: number;
  toastOptions?: ToastOptions;
} & Omit<ToasterProps, "gutter" | "toastOptions">;

const ToastContainer = ({
  gap,
  position = "bottom-center",
  reverseOrder = false,
  containerClassName = "nds-toast-container",
  toastOptions = { duration: TOAST_SHOW_DURATION },
  maxVisibleToasts = 8,
  ...props
}: ToastContainerProps) => {
  const theme = useTheme();
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= maxVisibleToasts)
      .forEach((t) => _toast.dismiss(t.id));
  }, [toasts, maxVisibleToasts]);

  return (
    <Toaster
      gutter={gap || numberFromDimension(theme.space.x1)}
      toastOptions={{
        custom: { ...toastOptions },
      }}
      position={position}
      reverseOrder={reverseOrder}
      containerClassName={containerClassName}
      {...props}
    />
  );
};

export default ToastContainer;
