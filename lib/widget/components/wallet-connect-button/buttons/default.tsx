import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode, ComponentProps } from 'react';
import { Button } from '@radix-ui/themes';
import { twMerge } from 'tailwind-merge';

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
        id="connect-wallet"
        onClick={onClick}
        name="connect-wallet"
        variant="surface"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        {...(!accountOnly ? { whileHover: { scale: 1.02 } } : {})}
        {...props}
        ref={ref}
        asChild
      >
        <div
          className="animate-gradient-x"
          {...(!accountOnly
            ? {
                style: {
                  boxShadow: '0 0 0 1px var(--accent-a7)',
                  backgroundImage:
                    'linear-gradient(to right, var(--accent-2), var(--accent-3), var(--accent-2))',
                },
              }
            : {})}
        >
          {children}
        </div>
      </MotionButton>
    );
  },
);

DefaultButton.displayName = 'Button';
