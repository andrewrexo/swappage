import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode, ComponentProps } from 'react';
import { Button } from '@radix-ui/themes';

const MotionButton = motion(Button);

type MotionButtonProps = ComponentProps<typeof MotionButton>;

interface DefaultButtonProps extends MotionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  accountOnly?: boolean;
}

export const DefaultButton = forwardRef<HTMLButtonElement, DefaultButtonProps>(
  ({ children, onClick, accountOnly = false, ...props }, ref) => {
    return (
      <MotionButton
        highContrast
        className="flex cursor-pointer"
        variant="soft"
        id="connect-wallet"
        onClick={onClick}
        name="connect-wallet"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        {...(!accountOnly ? { whileHover: { scale: 1.02 } } : {})}
        {...props}
        ref={ref}
        asChild
      >
        <div>{children}</div>
      </MotionButton>
    );
  },
);

DefaultButton.displayName = 'Button';
