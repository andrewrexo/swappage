import React, { forwardRef } from 'react';
import { type ButtonProps, Button } from '@radix-ui/themes';
import { motion, type MotionProps } from 'framer-motion';
import type { ReactNode, ComponentProps } from 'react';

const MotionButton = motion(Button);

type MotionButtonProps = ComponentProps<typeof MotionButton>;

interface DefaultButtonProps
  extends Omit<MotionButtonProps, 'onAnimationStart'> {
  onAnimationStart?: MotionButtonProps['onAnimationStart'];
  children: ReactNode;
  onClick?: () => void;
  accountOnly?: boolean;
}

export const DefaultButton = forwardRef<HTMLButtonElement, DefaultButtonProps>(
  ({ children, onClick, accountOnly = false, ...props }, ref) => {
    return (
      <MotionButton
        variant={accountOnly ? 'surface' : 'surface'}
        className="flex cursor-pointer"
        onClick={onClick}
        name="connect-wallet"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        {...(!accountOnly ? { whileHover: { scale: 1.02 } } : {})}
        {...props}
        ref={ref}
      >
        {children}
      </MotionButton>
    );
  },
);

DefaultButton.displayName = 'Button';
