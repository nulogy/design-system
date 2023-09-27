import React from "react";
import { AnimatePresence } from "framer-motion";
import { toast as _toast, ToastOptions as ReactHotToastOptions } from "react-hot-toast";
import { Alert } from "../Alert";
import { AlertProps as OriginalAlertProps } from "../Alert/Alert";
import { AnimatedBox } from "../Box";
import { toastAnimationConfig } from "../Toast/Toast";

// We remove the "as" prop because the Alert is wrapped with a styled component
// resulting in a TypeScript overload error.
type AlertProps = Omit<OriginalAlertProps, "as">;

type ToastFunction = (children: React.ReactNode, props?: AlertProps, options?: ToastOptions) => void;

type ToastFunctions = {
  danger: ToastFunction;
  informative: ToastFunction;
  success: ToastFunction;
  warning: ToastFunction;
};

type CustomToastProps = { id: string; isVisible: boolean } & AlertProps;

const CustomToast: React.FC<CustomToastProps> = ({ isVisible, id, children, ...props }) => {
  const handleClose = () => {
    _toast.dismiss(id);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <AnimatedBox key="notification" role="alert" {...toastAnimationConfig}>
          <Alert controlled onClose={handleClose} {...props}>
            {children}
          </Alert>
        </AnimatedBox>
      )}
    </AnimatePresence>
  );
};

const toast: ToastFunctions = {
  danger: (children, props = {}, options = {}) =>
    _toast.custom(
      (t) => (
        <CustomToast id={t.id} isVisible={t.visible} type="danger" {...props}>
          {children}
        </CustomToast>
      ),
      { duration: props.isCloseable ? Infinity : options.duration, ...options }
    ),

  informative: (children, props = {}, options = {}) =>
    _toast.custom(
      (t) => (
        <CustomToast id={t.id} isVisible={t.visible} type="informative" {...props}>
          {children}
        </CustomToast>
      ),
      { duration: props.isCloseable ? Infinity : options.duration, ...options }
    ),

  success: (children, props = {}, options = {}) =>
    _toast.custom(
      (t) => (
        <CustomToast id={t.id} isVisible={t.visible} type="success" {...props}>
          {children}
        </CustomToast>
      ),
      { duration: props.isCloseable ? Infinity : options.duration, ...options }
    ),

  warning: (children, props = {}, options = {}) =>
    _toast.custom(
      (t) => (
        <CustomToast id={t.id} isVisible={t.visible} type="warning" {...props}>
          {children}
        </CustomToast>
      ),
      { duration: props.isCloseable ? Infinity : options.duration, ...options }
    ),
};

export type ToastOptions = Omit<ReactHotToastOptions, "icon" | "iconTheme">;

export default toast;
