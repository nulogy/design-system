import React from 'react';
import { Slot } from '@radix-ui/react-slot';

interface ClickableButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  /** asChild is blah blah blah */
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const ClickableButton = React.forwardRef<HTMLButtonElement, ClickableButtonProps>(
  ({ asChild, isLoading = false, loadingText, disabled, children, ...props }: ClickableButtonProps, forwardedRef) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component ref={forwardedRef} disabled={disabled || isLoading} tremor-id="tremor-raw" {...props}>
        {isLoading ? <span>{loadingText ? loadingText : 'Loading'}</span> : children}
      </Component>
    );
  },
);

ClickableButton.displayName = 'ClickableButton';

export { ClickableButton, type ClickableButtonProps };
