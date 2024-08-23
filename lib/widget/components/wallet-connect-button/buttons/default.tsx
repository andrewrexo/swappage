import { type ButtonProps, Button } from '@radix-ui/themes';
import { motion, type MotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

const MotionButton = motion(Button);

export const DefaultButton = ({
  children,
  onClick,
  accountOnly = false,
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  accountOnly?: boolean;
} & ButtonProps &
  MotionProps) => {
  return (
    <MotionButton
      variant={accountOnly ? 'surface' : 'surface'}
      asChild
      className="flex cursor-pointer"
      onClick={onClick}
      name="connect-wallet"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...(!accountOnly ? { whileHover: { scale: 1.02 } } : {})}
      {...props}
    >
      <motion.button>{children}</motion.button>
    </MotionButton>
  );
};
